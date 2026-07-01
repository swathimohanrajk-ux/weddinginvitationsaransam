import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Item = { label: string; time: string };
type Day = { title: string; date: string; weekday: string; items: Item[] };

const days: Day[] = [
  {
    title: "Engagement Day",
    date: "12.09.2026",
    weekday: "Saturday",
    items: [
      { label: "Engagement Ceremony (Nichayathartham)", time: "7:30 AM – 9:00 AM" },
      { label: "Exchange of Ceremonial Gifts (Murai Vazhi Seer)", time: "10:30 AM – 1:00 PM" },
      { label: "Muhurtha Kaal (Ceremonial Ritual)", time: "After 5:30 PM" },
      { label: "Reception", time: "After 6:00 PM" },
    ],
  },
  {
    title: "Wedding Day",
    date: "13.09.2026",
    weekday: "Sunday",
    items: [
      { label: "Wedding Muhurtham", time: "Between 6:30 AM and 7:30 AM" },
      { label: "Wedding Lunch (Sambandhi Virundhu)", time: "After 12:00 PM" },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const CeremonySchedule = () => {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Order of Ceremonies</p>
          <h2 className="font-script text-5xl md:text-6xl text-foreground/85">Auspicious Schedule</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card rounded-3xl p-8 md:p-12 shadow-soft"
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10"
          >
            {days.map((day) => (
              <motion.div key={day.title} variants={itemAnim} className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold">{day.title}</p>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground/85 mb-1">{day.date}</h3>
                <p className="text-sm italic text-muted-foreground mb-6">{day.weekday}</p>

                <ul className="space-y-5">
                  {day.items.map((it) => (
                    <motion.li key={it.label} variants={itemAnim} className="border-l-2 border-gold/40 pl-4">
                      <p className="font-serif text-base md:text-lg text-foreground/85 leading-snug">
                        {it.label}
                      </p>
                      <p className="time-glow font-serif text-base md:text-lg mt-1">{it.time}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
    </>
  );
};

export default CeremonySchedule;
