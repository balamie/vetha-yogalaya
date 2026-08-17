import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Phone,
  CheckCircle2,
  Loader2,
  ArrowRight,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  MessageCircle,
  Baby,
} from "lucide-react";
import { getAvailableDates, formatDateDisplay, formatDateShort } from "../lib/dates";
import type { DateOption } from "../lib/dates";
import { createBooking, getWhatsAppLink, getBulkAvailability } from "../lib/booking";
import type { BookingAvailability } from "../lib/booking";
import { GsapReveal } from "./GsapReveal";

type Step = "select-date" | "fill-details" | "success";

interface FormData {
  parent_name: string;
  parent_phone: string;
  whatsapp_number: string;
  same_as_phone: boolean;
  parent_email: string;
  child_name: string;
  child_age: string;
}

// Month grid calendar helpers
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function BookingSection() {
  const [step, setStep] = useState<Step>("select-date");
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [pairedDateOption, setPairedDateOption] = useState<DateOption | null>(null);
  const [availability, setAvailability] = useState<Record<string, BookingAvailability>>({});
  const [formData, setFormData] = useState<FormData>({
    parent_name: "",
    parent_phone: "",
    whatsapp_number: "",
    same_as_phone: true,
    parent_email: "",
    child_name: "",
    child_age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    sessionDate: string;
    pairedDate: string | null;
    pairedFull: boolean;
  } | null>(null);

  // Calendar state
  const allDates = useMemo(() => getAvailableDates(), []);
  const [calMonth, setCalMonth] = useState(() => {
    const first = allDates[0];
    if (first) {
      const d = new Date(first.date + "T00:00:00");
      return { year: d.getFullYear(), month: d.getMonth() };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  // Build a set of available date strings for quick lookup
  const availableSet = useMemo(() => new Set(allDates.map((d) => d.date)), [allDates]);

  // Fetch bulk availability for all dates on mount
  useEffect(() => {
    const dateStrs = allDates.map((d) => d.date);
    if (dateStrs.length === 0) return;

    getBulkAvailability(dateStrs)
      .then((result) => setAvailability(result))
      .catch(() => {});
  }, [allDates]);

  // Build the calendar grid for the current month
  const calendarGrid = useMemo(() => {
    const { year, month } = calMonth;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: (number | null)[] = [];

    // Fill leading blanks
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [calMonth]);

  // Can navigate to next month?
  const canGoNext = useMemo(() => {
    const lastDate = allDates[allDates.length - 1];
    if (!lastDate) return false;
    const d = new Date(lastDate.date + "T00:00:00");
    return calMonth.year < d.getFullYear() || (calMonth.year === d.getFullYear() && calMonth.month < d.getMonth());
  }, [calMonth, allDates]);

  // Can navigate to prev month?
  const canGoPrev = useMemo(() => {
    const firstDate = allDates[0];
    if (!firstDate) return false;
    const d = new Date(firstDate.date + "T00:00:00");
    return calMonth.year > d.getFullYear() || (calMonth.year === d.getFullYear() && calMonth.month > d.getMonth());
  }, [calMonth, allDates]);

  const handleDateSelect = (dateOption: DateOption) => {
    const avail = availability[dateOption.date];
    if (avail?.full) return;

    setSelectedDate(dateOption);

    // Compute paired date option
    const paired = allDates.find((d) => d.date !== dateOption.date && isPairedTo(dateOption.date, d.date));
    setPairedDateOption(paired || null);

    setStep("fill-details");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const result = await createBooking({
        child_name: formData.child_name,
        child_age: parseInt(formData.child_age, 10),
        parent_name: formData.parent_name,
        parent_phone: formData.parent_phone,
        whatsapp_number: formData.same_as_phone ? undefined : formData.whatsapp_number,
        parent_email: formData.parent_email || undefined,
        session_date: selectedDate.date,
      });

      setBookingResult(result.booking);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  return (
    <section id="booking" className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-24 pb-14 sm:pb-24 bg-wine relative overflow-hidden">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Book Your Spot</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading text-white mt-3">
              Free Trial Class
            </h2>
            <GsapReveal className="text-white/70 mt-3 max-w-lg mx-auto">
              Pick a date from the calendar below. We'll auto-pair you with the next session.
            </GsapReveal>
          </motion.div>

          <div className="mt-8 sm:mt-12">
            <AnimatePresence mode="wait">
              {step === "select-date" && (
                <motion.div
                  key="select-date"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Calendar card */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl">
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        disabled={!canGoPrev}
                        onClick={() => {
                          if (calMonth.month === 0) {
                            setCalMonth({ year: calMonth.year - 1, month: 11 });
                          } else {
                            setCalMonth({ year: calMonth.year, month: calMonth.month - 1 });
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-rose/10 transition-colors disabled:opacity-30"
                      >
                        <ChevronLeft className="h-5 w-5 text-wine" />
                      </button>
                      <h3 className="text-lg font-heading font-semibold text-wine">
                        {MONTH_NAMES[calMonth.month]} {calMonth.year}
                      </h3>
                      <button
                        type="button"
                        disabled={!canGoNext}
                        onClick={() => {
                          if (calMonth.month === 11) {
                            setCalMonth({ year: calMonth.year + 1, month: 0 });
                          } else {
                            setCalMonth({ year: calMonth.year, month: calMonth.month + 1 });
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-rose/10 transition-colors disabled:opacity-30"
                      >
                        <ChevronRight className="h-5 w-5 text-wine" />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="text-center text-xs font-semibold text-charcoal-light/60 py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarGrid.map((day, idx) => {
                        if (day === null) return <div key={`blank-${idx}`} />;

                        const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                        const isAvailable = availableSet.has(dateStr);
                        const isSelected = selectedDate?.date === dateStr;
                        const isFull = isAvailable && availability[dateStr]?.full;

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={!isAvailable || isFull}
                            onClick={() => {
                              if (isAvailable && !isFull) {
                                const opt = allDates.find((d) => d.date === dateStr);
                                if (opt) handleDateSelect(opt);
                              }
                            }}
                            className={`
                              relative rounded-xl py-2.5 text-sm font-medium transition-all
                              ${isSelected ? "bg-wine text-white shadow-md" : ""}
                              ${isAvailable && !isFull && !isSelected ? "bg-rose/20 text-wine hover:bg-gold/20 hover:text-wine-deep cursor-pointer font-semibold" : ""}
                              ${isFull ? "bg-red-50 text-red-400 cursor-not-allowed line-through" : ""}
                              ${!isAvailable ? "text-charcoal-light/30 cursor-default" : ""}
                            `}
                          >
                            {day}
                            {isAvailable && !isFull && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-rose/20 text-xs text-charcoal-light/60">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gold" /> Available
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-400" /> Full
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-charcoal-light/30" /> Unavailable
                      </span>
                    </div>
                  </div>

                  {/* Session details card (appears after date selected) */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 bg-white rounded-2xl p-5 shadow-lg text-left"
                    >
                      <p className="text-wine font-semibold text-sm mb-2">Your Sessions</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-charcoal">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm">{formatDateDisplay(new Date(selectedDate.date + "T00:00:00"))}</span>
                        </div>
                        {pairedDateOption && (
                          <div className="flex items-center gap-2 text-charcoal">
                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                            <span className="text-sm">{formatDateDisplay(new Date(pairedDateOption.date + "T00:00:00"))}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-charcoal-light text-xs mt-2">Time: 5:00 PM – 6:00 PM</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === "fill-details" && selectedDate && (
                <motion.div
                  key="fill-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Selected dates summary */}
                  <div className="bg-white rounded-2xl p-5 mb-6 text-left shadow-lg">
                    <p className="text-wine font-semibold text-sm mb-2">Your Sessions</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-charcoal">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span className="text-sm">{formatDateDisplay(new Date(selectedDate.date + "T00:00:00"))}</span>
                      </div>
                      {pairedDateOption && (
                        <div className="flex items-center gap-2 text-charcoal">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm">{formatDateDisplay(new Date(pairedDateOption.date + "T00:00:00"))}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-charcoal-light text-xs mt-2">Time: 5:00 PM – 6:00 PM</p>
                  </div>

                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 text-left shadow-xl">
                    {/* Parent Details */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-wine" />
                        <h3 className="text-wine font-semibold text-lg">Parent Details</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="parent-name" className="block text-sm font-medium text-charcoal mb-1">
                            Parent Name *
                          </label>
                          <input
                            id="parent-name"
                            type="text"
                            placeholder="Parent Name"
                            required
                            minLength={2}
                            maxLength={50}
                            value={formData.parent_name}
                            onChange={updateForm("parent_name")}
                            className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="parent-phone" className="block text-sm font-medium text-charcoal mb-1">
                            Mobile Number *
                          </label>
                          <input
                            id="parent-phone"
                            type="tel"
                            placeholder="Parent Mobile Number"
                            required
                            minLength={10}
                            maxLength={15}
                            value={formData.parent_phone}
                            onChange={updateForm("parent_phone")}
                            className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>

                        {/* WhatsApp same as phone checkbox */}
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.same_as_phone}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  same_as_phone: e.target.checked,
                                  whatsapp_number: e.target.checked ? "" : prev.whatsapp_number,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-rose-dark/30 peer-focus:ring-2 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-wine"></div>
                          </label>
                          <span className="text-sm text-charcoal flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-green-600" />
                            WhatsApp number is the same as mobile number
                          </span>
                        </div>

                        {!formData.same_as_phone && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <label htmlFor="whatsapp-number" className="block text-sm font-medium text-charcoal mb-1">
                              WhatsApp Number
                            </label>
                            <input
                              id="whatsapp-number"
                              type="tel"
                              placeholder="WhatsApp Number (if different)"
                              minLength={10}
                              maxLength={15}
                              value={formData.whatsapp_number}
                              onChange={updateForm("whatsapp_number")}
                              className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                            />
                          </motion.div>
                        )}

                        <div>
                          <label htmlFor="parent-email" className="block text-sm font-medium text-charcoal mb-1">
                            Email Address <span className="text-charcoal-light/50">(optional)</span>
                          </label>
                          <input
                            id="parent-email"
                            type="email"
                            placeholder="Parent Email"
                            value={formData.parent_email}
                            onChange={updateForm("parent_email")}
                            className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-rose/20 my-6" />

                    {/* Child Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Baby className="h-5 w-5 text-wine" />
                        <h3 className="text-wine font-semibold text-lg">Child Details</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="child-name" className="block text-sm font-medium text-charcoal mb-1">
                            Child's Name *
                          </label>
                          <input
                            id="child-name"
                            type="text"
                            placeholder="Child's Name"
                            required
                            minLength={2}
                            maxLength={50}
                            value={formData.child_name}
                            onChange={updateForm("child_name")}
                            className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="child-age" className="block text-sm font-medium text-charcoal mb-1">
                            Child's Age *
                          </label>
                          <input
                            id="child-age"
                            type="number"
                            placeholder="Child's Age"
                            required
                            min={1}
                            max={100}
                            value={formData.child_age}
                            onChange={updateForm("child_age")}
                            className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-4">
                        <p className="text-red-600 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("select-date");
                          setError(null);
                        }}
                        className="px-6 py-3 rounded-full border border-rose-dark/30 text-wine font-semibold hover:bg-rose/10 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-full bg-wine text-white px-8 py-3 font-heading font-semibold hover:bg-wine-light transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-wine/20 disabled:opacity-70"
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Book Trial Class
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === "success" && bookingResult && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-wine font-bold text-xl mb-2">Booking Confirmed!</h3>
                  <p className="text-charcoal-light mb-6">
                    We've sent a confirmation email. See you on the mat!
                  </p>

                  <div className="bg-cream rounded-xl p-4 mb-6 text-left">
                    <p className="text-wine font-semibold text-sm mb-2">Your Sessions</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-charcoal">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span className="text-sm">{formatDateDisplay(new Date(bookingResult.sessionDate + "T00:00:00"))}</span>
                      </div>
                      {bookingResult.pairedDate && (
                        <div className="flex items-center gap-2 text-charcoal">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm">{formatDateDisplay(new Date(bookingResult.pairedDate + "T00:00:00"))}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-charcoal-light text-xs mt-2">Time: 5:00 PM – 6:00 PM</p>
                    {bookingResult.pairedFull && (
                      <p className="text-amber-600 text-xs mt-2">
                        Note: The paired session was fully booked. You've been booked for the selected date only.
                      </p>
                    )}
                  </div>

                  <a
                    href={getWhatsAppLink({
                      childName: formData.child_name,
                      sessionDate: bookingResult.sessionDate,
                      pairedDate: bookingResult.pairedDate,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-white font-semibold hover:bg-[#20BD5A] transition-colors shadow-lg shadow-[#25D366]/20"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Confirm on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("select-date");
                      setSelectedDate(null);
                      setPairedDateOption(null);
                      setFormData({
                        parent_name: "",
                        parent_phone: "",
                        whatsapp_number: "",
                        same_as_phone: true,
                        parent_email: "",
                        child_name: "",
                        child_age: "",
                      });
                      setBookingResult(null);
                    }}
                    className="mt-4 text-charcoal-light hover:text-wine text-sm transition-colors"
                  >
                    Book another class
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper: check if two dates are paired
function isPairedTo(date1: string, date2: string): boolean {
  const [y1, m1, d1] = date1.split("-").map(Number);
  const [y2, m2, d2] = date2.split("-").map(Number);
  const dt1 = new Date(y1, m1 - 1, d1);
  const dt2 = new Date(y2, m2 - 1, d2);
  const diff = Math.abs(dt1.getTime() - dt2.getTime());
  const days = diff / (1000 * 60 * 60 * 24);
  return (days === 3 || days === 4) && dt1.getDay() !== dt2.getDay();
}
