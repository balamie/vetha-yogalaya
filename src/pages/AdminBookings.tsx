import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Trash2,
  XCircle,
  CheckCircle2,
  Loader2,
  Users,
  Phone,
  Mail,
  Check,
  X,
  BarChart3,
} from "lucide-react";
import { getBookings, cancelBooking, deleteBooking, updateAttendance, isAdminLoggedIn, setAdminAuth } from "../lib/booking";
import type { Booking, AdminStats } from "../lib/booking";

type SortField = "session_date" | "created_at" | "child_name";
type SortOrder = "asc" | "desc";

export function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>("session_date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [attendingLoading, setAttendingLoading] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(!isAdminLoggedIn());

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser || !loginPass) {
      setLoginError("Username and password required");
      return;
    }
    setAdminAuth(loginUser, loginPass);
    setShowLogin(false);
    setLoginError(null);
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getBookings({
        from: dateFrom || undefined,
        to: dateTo || undefined,
      });
      setBookings(result.bookings);
      if (result.stats) setStats(result.stats);
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        setShowLogin(true);
        setError(null);
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch bookings");
      }
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this booking? The capacity slot will NOT be freed.")) return;
    setActionLoading(id);
    try {
      await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to cancel booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("PERMANENTLY DELETE this booking? The capacity slot WILL be freed.")) return;
    setActionLoading(id);
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAttendance = async (id: string, session: 1 | 2, attended: boolean) => {
    setAttendingLoading(`${id}-s${session}`);
    try {
      await updateAttendance(id, session, attended);
      setBookings((prev) =>
        prev.map((b) => {
          if (b.id !== id) return b;
          return session === 1
            ? { ...b, attended_session1: attended ? 1 : 0 }
            : { ...b, attended_session2: attended ? 1 : 0 };
        })
      );
      // Refresh stats after attendance change
      const result = await getBookings({
        from: dateFrom || undefined,
        to: dateTo || undefined,
      });
      if (result.stats) setStats(result.stats);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update attendance");
    } finally {
      setAttendingLoading(null);
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortOrder === "asc" ? cmp : -cmp;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold font-heading text-wine mb-2">Booking Management</h1>
          <p className="text-charcoal-light mb-6">View and manage all trial class bookings and attendance.</p>

          {/* Login Gate */}
          {showLogin && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-rose/30 mb-6 max-w-md">
              <h2 className="text-xl font-bold text-wine mb-4">Admin Login</h2>
              <p className="text-sm text-charcoal-light mb-4">Enter your admin credentials to view bookings.</p>
              {loginError && <p className="text-sm text-red-500 mb-3">{loginError}</p>}
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label htmlFor="admin-user" className="block text-sm font-medium text-charcoal mb-1">Username</label>
                  <input
                    id="admin-user"
                    type="text"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="admin-pass" className="block text-sm font-medium text-charcoal mb-1">Password</label>
                  <input
                    id="admin-pass"
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-wine px-4 py-2.5 text-sm font-heading font-semibold text-white hover:bg-wine-light transition-colors"
                >
                  Log In
                </button>
              </form>
            </div>
          )}

          {/* Stats Summary */}
          {!showLogin && stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={<Calendar className="h-5 w-5" />}
                label="Total Past Bookings"
                value={stats.totalPastBookings}
              />
              <StatCard
                icon={<Check className="h-5 w-5" />}
                label="Session 1 Attended"
                value={stats.session1Attended}
                accent="green"
              />
              <StatCard
                icon={<Check className="h-5 w-5" />}
                label="Session 2 Attended"
                value={stats.session2Attended}
                accent="blue"
              />
              <StatCard
                icon={<BarChart3 className="h-5 w-5" />}
                label="Session 2 Eligible"
                value={stats.totalSession2Eligible}
                accent="purple"
              />
            </div>
          )}

          {/* Filters */}
          {!showLogin && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose/30 mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="date-from" className="block text-sm font-medium text-wine mb-1">
                  From Date
                </label>
                <input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="rounded-xl border border-rose-dark/30 bg-white px-4 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
              </div>
              <div>
                <label htmlFor="date-to" className="block text-sm font-medium text-wine mb-1">
                  To Date
                </label>
                <input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="rounded-xl border border-rose-dark/30 bg-white px-4 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setDateFrom("");
                  setDateTo("");
                }}
                className="px-4 py-2 rounded-xl border border-rose-dark/30 text-sm text-charcoal hover:bg-rose/20 transition-colors"
              >
                Clear Filters
              </button>
              <div className="ml-auto text-sm text-charcoal-light">
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          )}

          {/* Bookings Table */}
          {!showLogin && (
          <div className="bg-white rounded-2xl shadow-sm border border-rose/30 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <Loader2 className="h-8 w-8 text-wine animate-spin mx-auto mb-4" />
                <p className="text-charcoal-light">Loading bookings...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={fetchBookings}
                  className="px-4 py-2 rounded-xl bg-wine text-white text-sm font-semibold hover:bg-wine-light transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="h-12 w-12 text-rose-dark/40 mx-auto mb-4" />
                <p className="text-charcoal-light">No bookings found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-rose/30">
                      <th
                        onClick={() => toggleSort("session_date")}
                        className="px-3 py-3 text-left text-xs font-semibold text-wine cursor-pointer hover:bg-rose/10 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          Session 1
                          {sortField === "session_date" && (
                            <span className="text-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </span>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">
                        Paired Date
                      </th>
                      <th
                        onClick={() => toggleSort("child_name")}
                        className="px-3 py-3 text-left text-xs font-semibold text-wine cursor-pointer hover:bg-rose/10 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          Child
                          {sortField === "child_name" && (
                            <span className="text-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </span>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">Age</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Parent</span>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</span>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email</span>
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-semibold text-wine">S1</th>
                      <th className="px-3 py-3 text-center text-xs font-semibold text-wine">S2</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-wine">Status</th>
                      <th
                        onClick={() => toggleSort("created_at")}
                        className="px-3 py-3 text-left text-xs font-semibold text-wine cursor-pointer hover:bg-rose/10 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          Booked
                          {sortField === "created_at" && (
                            <span className="text-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </span>
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-wine">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBookings.map((booking) => {
                      const isCancelled = booking.status === "cancelled";
                      const isLoadingRow = actionLoading === booking.id;
                      const isLoadingS1 = attendingLoading === `${booking.id}-s1`;
                      const isLoadingS2 = attendingLoading === `${booking.id}-s2`;

                      return (
                        <tr
                          key={booking.id}
                          className={`border-b border-rose/20 hover:bg-rose/5 transition-colors ${
                            isCancelled ? "opacity-50" : ""
                          }`}
                        >
                          {/* Session 1 date */}
                          <td className="px-3 py-3 text-sm text-charcoal">
                            {formatDate(booking.session_date)}
                          </td>

                          {/* Paired date */}
                          <td className="px-3 py-3 text-sm text-charcoal-light">
                            {booking.paired_date ? formatDate(booking.paired_date) : "—"}
                          </td>

                          {/* Child name */}
                          <td className="px-3 py-3 text-sm font-medium text-wine">
                            {booking.child_name}
                          </td>

                          {/* Age */}
                          <td className="px-3 py-3 text-sm text-charcoal">{booking.child_age}</td>

                          {/* Parent name */}
                          <td className="px-3 py-3 text-sm text-charcoal">
                            {booking.parent_name || "—"}
                          </td>

                          {/* Phone */}
                          <td className="px-3 py-3 text-sm text-charcoal">
                            {booking.parent_phone}
                          </td>

                          {/* Email */}
                          <td className="px-3 py-3 text-sm text-charcoal-light">
                            {booking.parent_email || "—"}
                          </td>

                          {/* Attendance S1 */}
                          <td className="px-3 py-3 text-center">
                            {booking.paired_date || booking.session_date ? (
                              <AttendanceCheckbox
                                checked={booking.attended_session1 === 1}
                                loading={isLoadingS1}
                                disabled={isCancelled || isLoadingRow}
                                onToggle={() =>
                                  handleAttendance(booking.id, 1, booking.attended_session1 !== 1)
                                }
                              />
                            ) : (
                              <span className="text-charcoal-light">—</span>
                            )}
                          </td>

                          {/* Attendance S2 */}
                          <td className="px-3 py-3 text-center">
                            {booking.paired_date ? (
                              <AttendanceCheckbox
                                checked={booking.attended_session2 === 1}
                                loading={isLoadingS2}
                                disabled={isCancelled || isLoadingRow}
                                onToggle={() =>
                                  handleAttendance(booking.id, 2, booking.attended_session2 !== 1)
                                }
                              />
                            ) : (
                              <span className="text-charcoal-light text-xs">No pair</span>
                            )}
                          </td>

                          {/* Status badge */}
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                isCancelled
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {isCancelled ? (
                                <XCircle className="h-3 w-3" />
                              ) : (
                                <CheckCircle2 className="h-3 w-3" />
                              )}
                              {booking.status}
                            </span>
                          </td>

                          {/* Created at */}
                          <td className="px-3 py-3 text-sm text-charcoal-light whitespace-nowrap">
                            {new Date(booking.created_at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          {/* Actions */}
                          <td className="px-3 py-3 text-right">
                            {!isCancelled && (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleCancel(booking.id)}
                                  disabled={isLoadingRow}
                                  className="p-1.5 rounded-lg text-orange-600 hover:bg-orange-100 transition-colors disabled:opacity-50"
                                  title="Cancel booking (keeps capacity)"
                                >
                                  {isLoadingRow ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <XCircle className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(booking.id)}
                                  disabled={isLoadingRow}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                  title="Delete booking (frees capacity)"
                                >
                                  {isLoadingRow ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          )}

          {/* Legend */}
          {!showLogin && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-rose/30">
            <p className="text-sm font-semibold text-wine mb-2">Legend</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded border-2 border-green-500 bg-green-50 text-green-600">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-charcoal"><strong>S1</strong> — Session 1 attended (primary session date)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded border-2 border-green-500 bg-green-50 text-green-600">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-charcoal"><strong>S2</strong> — Session 2 attended (paired date)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-orange-600" />
                <span className="text-charcoal"><strong>Cancel</strong> — Sets status to cancelled, capacity NOT freed</span>
              </div>
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-600" />
                <span className="text-charcoal"><strong>Delete</strong> — Permanently removes, capacity IS freed</span>
              </div>
            </div>
          </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────────────────── */

function StatCard({
  icon,
  label,
  value,
  accent = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: "default" | "green" | "blue" | "purple";
}) {
  const colors = {
    default: "bg-wine/5 text-wine",
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose/30">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${colors[accent]}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-wine">{value}</p>
          <p className="text-xs text-charcoal-light">{label}</p>
        </div>
      </div>
    </div>
  );
}

function AttendanceCheckbox({
  checked,
  loading,
  disabled,
  onToggle,
}: {
  checked: boolean;
  loading: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center h-6 w-6 rounded-md border-2 transition-all disabled:opacity-50 ${
        checked
          ? "border-green-500 bg-green-500 text-white"
          : "border-rose-dark/30 bg-white text-transparent hover:border-green-400"
      }`}
      title={checked ? "Mark as not attended" : "Mark as attended"}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-wine" />
      ) : checked ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <span className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
