import { useState } from "react";
import { X, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const SERVICES_FR = ["Coupe homme — 18$", "Coupe garçon — 12$", "Coupe Fade / Dégradé à peau — 22$", "Barbe — 10$", "Coupe + Barbe — 25$", "Fade + Barbe — 28$"];
const SERVICES_EN = ["Men's Haircut — 18$", "Boy's Haircut — 12$", "Fade / Skin Fade — 22$", "Beard Trim — 10$", "Cut + Beard — 25$", "Fade + Beard — 28$"];

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) dates.push(d); // exclude Sundays
  }
  return dates;
}

const fmt = (d, lang) => d.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { weekday: "short", month: "short", day: "numeric" });

export default function BookingModal({ isOpen, onClose, preSelectedService }) {
  const { lang } = useLang();
  const tx = t[lang].booking;
  const services = lang === "fr" ? SERVICES_FR : SERVICES_EN;

  const [step, setStep] = useState(0);
  const [service, setService] = useState(preSelectedService ?? null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const dates = getDates();

  const reset = () => {
    setStep(0); setService(preSelectedService ?? null);
    setDate(null); setTime(null);
    setName(""); setEmail(""); setPhone("");
    setDone(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Booking.create({
      client_name: name,
      client_email: email,
      service: service,
      start_time: `${fmt(date, lang)} ${time}`,
      status: "confirmed",
    });
    setLoading(false);
    setDone(true);
  };

  const morningSlots = TIME_SLOTS.filter(t => parseInt(t) < 12);
  const afternoonSlots = TIME_SLOTS.filter(t => parseInt(t) >= 12);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-16 lg:inset-24 z-50 bg-card border border-border/50 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-w-lg mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div>
                <h3 className="font-heading text-xl text-foreground">{tx.title}</h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{tx.subtitle}</p>
              </div>
              <button onClick={handleClose} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            {/* Steps indicator */}
            {!done && (
              <div className="flex items-center justify-center gap-3 py-4 border-b border-border/30">
                {[tx.step_service, tx.step_datetime, tx.step_contact].map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-body transition-colors ${step === i ? "bg-primary text-primary-foreground" : step > i ? "bg-primary/30 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </div>
                    <span className={`font-body text-xs hidden sm:block ${step === i ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                    {i < 2 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {done ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-heading text-2xl text-foreground">{tx.success_title}</h4>
                  <p className="font-body text-sm text-muted-foreground max-w-xs">{tx.success_sub}</p>
                  <div className="mt-2 bg-muted rounded-xl px-5 py-3 text-left w-full max-w-xs">
                    <p className="font-body text-xs text-muted-foreground">{service}</p>
                    <p className="font-body text-xs text-muted-foreground">{fmt(date, lang)} · {time}</p>
                  </div>
                  <button onClick={handleClose} className="mt-4 font-body text-sm px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90">
                    {tx.close}
                  </button>
                </div>
              ) : step === 0 ? (
                <div className="space-y-3">
                  <p className="font-body text-sm text-muted-foreground mb-4">{tx.select_service}</p>
                  {services.map((s) => (
                    <button key={s} onClick={() => setService(s)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border font-body text-sm transition-all ${service === s ? "border-primary bg-primary/10 text-foreground" : "border-border/50 bg-card hover:border-primary/40 text-muted-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              ) : step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-3">{tx.select_date}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {dates.map((d, i) => (
                        <button key={i} onClick={() => setDate(d)}
                          className={`px-4 py-2.5 rounded-xl border font-body text-xs transition-all ${date && fmt(date, lang) === fmt(d, lang) ? "border-primary bg-primary/10 text-foreground" : "border-border/50 hover:border-primary/40 text-muted-foreground"}`}>
                          {fmt(d, lang)}
                        </button>
                      ))}
                    </div>
                  </div>
                  {date && (
                    <div>
                      <p className="font-body text-sm text-muted-foreground mb-3">{tx.select_time}</p>
                      <div className="mb-2">
                        <p className="font-body text-xs text-muted-foreground/60 mb-2">{tx.morning}</p>
                        <div className="flex flex-wrap gap-2">
                          {morningSlots.map(s => (
                            <button key={s} onClick={() => setTime(s)}
                              className={`px-4 py-2 rounded-full border font-body text-sm transition-all ${time === s ? "border-primary bg-primary text-primary-foreground" : "border-border/50 hover:border-primary/40 text-muted-foreground"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-body text-xs text-muted-foreground/60 mb-2">{tx.afternoon}</p>
                        <div className="flex flex-wrap gap-2">
                          {afternoonSlots.map(s => (
                            <button key={s} onClick={() => setTime(s)}
                              className={`px-4 py-2 rounded-full border font-body text-sm transition-all ${time === s ? "border-primary bg-primary text-primary-foreground" : "border-border/50 hover:border-primary/40 text-muted-foreground"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted rounded-xl px-5 py-3 mb-2">
                    <p className="font-body text-xs text-muted-foreground">{service}</p>
                    <p className="font-body text-xs text-muted-foreground">{fmt(date, lang)} · {time}</p>
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1">{tx.name}</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1">{tx.email}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1">{tx.phone}</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!done && (
              <div className="px-6 py-4 border-t border-border/50 flex justify-between gap-3">
                {step > 0 ? (
                  <button onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" /> {tx.back}
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    disabled={(step === 0 && !service) || (step === 1 && (!date || !time))}
                    onClick={() => setStep(s => s + 1)}
                    className="flex items-center gap-1 font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity disabled:opacity-40">
                    {tx.next} <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    disabled={!name || !email || loading}
                    onClick={handleSubmit}
                    className="font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity disabled:opacity-40">
                    {loading ? "..." : tx.confirm}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}