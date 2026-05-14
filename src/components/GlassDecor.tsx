import { CSSProperties } from "react";

/**
 * Decorative floating glass shapes — iridescent orbs and 4-pointed stars.
 * Purely visual, pointer-events disabled. Place inside a `relative` parent.
 */

type Common = { className?: string; style?: CSSProperties; size?: number; delay?: number };

export function GlassOrb({ className = "", style, size = 200, delay = 0, tint = "pink" }: Common & { tint?: "pink" | "violet" | "peach" | "sky" }) {
  const tints: Record<string, string> = {
    pink: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,210,225,0.85) 18%, rgba(255,170,200,0.55) 45%, rgba(230,140,200,0.25) 70%, rgba(200,120,210,0.05) 100%)",
    violet: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(220,200,255,0.8) 20%, rgba(180,150,240,0.5) 50%, rgba(140,110,220,0.15) 80%)",
    peach: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,225,200,0.85) 20%, rgba(255,180,150,0.5) 50%, rgba(240,150,140,0.15) 80%)",
    sky: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(210,235,255,0.8) 22%, rgba(160,200,255,0.5) 55%, rgba(140,170,240,0.15) 85%)",
  };
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full animate-float ${className}`}
      style={{
        width: size,
        height: size,
        background: tints[tint],
        boxShadow: "inset -10px -20px 40px rgba(180,120,200,0.25), inset 15px 20px 50px rgba(255,255,255,0.6), 0 30px 60px -20px rgba(200,140,200,0.4)",
        backdropFilter: "blur(2px)",
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          top: "12%", left: "18%", width: "28%", height: "22%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

export function GlassStar({ className = "", style, size = 160, delay = 0 }: Common) {
  // 4-pointed star (sparkle) with iridescent fill
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute animate-float-slow ${className}`}
      style={{ width: size, height: size, animationDelay: `${delay}s`, ...style }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "drop-shadow(0 20px 30px rgba(180,120,220,0.35))" }}>
        <defs>
          <radialGradient id="starGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="25%" stopColor="rgba(255,220,180,0.85)" />
            <stop offset="55%" stopColor="rgba(200,140,230,0.75)" />
            <stop offset="100%" stopColor="rgba(140,90,200,0.5)" />
          </radialGradient>
          <linearGradient id="starShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* 4-pointed star path */}
        <path
          d="M100 5 C 105 70, 130 95, 195 100 C 130 105, 105 130, 100 195 C 95 130, 70 105, 5 100 C 70 95, 95 70, 100 5 Z"
          fill="url(#starGrad)"
        />
        <path
          d="M100 25 C 103 75, 125 97, 175 100 C 125 103, 103 125, 100 175 C 97 125, 75 103, 25 100 C 75 97, 97 75, 100 25 Z"
          fill="url(#starShine)"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

/** Curated arrangement of glass shapes for hero / page backgrounds. */
export function GlassDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <GlassOrb tint="pink" size={260} className="-left-20 top-40" delay={0} />
      <GlassStar size={170} className="right-10 top-24" delay={1.2} />
      <GlassOrb tint="violet" size={90} className="right-32 bottom-24" delay={0.6} />
      <GlassStar size={90} className="left-1/3 bottom-10" delay={2} />
      <GlassOrb tint="peach" size={130} className="right-1/4 top-1/2" delay={1.5} />
    </div>
  );
}