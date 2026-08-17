// Date calculation helpers for the booking system
// All dates use IST (UTC+5:30) for consistency

const IST_OFFSET = 5.5 * 60; // IST offset in minutes

/**
 * Indian Government Holidays (fixed-date national holidays)
 * These are blocked on Mon/Fri booking days.
 * Variable-date holidays (Holi, Diwali, Eid) are added per year.
 */
const INDIAN_HOLIDAYS: Record<string, string> = {
  // Fixed-date national holidays
  "01-26": "Republic Day",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  // 2026 variable holidays
  "2026-03-10": "Holi",
  "2026-03-20": "Eid al-Fitr",
  "2026-05-27": "Eid al-Adha",
  "2026-10-20": "Diwali",
  "2026-11-07": "Diwali (Govt Holiday)",
  // 2027 variable holidays (approximate)
  "2027-03-29": "Holi",
  "2027-04-09": "Eid al-Fitr",
  "2027-06-05": "Eid al-Adha",
  "2027-11-09": "Diwali",
};

/**
 * Check if a date string (YYYY-MM-DD) is an Indian government holiday
 */
export function isIndianHoliday(dateStr: string): boolean {
  // Check exact date first (for variable holidays)
  if (INDIAN_HOLIDAYS[dateStr]) return true;
  // Check month-day (for fixed holidays)
  const mmdd = dateStr.slice(5);
  return !!INDIAN_HOLIDAYS[mmdd];
}

/**
 * Get the holiday name if the date is a holiday, or null
 */
export function getHolidayName(dateStr: string): string | null {
  if (INDIAN_HOLIDAYS[dateStr]) return INDIAN_HOLIDAYS[dateStr];
  const mmdd = dateStr.slice(5);
  return INDIAN_HOLIDAYS[mmdd] || null;
}

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
  isHoliday: boolean;
  holidayName: string | null;
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
 * Holidays are included but marked as unavailable.
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
      const dateStr = formatDateISO(d);
      const holidayName = getHolidayName(dateStr);
      dates.push({
        date: dateStr,
        label: formatDateDisplay(d),
        shortLabel: formatDateShort(d),
        dayName: day === 5 ? "Friday" : "Monday",
        isHoliday: !!holidayName,
        holidayName,
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
