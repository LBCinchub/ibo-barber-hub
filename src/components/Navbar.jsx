import { useState } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";

export default function Navbar({ onBookClick }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="IBO Barber" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-xl text-foreground tracking-wide">IBO Barber</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="#about" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">À propos</a>
          <button
            onClick={onBookClick}
            className="font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            Réserver
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4 space-y-4">
          <a href="#services" onClick={() => setOpen(false)} className="block font-body text-sm text-muted-foreground hover:text-primary">Services</a>
          <a href="#about" onClick={() => setOpen(false)} className="block font-body text-sm text-muted-foreground hover:text-primary">À propos</a>
          <button
            onClick={() => { onBookClick(); setOpen(false); }}
            className="w-full font-body text-sm px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90"
          >
            Réserver
          </button>
        </div>
      )}
    </nav>
  );
}