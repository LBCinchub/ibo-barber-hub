import { X, ExternalLink, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/ibobarber3";

export default function BookingModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-16 z-50 bg-card border border-border/50 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div>
                <h3 className="font-heading text-xl text-foreground">Réserver un rendez-vous</h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">Choisissez un service et un créneau horaire</p>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            <div className="flex-1 relative bg-white">
              <iframe
                src={CALENDLY_URL}
                title="Calendly Booking"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="px-6 py-4 border-t border-border/50 bg-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-body text-xs text-muted-foreground">
                    Si le créneau est complet, veuillez choisir un autre horaire ou service. Les créneaux grisés sont déjà réservés.
                  </p>
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-xs text-primary hover:underline flex-shrink-0"
                >
                  Ouvrir dans Calendly <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}