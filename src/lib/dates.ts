// Date calculation helpers for the booking system
// All dates use IST (UTC+5:30) for consistency

const IST_OFFSET = 5.5 * 60; // IST offset in minutes

/**
 * Get current date in IST
 */
function getISTDate(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + IST_OFFSET * 60000);
}

/**
 * Parse a YYYY-MM-DD string as an IST date (not UTC)
 */
function parseISTDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export interface DateOption {
  date: string; // YYYY-MM-DD
  label: string; // e.g., "Friday, 21 Aug 2026"
  shortLabel: string; // e.g., "Fri 21 Aug"
  dayName: string; // e.g., "Friday"
}

/**
 * Format date as YYYY-MM-DD using IST
 */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Format date for display in IST
 */
export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date for short display
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Get the paired date for a given date
 * Friday -> next Monday (+3 days)
 * Monday -> same week Friday (+4 days)
 */
export function getPairedDate(date: Date): Date {
  const day = date.getDay();
  const paired = new Date(date);

  if (day === 5) {
    // Friday -> next Monday
    paired.setDate(date.getDate() + 3);
  } else if (day === 1) {
    // Monday -> same week Friday
    paired.setDate(date.getDate() + 4);
  }

  return paired;
}

/**
 * Get all available booking dates within 30 days from today.
 * Only Fridays and Mondays are included.
 * Today is excluded if it is a Mon/Fri.
 */
export function getAvailableDates(): DateOption[] {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);
  const dates: DateOption[] = [];

  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay();
    if (day === 1 || day === 5) {
      dates.push({
        date: formatDateISO(d),
        label: formatDateDisplay(d),
        shortLabel: formatDateShort(d),
        dayName: day === 5 ? "Friday" : "Monday",
      });
    }
  }

  return dates;
}

/**
 * Validate that a date string is a valid booking date (Friday or Monday)
 */
export function isValidBookingDay(dateStr: string): boolean {
  const date = parseISTDate(dateStr);
  const day = date.getDay();
  return day === 1 || day === 5;
}

/**
 * Validate that a date is in the future (IST)
 */
export function isFutureDate(dateStr: string): boolean {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);
  const date = parseISTDate(dateStr);
  return date > today;
}

/**
 * Check if a date is within the 30-day booking window
 */
export function isWithinBookingWindow(dateStr: string): boolean {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);
  const date = parseISTDate(dateStr);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);
  return date > today && date <= maxDate;
}
