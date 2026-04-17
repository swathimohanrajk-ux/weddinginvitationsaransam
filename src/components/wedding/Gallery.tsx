import { motion } from "framer-motion";
import g1 from "@/assets/couple-1.jpg";
import g2 from "@/assets/couple-2.jpg";
import g3 from "@/assets/couple-3.jpg";
import g5 from "@/assets/couple-5.jpg";
import g6 from "@/assets/couple-6.jpg";
import g7 from "@/assets/couple-7.jpg";
import g8 from "@/assets/couple-8.jpg";
import g9 from "@/assets/couple-9.jpg";
import g10 from "@/assets/couple-10.jpg";
import g11 from "@/assets/couple-11.jpg";
import g12 from "@/assets/couple-12.jpg";
import g13 from "@/assets/couple-13.jpg";

const photos = [
  { src: g1, alt: "Saran and Sammyuktha during haldi ceremony" },
  { src: g7, alt: "Saran and Sammyuktha at engagement backdrop" },
  { src: g13, alt: "Saran and Sammyuktha during haldi ring exchange" },
  { src: g3, alt: "Saran and Sammyuktha greeting with folded hands" },
  { src: g10, alt: "Saran and Sammyuktha sharing a moment on the couch" },
  { src: g6, alt: "Engagement ring exchange ceremony" },
  { src: g5, alt: "Father blessing the groom during ceremony" },
  { src: g12, alt: "Saran portrait at floral backdrop" },
  { src: g9, alt: "Sammyuktha posing in golden saree" },
  { src: g2, alt: "Sammyuktha portrait in green saree" },
  { src: g8, alt: "Saran portrait during haldi ceremony" },
  { src: g11, alt: "Close-up of bride and groom hands with mehendi" },
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            className="aspect-square overflow-hidden rounded-2xl shadow-card-elegant group"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-elegant group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
