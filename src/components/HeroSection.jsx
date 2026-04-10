import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";
const HERO_BG = "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/68065c38c_generated_41f64d21.png";

export default function HeroSection({ onBookClick }) {
  const { lang } = useLang();
  const tx = t[lang].hero;
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="Salon" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img src={LOGO_URL} alt="IBO Barber" className="h-32 w-32 md:h-40 md:w-40 rounded-full mx-auto border-2 border-primary/40 shadow-2xl shadow-primary/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-foreground mb-4"
        >
          IBO Barber
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-primary/50" />
          <Scissors className="h-5 w-5 text-primary" />
          <div className="h-px w-12 bg-primary/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          {tx.subtitle}<br />
          {tx.tagline}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookClick}
          className="font-body text-base px-10 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/25"
        >
          {tx.cta}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-5 py-2.5"
        >
          <svg viewBox="0 0 397.7 311.7" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sol-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9945FF" />
                <stop offset="100%" stopColor="#14F195" />
              </linearGradient>
            </defs>
            <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-164.1c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm317.4-70.1H64.6c-3.5 0-6.8 1.4-9.2 3.8L-7.3 70.2c-4.1 4.1-1.2 11.1 4.6 11.1h317.4c3.5 0 6.8-1.4 9.2-3.8l62.7-62.7c4.1-4.1 1.2-11.1-4.6-11.1z" fill="url(#sol-grad)"/>
          </svg>
          <span className="font-body text-xs text-muted-foreground">We accept <span className="text-foreground font-medium">Solana (SOL)</span></span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-primary/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary/60 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}