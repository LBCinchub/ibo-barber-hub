import { motion } from "framer-motion";
import { Scissors } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_69295748ef95b1eff658733b/4b64ead64_IMG-20260409-WA0002.jpg";
const HERO_BG = "/__generating__/img_47ac28fb1b7e.png";

export default function HeroSection({ onBookClick }) {
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
          Coloration · Permanente · Démaquillant<br />
          L'art de la beauté capillaire
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
          Prendre rendez-vous
        </motion.button>
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