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

      {/* Silhouettes - South Indian bride & groom */}
      <div className="absolute bottom-[18vh] left-0 right-0 flex items-end justify-center gap-0">
        {/* Bride - Kanchipuram saree, flower braid, jewelry */}
        <svg
          viewBox="0 0 120 240"
          className="w-[130px] md:w-[200px] h-auto"
          style={{ animation: "walk-left 6s ease-out forwards", filter: "drop-shadow(0 10px 16px rgba(80,20,40,0.4))" }}
        >
          {/* Long flower braid behind */}
          <path d="M58 38 Q40 90 50 160 Q54 180 58 200" stroke="hsl(25 35% 12%)" strokeWidth="10" fill="none" strokeLinecap="round" />
          {[55, 80, 105, 130, 155, 180].map((cy, i) => (
            <circle key={i} cx={48 + (i % 2) * 4} cy={cy} r="4" fill="hsl(45 90% 75%)" stroke="hsl(15 70% 55%)" strokeWidth="0.8" />
          ))}
          {/* Head */}
          <circle cx="62" cy="28" r="14" fill="hsl(28 45% 55%)" />
          {/* Hair bun on top */}
          {/* Hair bun */}
          <circle cx="62" cy="16" r="8" fill="hsl(25 35% 12%)" />
          {/* Maang tikka */}
          <line x1="62" y1="16" x2="62" y2="26" stroke="hsl(45 90% 70%)" strokeWidth="1.2" />
          <circle cx="62" cy="28" r="2" fill="hsl(45 90% 70%)" />
          {/* Neck + necklace */}
          <rect x="58" y="40" width="8" height="6" fill="hsl(28 45% 55%)" />
          <path d="M52 50 Q62 56 72 50" stroke="hsl(45 90% 70%)" strokeWidth="2" fill="none" />
          {/* Blouse */}
          <path d="M44 50 Q62 46 80 50 L82 78 L42 78 Z" fill="hsl(350 60% 30%)" />
          {/* Pallu over left shoulder */}
          <path d="M44 50 Q30 70 36 110 L48 108 Q50 78 52 60 Z" fill="hsl(0 70% 38%)" />
          <path d="M36 110 L48 108 L46 118 L34 120 Z" fill="hsl(45 85% 65%)" />
          {/* Saree skirt - A-line with pleats and gold border */}
          <path d="M42 78 L82 78 L100 230 L24 230 Z" fill="hsl(350 65% 32%)" />
          {/* Pleats */}
          {[40, 56, 72, 88].map((x, i) => (
            <line key={i} x1={x + 12} y1="100" x2={x + (i - 1) * 4 + 10} y2="228" stroke="hsl(350 70% 22%)" strokeWidth="1.2" />
          ))}
          {/* Gold zari border */}
          <path d="M24 230 L100 230 L97 222 L27 222 Z" fill="hsl(45 90% 60%)" />
          <path d="M27 222 L97 222 L95 216 L29 216 Z" fill="hsl(40 80% 50%)" />
          {/* Outer arm hanging at her side */}
          <path d="M44 52 Q34 90 36 120" stroke="hsl(28 45% 55%)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="122" r="4.5" fill="hsl(28 45% 55%)" />
          <circle cx="34" cy="118" r="2.5" fill="hsl(45 90% 70%)" />
          {/* Inner arm reaching out (toward groom) */}
          <path d="M80 60 Q102 88 118 110" stroke="hsl(28 45% 55%)" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Bangles */}
          <circle cx="110" cy="100" r="3" fill="hsl(45 90% 70%)" />
          <circle cx="106" cy="94" r="2.5" fill="hsl(45 90% 70%)" />
          {/* Hand */}
          <circle cx="118" cy="110" r="5" fill="hsl(28 45% 55%)" />
        </svg>

        {/* Joining hands / heart between them */}
        <div
          className="self-end mb-[120px] md:mb-[170px] opacity-0"
          style={{ animation: "fade-in 1s ease-out 4s forwards" }}
        >
          <Heart className="w-6 h-6 md:w-9 md:h-9 text-rose-500 fill-rose-500 drop-shadow-[0_0_14px_rgba(255,100,130,0.9)]" />
        </div>

        {/* Groom - veshti + angavastram */}
        <svg
          viewBox="0 0 120 240"
          className="w-[130px] md:w-[200px] h-auto"
          style={{ animation: "walk-right 6s ease-out forwards", filter: "drop-shadow(0 10px 16px rgba(80,40,20,0.4))" }}
        >
          {/* Head */}
          <circle cx="58" cy="28" r="13" fill="hsl(30 50% 88%)" />
          {/* Hair */}
          <path d="M46 24 Q58 8 70 24 Q66 18 58 18 Q50 18 46 24 Z" fill="hsl(25 35% 12%)" />
          {/* Neck */}
          <rect x="54" y="40" width="8" height="6" fill="hsl(30 50% 88%)" />
          {/* Bare torso */}
          <path d="M40 50 Q58 46 76 50 L78 110 L38 110 Z" fill="hsl(30 50% 88%)" />
          {/* Angavastram - diagonal cream sash */}
          <path d="M38 52 L52 50 L82 108 L72 114 Z" fill="hsl(45 60% 92%)" opacity="0.95" />
          <path d="M40 56 L48 54 L78 110 L74 112 Z" fill="hsl(45 85% 60%)" opacity="0.6" />
          {/* Veshti - white dhoti */}
          <path d="M38 110 L78 110 L92 230 L24 230 Z" fill="hsl(45 50% 96%)" />
          {/* Gold zari border on veshti */}
          <path d="M24 230 L92 230 L89 222 L27 222 Z" fill="hsl(45 90% 60%)" />
          <path d="M27 222 L89 222 L87 216 L29 216 Z" fill="hsl(40 80% 50%)" />
          {/* Vertical fold */}
          <line x1="58" y1="112" x2="58" y2="228" stroke="hsl(40 30% 80%)" strokeWidth="1.2" />
          {/* Outer arm hanging at his side */}
          <path d="M76 52 Q86 90 84 120" stroke="hsl(30 50% 88%)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="84" cy="122" r="4.5" fill="hsl(30 50% 88%)" />
          {/* Inner arm reaching out (toward bride) */}
          <path d="M40 60 Q18 88 2 110" stroke="hsl(30 50% 88%)" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="2" cy="110" r="5" fill="hsl(30 50% 88%)" />
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
