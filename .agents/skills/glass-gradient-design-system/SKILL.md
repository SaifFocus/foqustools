---
name: glass-gradient-design-system
description: Reusable FoqusTools design system — continuous pastel blush→lavender→sky page gradient, blue/purple brand gradient, rounded-2xl soft-shadow cards, and floating glossy glass figures (bubbles + 4-point sparkle star). Use when the user asks for "the same design/theme/figures as FoqusTools", a premium glassy SaaS look, or wants to reuse these glass shapes.
---

# Glass + Gradient Design System

A premium, light, seamless SaaS aesthetic: one continuous soft color wash behind the entire page (no visible section breaks), a blue→purple/pink brand gradient for accents, rounded-2xl cards with soft shadows, and semi-transparent glossy glass ornaments floating in hero/CTA sections.

## Core rules

- Never hardcode color utilities (`text-white`, `bg-[#...]`). All color lives in CSS variables in `src/styles.css` and is consumed via semantic Tailwind tokens.
- The body carries the page gradient, fixed to the viewport. Sections are transparent — never give a section its own solid background block, or the seam becomes visible.
- Cards: `rounded-2xl border bg-card p-6` + `shadow-[var(--shadow-card)]` on hover.
- Brand accents: `bg-[image:var(--gradient-brand)]`, plus `bg-clip-text text-transparent` for gradient headline words.
- Radius base `0.625rem`; generous spacing (`py-16`–`py-20` per section, `container mx-auto max-w-7xl px-4`).
- Footer must be translucent so the gradient continues to the bottom.

## Steps to apply

1. Copy the token block from `references/tokens.css` into `src/styles.css` (`:root` values + `@theme inline` mappings + the `glass-float` keyframes and `body` gradient rule).
2. Copy `assets/glass-bubble-pink.png`, `assets/glass-bubble-small.png`, `assets/glass-star.png` into `src/assets/`.
3. Create `src/components/GlassDecor.tsx` from `references/GlassDecor.tsx`.
4. Place `<GlassDecor variant="hero" />` as the first child of a `relative overflow-hidden` hero section, `variant="transition"` in mid-page sections, `variant="subtle"` elsewhere.

## Gotchas

- `GlassDecor` must use `z-0` (not `-z-10`) or the figures render behind the page gradient and disappear. Wrap the section's real content in `relative z-10`.
- The parent section needs `relative overflow-hidden`, otherwise the off-canvas shapes cause horizontal scroll.
- Shapes are `aria-hidden`, `pointer-events-none`, `loading="lazy"`.
- Stagger `animationDelay` with negative values so the floats don't move in unison.

## Files

- `references/tokens.css` — full design-token block (colors, gradients, shadows, keyframes)
- `references/GlassDecor.tsx` — the glass ornament component with hero/transition/subtle presets
- `assets/*.png` — the three glass figures
