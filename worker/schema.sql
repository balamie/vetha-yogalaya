CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL CHECK(child_age >= 1 AND child_age <= 100),
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  whatsapp_number TEXT,
  parent_email TEXT NOT NULL,
  session_date TEXT NOT NULL,
  paired_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'confirmed' CHECK(status IN ('confirmed', 'cancelled')),
  attended_session1 INTEGER DEFAULT NULL,
  attended_session2 INTEGER DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_bookings_session_date ON bookings(session_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_parent_phone ON bookings(parent_phone);
