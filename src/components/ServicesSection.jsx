import { useState } from "react";
import { motion } from "framer-motion";
import { User, Users, Scissors, Paintbrush, Sparkles, Droplets, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const SERVICES_BG = "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/090940018_generated_745dfa45.png";

const MEN_ICONS = [Scissors, Scissors, Scissors, Paintbrush, Scissors, Scissors];
const WOMEN_ICONS = [Droplets, Paintbrush, Sparkles, Paintbrush, Clock];

const MEN_IMAGES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80",
  "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&q=80",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80",
];

export default function ServicesSection({ onBookClick }) {
  const { lang } = useLang();
  const tx = t[lang].services;
  const [tab, setTab] = useState("men");

  const services = tab === "men"
    ? tx.men_items.map((item, i) => ({ ...item, icon: MEN_ICONS[i] }))
    : tx.women_items.map((item, i) => ({ ...item, icon: WOMEN_ICONS[i] }));
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={SERVICES_BG} alt="Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">{tx.label}</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8">{tx.title}</h2>

          {/* Men / Women toggle */}
          <div className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full p-1">
            <button
              onClick={() => setTab("men")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm transition-all ${
                tab === "men" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              {tx.men}
            </button>
            <button
              onClick={() => setTab("women")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm transition-all ${
                tab === "women" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              {tx.women}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const menImg = tab === "men" ? MEN_IMAGES[i] : null;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                {menImg && (
                  <div className="relative h-44 overflow-hidden">
                    <img src={menImg} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg text-foreground">{service.title}</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl text-primary">{service.price}</span>
                    <button
                      onClick={onBookClick}
                      className="font-body text-sm px-5 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      {tx.book}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={onBookClick}
            className="font-body text-base px-10 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {tx.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}