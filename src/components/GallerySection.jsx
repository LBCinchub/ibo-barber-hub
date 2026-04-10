import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, User, Users } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const menPhotos = [
  { url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", label: "Coupe Homme" },
  { url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80", label: "Fade / Dégradé" },
  { url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80", label: "Barbe & Contour" },
  { url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80", label: "Fade + Barbe" },
  { url: "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&q=80", label: "Coupe Garçon" },
  { url: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80", label: "Style & Finition" },
];

const womenPhotos = [
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/148e1ef08_generated_image.png", label: "Balayage & Highlights" },
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/906f9f1e5_generated_image.png", label: "Permanente Boucles" },
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/27ed1f2d3_generated_image.png", label: "Coloration Bordeaux" },
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/1b3210a52_generated_image.png", label: "Retouche Racines" },
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/66a5c38f7_generated_image.png", label: "Blonde Platine" },
  { url: "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/5d1c3510e_generated_image.png", label: "Ondulations Naturelles" },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [tab, setTab] = useState("men");
  const { lang } = useLang();
  const tx = t[lang].gallery;
  const photos = tab === "men" ? menPhotos : womenPhotos;

  const prev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLightboxIndex((i) => (i + 1) % photos.length);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">{tx.label}</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8">{tx.title}</h2>

          <div className="inline-flex items-center gap-2 bg-card border border-border/50 rounded-full p-1">
            <button
              onClick={() => { setTab("men"); setLightboxIndex(null); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm transition-all ${
                tab === "men" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              {lang === "fr" ? "Homme" : "Men"}
            </button>
            <button
              onClick={() => { setTab("women"); setLightboxIndex(null); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm transition-all ${
                tab === "women" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              {lang === "fr" ? "Femme" : "Women"}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <p className="font-body text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {photo.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[80vh] mx-16 md:mx-24"
            >
              <img
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].label}
                className="w-full h-full object-contain rounded-xl shadow-2xl max-h-[80vh]"
              />
              <p className="text-center font-body text-sm text-white/70 mt-4">
                {photos[lightboxIndex].label}
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? "w-6 bg-primary" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}