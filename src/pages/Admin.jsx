import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Mail, CheckCircle2, XCircle, Clock, Copy, ExternalLink, ArrowLeft, Phone } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [tab, setTab] = useState("bookings");
  const [copied, setCopied] = useState(false);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");

  useEffect(() => {
    base44.entities.Booking.list("-created_date", 50).then(setBookings);
    base44.entities.NewsletterSubscriber.list("-created_date", 100).then(setSubscribers);

    // Real-time subscription for bookings
    const unsubBookings = base44.entities.Booking.subscribe((event) => {
      if (event.type === 'create') {
        setBookings(prev => [event.data, ...prev]);
      } else if (event.type === 'update') {
        setBookings(prev => prev.map(b => b.id === event.id ? event.data : b));
      } else if (event.type === 'delete') {
        setBookings(prev => prev.filter(b => b.id !== event.id));
      }
    });

    // Real-time subscription for subscribers
    const unsubSubscribers = base44.entities.NewsletterSubscriber.subscribe((event) => {
      if (event.type === 'create') {
        setSubscribers(prev => [event.data, ...prev]);
      } else if (event.type === 'delete') {
        setSubscribers(prev => prev.filter(s => s.id !== event.id));
      }
    });

    return () => {
      unsubBookings();
      unsubSubscribers();
    };
  }, []);



  const webhookNote = "Copiez l'URL de la fonction calendlyWebhook depuis Dashboard → Code → Functions, puis collez-la dans Calendly → Intégrations → Webhooks.";

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async (id) => {
    await base44.entities.Booking.update(id, { status: "confirmed" });
    await base44.functions.invoke('sendBookingNotification', { bookingId: id, action: 'confirmed' });
  };

  const handleReject = async (id) => {
    await base44.entities.Booking.update(id, { status: "cancelled" });
    await base44.functions.invoke('sendBookingNotification', { bookingId: id, action: 'rejected' });
  };

  const handleReschedule = (id) => {
    if (rescheduleDate) {
      base44.entities.Booking.update(id, { start_time: rescheduleDate });
      setRescheduleId(null);
      setRescheduleDate("");
    }
  };

  const confirmed = bookings.filter(b => b.status === "confirmed");
  const cancelled = bookings.filter(b => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border/50 px-6 py-4 flex items-center gap-4">
        <img src={LOGO_URL} alt="IBO Barber" className="h-10 w-10 rounded-full" />
        <div>
          <button onClick={() => base44.auth.redirectToLogin()} className="font-heading text-xl hover:text-primary transition-colors cursor-pointer">IBO Barber — Admin</button>
          <p className="font-body text-xs text-muted-foreground">Dashboard</p>
        </div>
        <a href="/" className="ml-auto font-body text-xs text-primary hover:underline flex items-center gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-primary" },
            { label: "Confirmed", value: confirmed.length, icon: CheckCircle2, color: "text-green-500" },
            { label: "Cancelled", value: cancelled.length, icon: XCircle, color: "text-red-400" },
            { label: "Subscribers", value: subscribers.length, icon: Mail, color: "text-blue-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-4">
              <Icon className={`h-6 w-6 ${color}`} />
              <div>
                <p className="font-heading text-2xl">{value}</p>
                <p className="font-body text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Webhook Setup Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-body text-sm font-medium text-foreground mb-1">Calendly Webhook Setup</p>
            <p className="font-body text-xs text-muted-foreground mb-3">
              To receive automatic notifications, go to <strong>Dashboard → Code → Functions → calendlyWebhook</strong>, copy the endpoint URL, then paste it in <strong>Calendly → Integrations → Webhooks</strong> with events <em>invitee.created</em> and <em>invitee.canceled</em>.
            </p>
            <a
              href="https://calendly.com/integrations/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-primary hover:underline flex items-center gap-1"
            >
              Open Calendly Webhooks <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["bookings", "subscribers"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-sm px-5 py-2 rounded-full transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"}`}
            >
              {t === "bookings" ? `Bookings (${bookings.length})` : `Newsletter Subscribers (${subscribers.length})`}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        {tab === "bookings" && (
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
            {bookings.length === 0 ? (
              <div className="py-16 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground">No bookings received yet.</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Set up the Calendly webhook above.</p>
              </div>
            ) : (
              <>
                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-border/30">
                  {bookings.map(b => (
                    <div key={b.id} className="p-4 space-y-3">
                      {/* Name + status */}
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-base font-medium text-foreground">{b.client_name}</p>
                        <span className={`font-body text-xs px-3 py-1 rounded-full flex-shrink-0 ${b.status === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                          {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </span>
                      </div>
                      {/* Contact */}
                      <div className="space-y-1">
                        <a href={`mailto:${b.client_email}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                          {b.client_email}
                        </a>
                        {b.client_phone && (
                          <a href={`tel:${b.client_phone}`} className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                            <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                            {b.client_phone}
                          </a>
                        )}
                      </div>
                      {/* Service + datetime */}
                      <div className="space-y-0.5">
                        {b.service && <p className="font-body text-sm text-foreground">{b.service}</p>}
                        <p className="font-body text-sm text-muted-foreground">
                          {b.start_time ? new Date(b.start_time).toLocaleString("fr-CA") : "—"}
                        </p>
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col gap-2 pt-1">
                        {b.status !== "confirmed" && (
                          <button onClick={() => handleConfirm(b.id)} className="font-body text-sm w-full py-2.5 bg-green-500/10 text-green-400 rounded-full hover:bg-green-500/20 transition-colors">
                            Confirm
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button onClick={() => handleReject(b.id)} className="font-body text-sm w-full py-2.5 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-colors">
                            Reject
                          </button>
                        )}
                        <button onClick={() => setRescheduleId(rescheduleId === b.id ? null : b.id)} className="font-body text-sm w-full py-2.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">
                          Reschedule
                        </button>
                        {rescheduleId === b.id && (
                          <div className="flex flex-col gap-2 pt-1">
                            <input type="datetime-local" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} className="w-full bg-input border border-border/50 rounded-lg px-3 py-2.5 text-sm font-body text-foreground" />
                            <div className="flex gap-2">
                              <button onClick={() => handleReschedule(b.id)} className="flex-1 font-body text-sm py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90">
                                Save
                              </button>
                              <button onClick={() => { setRescheduleId(null); setRescheduleDate(""); }} className="flex-1 font-body text-sm py-2.5 bg-muted text-muted-foreground rounded-full hover:bg-muted/80">
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/50">
                      <tr>
                        {["Client", "Contact", "Service", "Date & Time", "Status", "Actions"].map(h => (
                          <th key={h} className="text-left font-body text-xs text-muted-foreground px-5 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <React.Fragment key={b.id}>
                          <tr className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="font-body text-sm px-5 py-3">{b.client_name}</td>
                            <td className="font-body text-xs text-muted-foreground px-5 py-3">
                              <div>{b.client_email}</div>
                              {b.client_phone && (
                                <a href={`tel:${b.client_phone}`} className="flex items-center gap-1 hover:text-primary transition-colors mt-0.5">
                                  <Phone className="h-3 w-3" />
                                  {b.client_phone}
                                </a>
                              )}
                            </td>
                            <td className="font-body text-xs px-5 py-3">{b.service || "—"}</td>
                            <td className="font-body text-xs text-muted-foreground px-5 py-3">
                              {b.start_time ? new Date(b.start_time).toLocaleString("fr-CA") : "—"}
                            </td>
                            <td className="px-5 py-3">
                              <span className={`font-body text-xs px-3 py-1 rounded-full ${b.status === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                              </span>
                            </td>
                            <td className="px-5 py-3 flex gap-2">
                              {b.status !== "confirmed" && (
                                <button onClick={() => handleConfirm(b.id)} className="font-body text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full hover:bg-green-500/20 transition-colors">
                                  Confirm
                                </button>
                              )}
                              {b.status === "confirmed" && (
                                <button onClick={() => handleReject(b.id)} className="font-body text-xs px-3 py-1 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-colors">
                                  Reject
                                </button>
                              )}
                              <button onClick={() => setRescheduleId(b.id)} className="font-body text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">
                                Reschedule
                              </button>
                            </td>
                          </tr>
                          {rescheduleId === b.id ? (
                            <tr className="bg-muted/30">
                              <td colSpan="6" className="px-5 py-4">
                                <div className="flex gap-2 items-center">
                                  <input type="datetime-local" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} className="flex-1 bg-input border border-border/50 rounded-lg px-3 py-2 text-sm font-body text-foreground" />
                                  <button onClick={() => handleReschedule(b.id)} className="font-body text-xs px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90">
                                    Save
                                  </button>
                                  <button onClick={() => { setRescheduleId(null); setRescheduleDate(""); }} className="font-body text-xs px-4 py-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80">
                                    Cancel
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Subscribers Table */}
        {tab === "subscribers" && (
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
            {subscribers.length === 0 ? (
              <div className="py-16 text-center">
                <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground">No subscribers yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border/50">
                    <tr>
                      {["Email", "Signup Date"].map(h => (
                        <th key={h} className="text-left font-body text-xs text-muted-foreground px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(s => (
                      <tr key={s.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30">
                        <td className="font-body text-sm px-5 py-3">{s.email}</td>
                        <td className="font-body text-xs text-muted-foreground px-5 py-3">
                          {new Date(s.created_date).toLocaleDateString("fr-CA")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}