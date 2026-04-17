import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

const cards = [
  { icon: Calendar, title: "Wedding", main: "September 12", sub: "Saturday" },
  { icon: Sparkles, title: "Reception", main: "September 13", sub: "Sunday" },
  { icon: Clock, title: "Wedding Time", main: "10:00 AM", sub: "September 12" },
];

const Details = () => {
  return (
    <section className="py-20 px-6 bg-gradient-blush">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">The Celebration</p>
          <h2 className="font-script text-5xl md:text-6xl text-foreground/85">Wedding Details</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 text-center transition-elegant hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold mb-5 shadow-soft">
                <c.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2">{c.title}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground/85">{c.main}</h3>
              <p className="text-sm text-muted-foreground italic mt-2">{c.sub}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold mb-5 shadow-soft">
            <MapPin className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2">Venue</p>
          <h3 className="font-serif text-3xl md:text-4xl text-foreground/85">Suguna Auditorium</h3>
          <p className="text-base text-muted-foreground italic mt-2">Sitra</p>

          <a
            href="https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground text-sm tracking-[0.2em] uppercase shadow-soft transition-elegant hover:shadow-glow hover:scale-105"
          >
            <MapPin className="h-4 w-4" />
            Click here for directions
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Details;
