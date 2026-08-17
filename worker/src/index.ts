import { Hono } from "hono";
import { cors } from "hono/cors";
import { Resend } from "resend";

type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
  ALLOWED_ORIGINS: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use("*", cors({
  origin: (c) => {
    const allowed = c.env.ALLOWED_ORIGINS.split(",");
    const origin = c.req.header("Origin") || "";
    return allowed.includes(origin) ? origin : allowed[0];
  },
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

// Health check
app.get("/", (c) => c.json({ status: "ok" }));

// Constant-time string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Check HTTP Basic Auth
function checkBasicAuth(c: any): boolean {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  const encoded = authHeader.slice(6);
  const decoded = atob(encoded);
  const [username, password] = decoded.split(":");

  return (
    timingSafeEqual(username, c.env.ADMIN_USERNAME) &&
    timingSafeEqual(password, c.env.ADMIN_PASSWORD)
  );
}

// Admin auth middleware
function requireAdmin(c: any) {
  if (!checkBasicAuth(c)) {
    return c.json({ error: "Unauthorized" }, 401, {
      "WWW-Authenticate": 'Basic realm="Admin"',
    });
  }
  return null; // continue
}

// Format date as IST YYYY-MM-DD
function toISTDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Get current IST date string
function getTodayIST(): string {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 60000);
  return toISTDate(ist);
}

// Get availability for a date
app.get("/api/availability", async (c) => {
  const date = c.req.query("date");
  if (!date) return c.json({ error: "date query param required" }, 400);

  const { results } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE session_date = ? AND status = 'confirmed'"
  ).bind(date).all<{ count: number }>();

  const booked = results[0]?.count ?? 0;
  const capacity = 15;

  return c.json({
    date,
    booked,
    remaining: Math.max(0, capacity - booked),
    full: booked >= capacity,
  });
});

// Bulk availability for multiple dates
app.post("/api/availability/bulk", async (c) => {
  const { dates } = await c.req.json<{ dates: string[] }>();
  if (!Array.isArray(dates) || dates.length === 0) {
    return c.json({ error: "dates array required" }, 400);
  }

  const results: Record<string, { booked: number; remaining: number; full: boolean }> = {};
  const capacity = 15;

  for (const date of dates) {
    const { results: rows } = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM bookings WHERE session_date = ? AND status = 'confirmed'"
    ).bind(date).all<{ count: number }>();

    const booked = rows[0]?.count ?? 0;
    results[date] = {
      booked,
      remaining: Math.max(0, capacity - booked),
      full: booked >= capacity,
    };
  }

  return c.json(results);
});

// Create a booking
app.post("/api/bookings", async (c) => {
  const body = await c.req.json<{
    child_name: string;
    child_age: number;
    parent_name: string;
    parent_phone: string;
    whatsapp_number?: string;
    parent_email?: string;
    session_date: string;
  }>();

  // Validate child details
  if (!body.child_name || body.child_name.trim().length < 2) {
    return c.json({ error: "Child name is required (min 2 chars)" }, 400);
  }
  if (!body.child_age || body.child_age < 1 || body.child_age > 100) {
    return c.json({ error: "Valid child age is required (1-100)" }, 400);
  }

  // Validate parent details
  if (!body.parent_name || body.parent_name.trim().length < 2) {
    return c.json({ error: "Parent name is required" }, 400);
  }
  if (!body.parent_phone || body.parent_phone.replace(/\D/g, "").length < 10) {
    return c.json({ error: "Valid parent phone number is required" }, 400);
  }

  // WhatsApp number falls back to parent phone
  const whatsappNumber = body.whatsapp_number
    ? body.whatsapp_number.replace(/\D/g, "")
    : body.parent_phone.replace(/\D/g, "");

  // Validate email format if provided
  if (body.parent_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.parent_email)) {
    return c.json({ error: "Invalid email address format" }, 400);
  }

  // Validate date
  if (!body.session_date || !/^\d{4}-\d{2}-\d{2}$/.test(body.session_date)) {
    return c.json({ error: "Valid session date (YYYY-MM-DD) is required" }, 400);
  }

  // Validate day is Friday or Monday
  const sessionDateObj = new Date(body.session_date + "T00:00:00");
  const day = sessionDateObj.getDay();
  if (day !== 1 && day !== 5) {
    return c.json({ error: "Bookings are only available on Mondays and Fridays" }, 400);
  }

  // Validate date is in the future
  const todayStr = getTodayIST();
  if (body.session_date <= todayStr) {
    return c.json({ error: "Booking date must be in the future" }, 400);
  }

  // Calculate paired date
  const pairedDate = calculatePairedDate(body.session_date);

  // Atomic capacity check and insert
  const bookingId = crypto.randomUUID();
  const phone = body.parent_phone.replace(/\D/g, "");

  try {
    // Check capacity for main date
    const { results: mainCheck } = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM bookings WHERE session_date = ? AND status = 'confirmed'"
    ).bind(body.session_date).all<{ count: number }>();

    if ((mainCheck[0]?.count ?? 0) >= 15) {
      return c.json({
        error: "This date is fully booked. Please try the other available day.",
        date: body.session_date,
        full: true,
      }, 409);
    }

    // Check capacity for paired date
    let pairedFull = false;
    if (pairedDate) {
      const { results: pairedCheck } = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE session_date = ? AND status = 'confirmed'"
      ).bind(pairedDate).all<{ count: number }>();

      if ((pairedCheck[0]?.count ?? 0) >= 15) {
        pairedFull = true;
      }
    }

    // Insert main booking
    await c.env.DB.prepare(
      `INSERT INTO bookings (id, child_name, child_age, parent_name, parent_phone, whatsapp_number, parent_email, session_date, paired_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      bookingId,
      body.child_name.trim(),
      body.child_age,
      body.parent_name.trim(),
      phone,
      whatsappNumber,
      body.parent_email?.trim() || null,
      body.session_date,
      pairedFull ? null : pairedDate
    ).run();

    // Insert paired booking if capacity available
    let pairedBookingId: string | null = null;
    if (pairedDate && !pairedFull) {
      pairedBookingId = crypto.randomUUID();
      await c.env.DB.prepare(
        `INSERT INTO bookings (id, child_name, child_age, parent_name, parent_phone, whatsapp_number, parent_email, session_date, paired_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        pairedBookingId,
        body.child_name.trim(),
        body.child_age,
        body.parent_name.trim(),
        phone,
        whatsappNumber,
        body.parent_email?.trim() || null,
        pairedDate,
        body.session_date
      ).run();
    }

    // Send confirmation email
    await sendConfirmationEmail(c.env.RESEND_API_KEY, {
      childName: body.child_name.trim(),
      parentName: body.parent_name.trim(),
      parentPhone: phone,
      parentEmail: body.parent_email?.trim(),
      sessionDate: body.session_date,
      pairedDate: pairedFull ? null : pairedDate,
      bookingId,
    });

    return c.json({
      success: true,
      booking: {
        id: bookingId,
        sessionDate: body.session_date,
        pairedDate: pairedFull ? null : pairedDate,
        pairedFull,
      },
    }, 201);

  } catch (err) {
    console.error("Booking error:", err);
    return c.json({ error: "Failed to create booking. Please try again." }, 500);
  }
});

// Admin: List all bookings
app.get("/api/admin/bookings", async (c) => {
  const authError = requireAdmin(c);
  if (authError) return authError;

  const dateFrom = c.req.query("from");
  const dateTo = c.req.query("to");

  let query = "SELECT * FROM bookings";
  const params: string[] = [];
  const conditions: string[] = [];

  if (dateFrom) {
    conditions.push("session_date >= ?");
    params.push(dateFrom);
  }
  if (dateTo) {
    conditions.push("session_date <= ?");
    params.push(dateTo);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += " ORDER BY session_date DESC, created_at DESC";

  const { results } = params.length > 0
    ? await c.env.DB.prepare(query).bind(...params).all()
    : await c.env.DB.prepare(query).all();

  // Also fetch summary stats
  const todayStr = getTodayIST();
  const { results: pastBookings } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed' AND session_date <= ?"
  ).bind(todayStr).all<{ count: number }>();

  const { results: attended1 } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed' AND session_date <= ? AND attended_session1 = 1"
  ).bind(todayStr).all<{ count: number }>();

  const { results: attended2 } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed' AND paired_date IS NOT NULL AND paired_date <= ? AND attended_session2 = 1"
  ).bind(todayStr).all<{ count: number }>();

  const { results: pairedBookings } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed' AND paired_date IS NOT NULL AND paired_date <= ?"
  ).bind(todayStr).all<{ count: number }>();

  return c.json({
    bookings: results,
    stats: {
      totalPastBookings: pastBookings[0]?.count ?? 0,
      session1Attended: attended1[0]?.count ?? 0,
      session2Attended: attended2[0]?.count ?? 0,
      totalSession2Eligible: pairedBookings[0]?.count ?? 0,
    },
  });
});

// Admin: Cancel booking (sets status to cancelled, keeps capacity)
app.patch("/api/admin/bookings/:id", async (c) => {
  const authError = requireAdmin(c);
  if (authError) return authError;

  const id = c.req.param("id");
  const body = await c.req.json<{ status?: string; attended_session1?: number | null; attended_session2?: number | null }>();

  // Handle attendance update
  if ("attended_session1" in body || "attended_session2" in body) {
    const updates: string[] = [];
    const params: (string | number | null)[] = [];

    if ("attended_session1" in body) {
      updates.push("attended_session1 = ?");
      params.push(body.attended_session1 ?? null);
    }
    if ("attended_session2" in body) {
      updates.push("attended_session2 = ?");
      params.push(body.attended_session2 ?? null);
    }

    params.push(id);
    const { success } = await c.env.DB.prepare(
      `UPDATE bookings SET ${updates.join(", ")} WHERE id = ?`
    ).bind(...params).run();

    if (!success) {
      return c.json({ error: "Booking not found" }, 404);
    }
    return c.json({ success: true });
  }

  // Handle status update (cancel)
  if (body.status !== "cancelled") {
    return c.json({ error: "Only 'cancelled' status is allowed" }, 400);
  }

  const { success } = await c.env.DB.prepare(
    "UPDATE bookings SET status = ? WHERE id = ?"
  ).bind(body.status, id).run();

  if (!success) {
    return c.json({ error: "Booking not found" }, 404);
  }

  return c.json({ success: true });
});

// Admin: Delete booking (removes record, frees capacity)
app.delete("/api/admin/bookings/:id", async (c) => {
  const authError = requireAdmin(c);
  if (authError) return authError;

  const id = c.req.param("id");

  const { success } = await c.env.DB.prepare(
    "DELETE FROM bookings WHERE id = ?"
  ).bind(id).run();

  if (!success) {
    return c.json({ error: "Booking not found" }, 404);
  }

  return c.json({ success: true });
});

// Helper: Calculate paired date (IST-safe)
function calculatePairedDate(dateStr: string): string | null {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 5) {
    // Friday -> next Monday (+3 days)
    date.setDate(date.getDate() + 3);
  } else if (dayOfWeek === 1) {
    // Monday -> same week Friday (+4 days)
    date.setDate(date.getDate() + 4);
  } else {
    return null;
  }

  return toISTDate(date);
}

// Helper: Send confirmation email
async function sendConfirmationEmail(
  apiKey: string,
  data: {
    childName: string;
    parentName: string;
    parentPhone: string;
    parentEmail?: string | null;
    sessionDate: string;
    pairedDate: string | null;
    bookingId: string;
  }
) {
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const sessionFormatted = new Date(data.sessionDate + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let dateText = `Session 1: ${sessionFormatted}`;
  if (data.pairedDate) {
    const pairedFormatted = new Date(data.pairedDate + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateText += `\nSession 2: ${pairedFormatted}`;
  }

  // Send to business email
  await resend.emails.send({
    from: "Vetha Yogalaya <bookings@vethayogalaya.in>",
    to: "vethayogalaya@gmail.com",
    subject: `New Trial Booking: ${data.childName}`,
    text: `New trial class booking!\n\nChild: ${data.childName}\nParent: ${data.parentName}\nPhone: ${data.parentPhone}\n${data.parentEmail ? `Email: ${data.parentEmail}\n` : ""}${dateText}\n\nBooking ID: ${data.bookingId}`,
  });

  // Send confirmation to parent if email provided
  if (data.parentEmail) {
    await resend.emails.send({
      from: "Vetha Yogalaya <bookings@vethayogalaya.in>",
      to: data.parentEmail,
      subject: `Booking Confirmed - Trial Class for ${data.childName}`,
      text: `Dear ${data.parentName},\n\nYour trial class booking is confirmed!\n\nChild: ${data.childName}\n${dateText}\nTime: 5:00 PM - 6:00 PM\n\nWe look forward to seeing you!\n\nWarm regards,\nVetha Yogalaya`,
    });
  }
}

export default app;
