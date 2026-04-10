import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from "lucide-react";

const ABOUT_BG = "https://media.base44.com/images/public/69d864a1af1cf9da878f9e05/6740ccdb9_generated_f05b9bda.png";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={ABOUT_BG} alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">À propos</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              L'excellence au service de votre beauté
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Chez IBO Barber, nous sommes spécialisés dans la coloration, les permanentes et les soins capillaires pour femmes. Notre expertise et notre passion pour la beauté garantissent un résultat exceptionnel à chaque visite.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-medium text-foreground">Téléphone</h4>
                  <a href="tel:8193198216" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">819-319-8216</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-medium text-foreground">Adresse</h4>
                  <a href="https://maps.google.com/?q=48+avenue+Gatineau+Gatineau" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">48 avenue Gatineau, Gatineau</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-medium text-foreground">Email</h4>
                  <a href="mailto:IBOBarber3@gmail.com" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">IBOBarber3@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-medium text-foreground">Réseaux sociaux</h4>
                  <div className="flex gap-4 mt-1">
                    <a href="https://www.facebook.com/IBO barber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="h-4 w-4" /> IBO barber
                    </a>
                    <a href="https://www.instagram.com/The_ibo_barber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-4 w-4" /> The_ibo_barber
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border/30">
              <img src={ABOUT_BG} alt="Salon IBO Barber" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border/50 rounded-2xl px-6 py-4 shadow-xl">
              <p className="font-heading text-3xl text-primary">5+</p>
              <p className="font-body text-xs text-muted-foreground">Années d'expérience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}