// API client functions for the booking system

const API_URL = import.meta.env.VITE_BOOKING_API_URL || "https://booking-api.balamie.workers.dev";

export interface BookingAvailability {
  date: string;
  booked: number;
  remaining: number;
  full: boolean;
}

export interface BookingRequest {
  child_name: string;
  child_age: number;
  parent_name: string;
  parent_phone: string;
  whatsapp_number?: string;
  parent_email?: string;
  session_date: string;
}

export interface BookingResponse {
  success: boolean;
  booking: {
    id: string;
    sessionDate: string;
    pairedDate: string | null;
    pairedFull: boolean;
  };
}

export interface Booking {
  id: string;
  child_name: string;
  child_age: number;
  parent_name: string;
  parent_phone: string;
  whatsapp_number: string | null;
  parent_email: string | null;
  session_date: string;
  paired_date: string | null;
  created_at: string;
  status: "confirmed" | "cancelled";
  attended_session1: number | null;
  attended_session2: number | null;
}

export interface AdminStats {
  totalPastBookings: number;
  session1Attended: number;
  session2Attended: number;
  totalSession2Eligible: number;
}

/**
 * Get availability for a specific date
 */
export async function getAvailability(date: string): Promise<BookingAvailability> {
  const res = await fetch(`${API_URL}/api/availability?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch availability");
  return res.json();
}

/**
 * Get bulk availability for multiple dates
 */
export async function getBulkAvailability(
  dates: string[]
): Promise<Record<string, BookingAvailability>> {
  const res = await fetch(`${API_URL}/api/availability/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dates }),
  });
  if (!res.ok) throw new Error("Failed to fetch availability");
  return res.json();
}

/**
 * Create a new booking
 */
export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to create booking");
  }

  return result;
}

/**
 * Get all bookings (admin only)
 */
export async function getBookings(filters?: {
  from?: string;
  to?: string;
}): Promise<{ bookings: Booking[]; stats: AdminStats }> {
  const params = new URLSearchParams();
  if (filters?.from) params.set("from", filters.from);
  if (filters?.to) params.set("to", filters.to);

  const res = await fetch(`${API_URL}/api/admin/bookings?${params}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

/**
 * Cancel a booking (admin only)
 */
export async function cancelBooking(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "cancelled" }),
  });

  if (!res.ok) throw new Error("Failed to cancel booking");
}

/**
 * Delete a booking (admin only)
 */
export async function deleteBooking(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete booking");
}

/**
 * Mark attendance for a booking (admin only)
 */
export async function updateAttendance(
  id: string,
  session: 1 | 2,
  attended: boolean
): Promise<void> {
  const field = session === 1 ? "attended_session1" : "attended_session2";
  const res = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: attended ? 1 : 0 }),
  });

  if (!res.ok) throw new Error("Failed to update attendance");
}

/**
 * Generate WhatsApp confirmation link
 */
export function getWhatsAppLink(data: {
  childName: string;
  sessionDate: string;
  pairedDate: string | null;
}): string {
  const sessionFormatted = new Date(data.sessionDate + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  let message = `Hi Vetha Yogalaya! I've booked a trial class for ${data.childName} on ${sessionFormatted}.`;

  if (data.pairedDate) {
    const pairedFormatted = new Date(data.pairedDate + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    message += ` And also on ${pairedFormatted}.`;
  }

  message += " Looking forward to it!";

  return `https://wa.me/917550148784?text=${encodeURIComponent(message)}`;
}
