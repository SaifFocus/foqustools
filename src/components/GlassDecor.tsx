import { CSSProperties } from "react";
import { useId } from "react";

/**
 * Decorative floating glass shapes — semi-transparent, glossy, iridescent.
 * Pure SVG with layered gradients + highlights to fake refraction.
 * Purely visual, pointer-events disabled. Place inside a `relative` parent.
 */

type Common = { className?: string; style?: CSSProperties; size?: number; delay?: number };
type Tint = "pink" | "violet" | "peach" | "sky";

const TINT_STOPS: Record<Tint, { core: string; mid: string; rim: string; shadow: string }> = {
  pink:   { core: "#fff5f9", mid: "#ffb8d4", rim: "#e87bb4", shadow: "#c44a8e" },
  violet: { core: "#f3ecff", mid: "#c8b0ff", rim: "#9a7be0", shadow: "#6b4ec0" },
  peach:  { core: "#fff4ec", mid: "#ffc8a8", rim: "#f08a6e", shadow: "#c45a4a" },
  sky:    { core: "#eef6ff", mid: "#a8c8ff", rim: "#6e8ee0", shadow: "#4a6cc4" },
};

export function GlassOrb({
  className = "",
  style,
  size = 200,
  delay = 0,
  tint = "pink",
}: Common & { tint?: Tint }) {
  const id = useId().replace(/:/g, "");
  const c = TINT_STOPS[tint];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute animate-float ${className}`}
      style={{ width: size, height: size, animationDelay: `${delay}s`, ...style }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 30px 40px ${c.shadow}55)` }}
      >
        <defs>
          {/* Body: bright top-left, deepens to rim */}
          <radialGradient id={`orb-body-${id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%"   stopColor={c.core} stopOpacity="0.95" />
            <stop offset="35%"  stopColor={c.mid}  stopOpacity="0.75" />
            <stop offset="75%"  stopColor={c.rim}  stopOpacity="0.55" />
            <stop offset="100%" stopColor={c.shadow} stopOpacity="0.35" />
          </radialGradient>
          {/* Inner refraction ring */}
          <radialGradient id={`orb-rim-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%"  stopColor="#ffffff" stopOpacity="0" />
            <stop offset="92%"  stopColor={c.rim}   stopOpacity="0.45" />
            <stop offset="100%" stopColor={c.shadow} stopOpacity="0.0" />
          </radialGradient>
          {/* Bottom-right warm bounce light */}
          <radialGradient id={`orb-bounce-${id}`} cx="75%" cy="80%" r="40%">
            <stop offset="0%"   stopColor={c.mid}    stopOpacity="0.55" />
            <stop offset="100%" stopColor={c.mid}    stopOpacity="0" />
          </radialGradient>
          {/* Top specular highlight */}
          <radialGradient id={`orb-spec-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="96" fill={`url(#orb-body-${id})`} />
        <circle cx="100" cy="100" r="96" fill={`url(#orb-rim-${id})`} />
        <circle cx="100" cy="100" r="96" fill={`url(#orb-bounce-${id})`} />

        {/* Big soft top-left highlight */}
        <ellipse cx="72" cy="58" rx="38" ry="26" fill={`url(#orb-spec-${id})`} transform="rotate(-25 72 58)" />
        {/* Tight glossy catchlight */}
        <ellipse cx="62" cy="48" rx="10" ry="5" fill="#ffffff" opacity="0.95" transform="rotate(-25 62 48)" />
        {/* Small bottom catchlight */}
        <ellipse cx="138" cy="150" rx="14" ry="4" fill="#ffffff" opacity="0.35" transform="rotate(-20 138 150)" />
      </svg>
    </div>
  );
}

export function GlassStar({
  className = "",
  style,
  size = 160,
  delay = 0,
  tint = "violet",
}: Common & { tint?: Tint }) {
  const id = useId().replace(/:/g, "");
  const c = TINT_STOPS[tint];
  // 4-pointed sparkle with deeply concave sides — bulging glassy points
  const starPath =
    "M100 6 " +
    "C 104 70, 130 96, 194 100 " +
    "C 130 104, 104 130, 100 194 " +
    "C 96 130, 70 104, 6 100 " +
    "C 70 96, 96 70, 100 6 Z";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute animate-float-slow ${className}`}
      style={{ width: size, height: size, animationDelay: `${delay}s`, ...style }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 25px 35px ${c.shadow}55)` }}
      >
        <defs>
          {/* Iridescent body gradient: peach → pink → violet */}
          <linearGradient id={`star-body-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#fff2dc" stopOpacity="0.9" />
            <stop offset="30%"  stopColor="#ffc7d8" stopOpacity="0.85" />
            <stop offset="65%"  stopColor={c.mid}    stopOpacity="0.85" />
            <stop offset="100%" stopColor={c.shadow} stopOpacity="0.7" />
          </linearGradient>
          {/* Inner glow */}
          <radialGradient id={`star-glow-${id}`} cx="40%" cy="35%" r="55%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* Edge rim light */}
          <linearGradient id={`star-rim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor={c.rim}    stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Body */}
        <path d={starPath} fill={`url(#star-body-${id})`} />
        {/* Inner soft glow */}
        <path d={starPath} fill={`url(#star-glow-${id})`} />
        {/* Rim/edge highlight stroke */}
        <path
          d={starPath}
          fill="none"
          stroke={`url(#star-rim-${id})`}
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Bright top-left specular streak */}
        <ellipse cx="78" cy="62" rx="18" ry="6" fill="#ffffff" opacity="0.8" transform="rotate(-35 78 62)" />
        <ellipse cx="70" cy="55" rx="7" ry="2.5" fill="#ffffff" opacity="1" transform="rotate(-35 70 55)" />
        {/* Tiny opposite catchlight */}
        <ellipse cx="135" cy="138" rx="10" ry="2.5" fill="#ffffff" opacity="0.45" transform="rotate(-30 135 138)" />
      </svg>
    </div>
  );
}

/** Curated arrangement of glass shapes for hero / page backgrounds. */
export function GlassDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <GlassOrb tint="pink"   size={300} className="-left-24 top-32" delay={0} />
      <GlassStar tint="violet" size={210} className="right-8 top-16" delay={1.2} />
      <GlassOrb tint="violet" size={110} className="right-40 bottom-20" delay={0.6} />
      <GlassStar tint="peach"  size={95}  className="left-1/3 bottom-8" delay={2} />
      <GlassOrb tint="peach"  size={140} className="right-1/4 top-1/2" delay={1.5} />
    </div>
  );
}