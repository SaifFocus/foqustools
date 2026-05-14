## Goal

Make the homepage read as one continuous canvas. The hard line between the hero (soft pink/lavender) and the `Popular tools` section (flat white) should disappear — the whole page should sit on the same atmospheric gradient.

## Cause of the visible seam

- The hero uses `bg-[image:var(--gradient-soft)]` (pink/lavender) **scoped to that section only**.
- Every following section (`Popular`, `Categories`, `How it works`, `Benefits`, `FAQ`) has no background, so it falls through to the default white `--background`.
- Where the hero ends, the gradient stops abruptly against white → a hard horizontal line, exactly where the small pink bubble sits in your screenshot.

## Approach

Move the soft gradient from the hero section onto the **page-level background**, and let every section render transparently on top of it.

### Changes

1. **`src/routes/__root.tsx`** — wrap `<main>` (or the outer flex container) with a single full-height gradient layer:
   - Replace the white `body` background with a fixed, soft, vertical gradient: warm cream → blush pink → light lavender → soft sky, attached so it covers the whole scroll.
   - Add 1–2 large, very-soft radial glows (top-left blush, top-right lavender) for the GrantFlow atmosphere — large blur radius, low opacity, no hard edges.

2. **`src/routes/index.tsx`** —
   - Remove the hero's `bg-[image:var(--gradient-soft)]` div and the strong blurred brand circle (it creates a localized "halo" that emphasizes the seam).
   - Keep `<GlassDecor variant="hero" />` in the hero, optionally add `variant="transition"` between two later sections so the bubbles thread the page together.
   - Section wrappers stay transparent — only the inner cards/CTA keep solid backgrounds (`bg-card`).

3. **`src/styles.css`** —
   - Update `--gradient-soft` to a richer, page-wide gradient (multiple stops, very low saturation), or add a new `--gradient-page` token used by the body.
   - Ensure `body` uses this gradient with `background-attachment: fixed` so it doesn't scroll-tile.
   - Keep `--background` as-is for cards/popovers; only the body layer changes.

4. **Pricing CTA & Footer** — leave intact. The Pricing CTA already has its own bold gradient block (intentional contrast). The Footer can either stay solid or also go transparent — recommend transparent so the gradient continues to the bottom.

## What you'll see

- One smooth, page-long blush→lavender wash behind every section.
- No horizontal line where Popular tools begins — the small pink bubble continues to float against the same color field.
- Tool cards remain crisp white against the soft background, so contrast and readability are preserved.

## Out of scope

- No changes to card layouts, copy, or the glass figures themselves.
- No dark-mode tweaks (the current site is light-only).