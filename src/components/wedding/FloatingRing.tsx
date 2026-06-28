import { Link } from "react-router-dom";
import ringIcon from "@/assets/ss-click.png";

const FloatingRing = () => {
  return (
    <Link
      to="/proposal"
      aria-label="Open the magical proposal scene"
      className="fixed z-40 bottom-24 right-4 md:bottom-28 md:right-6 group ring-float"
    >
      <span className="block relative">
        <span className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
        <img
          src={ringIcon}
          alt="Click to open proposal"
          width={96}
          height={96}
          className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_6px_18px_rgba(180,140,60,0.45)] transition-transform duration-500 group-hover:scale-110"
        />
      </span>
    </Link>
  );
};

export default FloatingRing;
