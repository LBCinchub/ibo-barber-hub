import { Scissors } from "lucide-react";

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
          <p className="font-body text-sm text-muted-foreground mb-1">
            Coloration · Permanente · Démaquillant
          </p>
          <p className="font-body text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} IBO Barber. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}