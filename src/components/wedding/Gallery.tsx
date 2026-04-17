import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

const photos = [
  { src: g1, alt: "Saran and Samyuktha in traditional wedding attire", h: "md:row-span-2" },
  { src: g2, alt: "Couple holding hands with floral backdrop", h: "" },
  { src: g3, alt: "Elegant wedding venue decoration", h: "" },
];

const Gallery = () => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Our Story in Frames</p>
        <h2 className="font-script text-5xl md:text-6xl text-foreground/85">Cherished Moments</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 md:h-[600px]">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className={`overflow-hidden rounded-3xl shadow-card-elegant group ${p.h}`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-elegant group-hover:scale-105"
              style={{ minHeight: 240 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
