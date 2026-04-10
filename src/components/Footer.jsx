import { useState } from "react";
import { Scissors, Phone, MapPin, Mail, Facebook, Instagram, Send, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const { lang } = useLang();
  const tx = t[lang].footer; // null | "loading" | "success" | "error"

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await base44.entities.NewsletterSubscriber.create({ email });
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border/30 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <img src={LOGO_URL} alt="IBO Barber" className="h-14 w-14 rounded-full mb-4" />
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary/30" />
            <Scissors className="h-3 w-3 text-primary" />
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <p className="font-body text-sm text-muted-foreground mb-6">
           {tx.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
            <a href="tel:8193198216" className="flex items-center justify-center gap-2 bg-card border border-border/40 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-body text-xs text-muted-foreground">819-319-8216</span>
            </a>
            <a href="https://maps.google.com/?q=48+avenue+Gatineau+Gatineau" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-card border border-border/40 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-body text-xs text-muted-foreground">48 av. Gatineau</span>
            </a>
            <a href="mailto:IBOBarber3@gmail.com" className="flex items-center justify-center gap-2 bg-card border border-border/40 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-body text-xs text-muted-foreground">IBOBarber3@gmail.com</span>
            </a>
            <div className="flex items-center justify-center gap-3 bg-card border border-border/40 rounded-xl px-4 py-3">
              <a href="https://www.facebook.com/IBObarber" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/The_ibo_barber" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md mb-8">
            <p className="font-heading text-lg text-foreground mb-1">{tx.newsletter_title}</p>
            <p className="font-body text-xs text-muted-foreground mb-4">{tx.newsletter_sub}</p>
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-body text-sm">{tx.newsletter_success}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tx.newsletter_placeholder}
                  required
                  className="flex-1 bg-input border border-border/50 rounded-full px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-10 w-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 text-primary-foreground" />
                </button>
              </form>
            )}
          </div>

          <p className="font-body text-xs text-muted-foreground/60">
            {tx.copyright}
          </p>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-card border border-border/40 rounded-full px-4 py-2">
              <svg viewBox="0 0 397.7 311.7" className="h-3.5 w-3.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sol-grad-footer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9945FF" />
                    <stop offset="100%" stopColor="#14F195" />
                  </linearGradient>
                </defs>
                <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-164.1c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm317.4-70.1H64.6c-3.5 0-6.8 1.4-9.2 3.8L-7.3 70.2c-4.1 4.1-1.2 11.1 4.6 11.1h317.4c3.5 0 6.8-1.4 9.2-3.8l62.7-62.7c4.1-4.1 1.2-11.1-4.6-11.1z" fill="url(#sol-grad-footer)"/>
              </svg>
              <span className="font-body text-xs text-muted-foreground">We accept <span className="text-foreground font-medium">Solana (SOL)</span></span>
            </div>
            <a
              href="https://lbc.network"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-primary hover:opacity-80 transition-opacity font-semibold tracking-wide"
            >
              Powered by LBC.NETWORK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}