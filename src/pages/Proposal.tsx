import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useMemo } from "react";

const Proposal = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 12 + Math.random() * 18,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Sky / sunset background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(28 80% 88%) 0%, hsl(20 75% 80%) 30%, hsl(35 85% 78%) 55%, hsl(40 90% 82%) 75%, hsl(45 80% 90%) 100%)",
        }}
      />

      {/* Sun glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[45%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(45 100% 85% / 0.95) 0%, hsl(38 90% 75% / 0.55) 35%, transparent 70%)",
          animation: "ray-pulse 6s ease-in-out infinite",
        }}
      />

      {/* Drifting clouds */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${10 + i * 12}%`,
            left: 0,
            width: "100vw",
            animation: `cloud-drift ${30 + i * 8}s linear infinite`,
            animationDelay: `${-i * 6}s`,
          }}
        >
          <div
            className="rounded-full bg-white/70 blur-2xl"
            style={{
              width: `${120 + i * 40}px`,
              height: `${50 + i * 14}px`,
              marginLeft: `${(i * 18) % 80}vw`,
            }}
          />
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: "0 0 8px hsl(45 100% 80% / 0.9)",
            animation: `sparkle-twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute text-rose-300/80 fill-rose-300/60 pointer-events-none"
          style={{
            left: `${h.left}%`,
            bottom: 0,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animation: `heart-rise ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            filter: "drop-shadow(0 0 6px hsl(15 90% 80% / 0.8))",
          }}
        />
      ))}

      {/* Light ray pillar above couple */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[260px] md:w-[420px] h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(45 100% 90% / 0.0) 0%, hsl(45 100% 88% / 0.45) 40%, hsl(40 90% 80% / 0.25) 70%, transparent 100%)",
          animation: "ray-pulse 5s ease-in-out infinite",
        }}
      />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[28vh] bg-gradient-to-t from-amber-200/70 via-amber-100/40 to-transparent" />

      {/* Silhouettes */}
      <div className="absolute bottom-[18vh] left-1/2 -translate-x-1/2 w-full flex items-end justify-center">
        {/* Bride */}
        <svg
          viewBox="0 0 80 200"
          className="w-[110px] md:w-[170px] h-auto"
          style={{ animation: "walk-left 6s ease-out forwards", filter: "drop-shadow(0 8px 14px rgba(80,40,20,0.4))" }}
        >
          <g fill="hsl(25 35% 18%)">
            <circle cx="40" cy="22" r="14" />
            <path d="M22 36 Q40 30 58 36 L70 90 Q60 100 40 100 Q20 100 10 90 Z" />
            <path d="M18 90 Q40 110 62 90 L74 200 L6 200 Z" />
          </g>
          {/* Veil */}
          <path d="M22 18 Q40 -6 58 18 L66 60 Q40 50 14 60 Z" fill="hsl(36 50% 96% / 0.55)" />
        </svg>

        {/* Groom (mirrored) */}
        <svg
          viewBox="0 0 80 200"
          className="w-[110px] md:w-[170px] h-auto"
          style={{ animation: "walk-right 6s ease-out forwards", filter: "drop-shadow(0 8px 14px rgba(80,40,20,0.4))" }}
        >
          <g fill="hsl(25 35% 14%)">
            <circle cx="40" cy="22" r="13" />
            <rect x="34" y="6" width="12" height="6" rx="1" />
            <rect x="28" y="10" width="24" height="4" rx="1" />
            <path d="M22 36 L58 36 L66 100 L14 100 Z" />
            <path d="M18 100 L62 100 L70 200 L10 200 Z" />
          </g>
        </svg>
      </div>

      {/* Joining heart between them */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[34vh] opacity-0"
        style={{ animation: "fade-in 1.2s ease-out 5.5s forwards" }}
      >
        <Heart className="w-10 h-10 md:w-14 md:h-14 text-rose-400 fill-rose-400 drop-shadow-[0_0_18px_rgba(255,120,140,0.8)]" />
      </div>

      {/* Title */}
      <div className="relative z-10 pt-10 px-6 text-center">
        <p className="text-[11px] tracking-[0.4em] uppercase text-amber-900/70 mb-2">A magical moment</p>
        <h1 className="font-script text-5xl md:text-7xl text-gradient-gold-vibrant leading-[1.25] pb-2">
          Saran &amp; Sammyuktha
        </h1>
        <p className="font-serif italic text-amber-950/70 mt-2 text-lg md:text-xl">
          Two hearts walking toward forever
        </p>
      </div>

      {/* Back link */}
      <Link
        to="/"
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-amber-950 hover:scale-105 transition-elegant"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
    </main>
  );
};

export default Proposal;
