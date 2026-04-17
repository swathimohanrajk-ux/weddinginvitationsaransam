import { motion } from "framer-motion";
import hero from "@/assets/hero-wedding.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={hero}
        alt="Elegant blush and gold floral wedding background"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-overlay" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/50 via-transparent to-ivory" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.4em] uppercase text-gold mb-6"
        >
          • TOGETHER WITH FAMILIES •
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-script text-3xl md:text-5xl text-foreground/80 mb-4"
        >
          We invite you to celebrate
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="my-8"
        >
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-gradient-gold leading-tight drop-shadow-sm">
            Saran
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mt-1">
            Son of R. Soundararajan
          </p>

          <div className="flex items-center justify-center gap-4 my-6">
            <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="font-script text-3xl md:text-4xl text-gold">&</span>
            <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-gradient-gold leading-tight drop-shadow-sm">
            Sammyuktha
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mt-1">
            DAUGHTER OF P. PARTHIBAN
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif italic text-lg md:text-2xl text-foreground/70 mt-8"
        >
          on the joyous occasion of their wedding
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
