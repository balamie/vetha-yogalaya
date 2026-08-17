import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";

const PORT = 8787;
const CAPACITY = 15;

// --- SQLite setup ---
const db = new DatabaseSync(":memory:");
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    child_name TEXT NOT NULL,
    child_age INTEGER NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    whatsapp_number TEXT,
    parent_email TEXT,
    session_date TEXT NOT NULL,
    paired_date TEXT,
    status TEXT DEFAULT 'confirmed',
    attended_session1 INTEGER DEFAULT NULL,
    attended_session2 INTEGER DEFAULT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// --- IST helpers ---
function toISTDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getTodayIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return toISTDate(new Date(utc + 5.5 * 60000));
}

function calculatePairedDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dow = date.getDay();
  if (dow === 5) date.setDate(date.getDate() + 3);
  else if (dow === 1) date.setDate(date.getDate() + 4);
  else return null;
  return toISTDate(date);
}

// Indian Government Holidays
const INDIAN_HOLIDAYS = {
  "01-26": "Republic Day",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  "2026-03-10": "Holi",
  "2026-03-20": "Eid al-Fitr",
  "2026-05-27": "Eid al-Adha",
  "2026-10-20": "Diwali",
  "2026-11-07": "Diwali (Govt Holiday)",
  "2027-03-29": "Holi",
  "2027-04-09": "Eid al-Fitr",
  "2027-06-05": "Eid al-Adha",
  "2027-11-09": "Diwali",
};

function isHoliday(dateStr) {
  if (INDIAN_HOLIDAYS[dateStr]) return true;
  const mmdd = dateStr.slice(5);
  return !!INDIAN_HOLIDAYS[mmdd];
}

// --- DB helpers ---
function countBookings(date) {
  const row = db.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE session_date = ? AND status = 'confirmed'"
  ).get(date);
  return row?.count ?? 0;
}

function insertBooking(b) {
  db.prepare(
    `INSERT INTO bookings (id, child_name, child_age, parent_name, parent_phone, whatsapp_number, parent_email, session_date, paired_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(b.id, b.child_name, b.child_age, b.parent_name, b.parent_phone, b.whatsapp_number, b.parent_email, b.session_date, b.paired_date);
}

// --- Auth ---
const ADMIN_USER = "admin";
const ADMIN_PASS = "vetha2024";

function checkAuth(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Basic ")) return false;
  const decoded = Buffer.from(auth.slice(6), "base64").toString();
  const [u, p] = decoded.split(":");
  return u === ADMIN_USER && p === ADMIN_PASS;
}

// --- Body parser ---
function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => resolve(body));
  });
}

function json(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// --- Router ---
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  // Health
  if (path === "/" || path === "/api/health") {
    return json(res, { status: "ok", mode: "local-dev" });
  }

  // GET /api/availability?date=...
  if (method === "GET" && path === "/api/availability") {
    const date = url.searchParams.get("date");
    if (!date) return json(res, { error: "date required" }, 400);
    const booked = countBookings(date);
    return json(res, { date, booked, remaining: Math.max(0, CAPACITY - booked), full: booked >= CAPACITY });
  }

  // POST /api/availability/bulk
  if (method === "POST" && path === "/api/availability/bulk") {
    const body = JSON.parse(await readBody(req));
    const results = {};
    for (const date of body.dates || []) {
      const booked = countBookings(date);
      results[date] = { booked, remaining: Math.max(0, CAPACITY - booked), full: booked >= CAPACITY };
    }
    return json(res, results);
  }

  // POST /api/bookings
  if (method === "POST" && path === "/api/bookings") {
    const body = JSON.parse(await readBody(req));
    const { child_name, child_age, parent_name, parent_phone, whatsapp_number, parent_email, session_date } = body;

    if (!child_name || child_name.trim().length < 2) return json(res, { error: "Child name required (min 2 chars)" }, 400);
    if (!child_age || child_age < 1 || child_age > 100) return json(res, { error: "Valid child age required (1-100)" }, 400);
    if (!parent_name || parent_name.trim().length < 2) return json(res, { error: "Parent name required" }, 400);
    if (!parent_phone || parent_phone.replace(/\D/g, "").length < 7) return json(res, { error: "Valid phone required (with country code)" }, 400);
    if (!parent_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parent_email)) return json(res, { error: "Valid email is required" }, 400);
    if (!session_date || !/^\d{4}-\d{2}-\d{2}$/.test(session_date)) return json(res, { error: "Valid date (YYYY-MM-DD) required" }, 400);

    const day = new Date(session_date + "T00:00:00").getDay();
    if (day !== 1 && day !== 5) return json(res, { error: "Only Mondays and Fridays" }, 400);
    if (isHoliday(session_date)) return json(res, { error: "This date is a government holiday. Please choose another date." }, 400);
    if (session_date <= getTodayIST()) return json(res, { error: "Date must be in the future" }, 400);

    const booked = countBookings(session_date);
    if (booked >= CAPACITY) return json(res, { error: "Fully booked", full: true }, 409);

    const pairedDate = calculatePairedDate(session_date);
    let pairedFull = false;
    if (pairedDate && countBookings(pairedDate) >= CAPACITY) pairedFull = true;

    const phone = parent_phone.replace(/\D/g, "");
    const whatsapp = (whatsapp_number || parent_phone).replace(/\D/g, "");
    const id = randomUUID();

    insertBooking({
      id, child_name: child_name.trim(), child_age, parent_name: parent_name.trim(),
      parent_phone: phone, whatsapp_number: whatsapp, parent_email: parent_email?.trim() || null,
      session_date, paired_date: pairedFull ? null : pairedDate,
    });

    if (pairedDate && !pairedFull) {
      insertBooking({
        id: randomUUID(), child_name: child_name.trim(), child_age, parent_name: parent_name.trim(),
        parent_phone: phone, whatsapp_number: whatsapp, parent_email: parent_email?.trim() || null,
        session_date: pairedDate, paired_date: session_date,
      });
    }

    // Log to console instead of sending email
    console.log(`\n✅ BOOKING CREATED: ${child_name} (${child_age}) by ${parent_name}`);
    console.log(`   Session 1: ${session_date} | Paired: ${pairedFull ? "none (full)" : pairedDate}`);
    console.log(`   Phone: ${phone} | Email: ${parent_email || "n/a"}`);

    return json(res, {
      success: true,
      booking: { id, sessionDate: session_date, pairedDate: pairedFull ? null : pairedDate, pairedFull },
    }, 201);
  }

  // Admin routes
  if (path.startsWith("/api/admin")) {
    if (!checkAuth(req)) {
      res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Admin"', "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Unauthorized" }));
    }

    // GET /api/admin/bookings
    if (method === "GET" && path === "/api/admin/bookings") {
      const rows = db.prepare("SELECT * FROM bookings ORDER BY session_date DESC, created_at DESC").all();
      const today = getTodayIST();
      const past = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='confirmed' AND session_date<=?").get(today);
      const att1 = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='confirmed' AND session_date<=? AND attended_session1=1").get(today);
      const att2 = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='confirmed' AND paired_date IS NOT NULL AND paired_date<=? AND attended_session2=1").get(today);
      const eligible = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='confirmed' AND paired_date IS NOT NULL AND paired_date<=?").get(today);
      return json(res, {
        bookings: rows,
        stats: {
          totalPastBookings: past?.c ?? 0,
          session1Attended: att1?.c ?? 0,
          session2Attended: att2?.c ?? 0,
          totalSession2Eligible: eligible?.c ?? 0,
        },
      });
    }

    // PATCH /api/admin/bookings/:id
    if (method === "PATCH" && path.startsWith("/api/admin/bookings/")) {
      const id = path.split("/").pop();
      const body = JSON.parse(await readBody(req));

      if ("attended_session1" in body || "attended_session2" in body) {
        const sets = [];
        const params = [];
        if ("attended_session1" in body) { sets.push("attended_session1 = ?"); params.push(body.attended_session1 ?? null); }
        if ("attended_session2" in body) { sets.push("attended_session2 = ?"); params.push(body.attended_session2 ?? null); }
        params.push(id);
        db.prepare(`UPDATE bookings SET ${sets.join(",")} WHERE id = ?`).run(...params);
        return json(res, { success: true });
      }

      if (body.status === "cancelled") {
        db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(id);
        return json(res, { success: true });
      }

      return json(res, { error: "Invalid update" }, 400);
    }

    // DELETE /api/admin/bookings/:id
    if (method === "DELETE" && path.startsWith("/api/admin/bookings/")) {
      const id = path.split("/").pop();
      db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
      return json(res, { success: true });
    }
  }

  json(res, { error: "Not found" }, 404);
});

server.listen(PORT, () => {
  console.log(`\n🧘 Vetha Yogalaya — Local Dev Server`);
  console.log(`   API:    http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Admin:  http://localhost:${PORT}/api/admin/bookings`);
  console.log(`   Auth:   admin / vetha2024`);
  console.log(`\n   Database: in-memory (resets on restart)\n`);
});
