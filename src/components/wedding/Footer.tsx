import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-16 px-6 text-center bg-gradient-elegant">
    <Heart className="h-6 w-6 text-gold mx-auto mb-4 fill-current animate-shimmer" />
    <p className="font-serif italic text-xl text-foreground/75 mb-3">
      We look forward to celebrating with you
    </p>
    <p className="font-script text-4xl md:text-5xl text-gradient-gold">
      With love, Saran &amp; Samyuktha
    </p>
    <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mt-8">
      Suguna Auditorium · Sitra · September 12
    </p>
  </footer>
);

export default Footer;
