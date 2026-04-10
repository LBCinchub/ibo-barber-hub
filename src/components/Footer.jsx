import { Scissors, Phone, MapPin, Mail, Facebook, Instagram } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";

export default function Footer() {
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
            Coloration · Permanente · Démaquillant
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

          <p className="font-body text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} IBO Barber. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}