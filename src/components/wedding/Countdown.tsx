import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-09-12T10:00:00+05:30").getTime();

const calc = () => {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Box = ({ value, label }: { value: number; label: string }) => (
  <div className="glass-card rounded-2xl px-4 py-5 md:px-8 md:py-7 text-center min-w-[80px] md:min-w-[120px]">
    <div className="font-serif text-4xl md:text-6xl text-gradient-gold font-light">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mt-2">
      {label}
    </div>
  </div>
);

const Countdown = () => {
  const [time, setTime] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Counting the moments</p>
        <h2 className="font-script text-5xl md:text-6xl text-foreground/85 mb-10">
          Until we say "I do"
        </h2>

        {time ? (
          <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
            <Box value={time.days} label="Days" />
            <Box value={time.hours} label="Hours" />
            <Box value={time.minutes} label="Minutes" />
            <Box value={time.seconds} label="Seconds" />
          </div>
        ) : (
          <p className="font-script text-4xl md:text-5xl text-gradient-gold animate-shimmer">
            The wedding celebration has begun
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Countdown;
