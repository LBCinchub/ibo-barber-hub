import { motion } from "framer-motion";
import { Paintbrush, Sparkles, Droplets, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const SERVICES_BG = "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/090940018_generated_745dfa45.png";

const serviceIcons = [Droplets, Paintbrush, Sparkles, Paintbrush, Sparkles, Clock];

const servicePrices = ["18$", "12$", "22$", "10$", "25$", "28$"];

export default function ServicesSection({ onBookClick }) {
  const { lang } = useLang();
  const tx = t[lang].services;
  const services = tx.items.map((item, i) => ({
    ...item,
    price: servicePrices[i],
    icon: serviceIcons[i],
  }));
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
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">{tx.label}</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">{tx.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">{service.title}</h3>
                    {service.subtitle && (
                      <p className="font-body text-xs text-muted-foreground">{service.subtitle}</p>
                    )}
                  </div>
                </div>

                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl text-primary">{service.price}</span>
                  <button
                    onClick={onBookClick}
                    className="font-body text-sm px-5 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {tx.book}
                  </button>
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