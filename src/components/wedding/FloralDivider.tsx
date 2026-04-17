import divider from "@/assets/floral-divider.png";

const FloralDivider = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <div className={`flex justify-center items-center w-full py-6 ${className}`} aria-hidden>
    <img
      src={divider}
      alt=""
      loading="lazy"
      width={1536}
      height={512}
      className={`max-w-md w-full opacity-90 ${flip ? "rotate-180" : ""}`}
    />
  </div>
);

export default FloralDivider;
