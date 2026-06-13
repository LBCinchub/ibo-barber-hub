import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const LOGO_URL = "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/79b4b0762_IMG-20260516-WA0011.jpg";

export default function Navbar({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { lang, toggleLang } = useLang();
  const tx = t[lang].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="IBO Barber" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-xl text-foreground tracking-wide">I.B.O</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{tx.services}</a>
          <a href="#about" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{tx.about}</a>
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-card border border-border/50 rounded-full px-1 py-1">
            <button
              onClick={() => toggleLang('fr')}
              className={`font-body text-xs px-2.5 py-1 rounded-full transition-colors ${lang === 'fr' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              FR
            </button>
            <button
              onClick={() => toggleLang('en')}
              className={`font-body text-xs px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              EN
            </button>
          </div>
          {user?.role === 'admin' && (
            <a href="/admin" title="Admin" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Shield className="h-4 w-4 text-primary" />
            </a>
          )}
          <button
            onClick={onBookClick}
            className="font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            {tx.book}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {user?.role === 'admin' && (
            <a href="/admin" title="Admin" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Shield className="h-4 w-4 text-primary" />
            </a>
          )}
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4 space-y-4">
          <a href="#services" onClick={() => setOpen(false)} className="block font-body text-sm text-muted-foreground hover:text-primary">{tx.services}</a>
          <a href="#about" onClick={() => setOpen(false)} className="block font-body text-sm text-muted-foreground hover:text-primary">{tx.about}</a>
          {user?.role === 'admin' && (
            <a href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 font-body text-sm text-primary hover:opacity-80">
              <Shield className="h-4 w-4" /> Admin
            </a>
          )}
          <div className="flex items-center gap-1 bg-card border border-border/50 rounded-full px-1 py-1">
            <button
              onClick={() => toggleLang('fr')}
              className={`font-body text-xs px-2.5 py-1 rounded-full transition-colors ${lang === 'fr' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              FR
            </button>
            <button
              onClick={() => toggleLang('en')}
              className={`font-body text-xs px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => { onBookClick(); setOpen(false); }}
            className="w-full font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90"
          >
            {tx.book}
          </button>
        </div>
      )}
    </nav>
  );
}