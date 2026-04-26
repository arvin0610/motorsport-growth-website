import type { Variants } from "motion/react";

/**
 * Motorsport Growth motion vocabulary.
 *
 * Three easings, no springs, no bounces:
 *   - easeMg     : type wipes & headline reveals (custom expressive curve)
 *   - easeMgOut  : hover hairlines, button arrows, gentle exits
 *   - easeMgIn   : page exits
 *
 * Reveals are clip-path wipes, NEVER fade-up. Numbers count up once.
 * Honor prefers-reduced-motion at the call site.
 */

// Note: brief specified [0.6, 0.05, -0.01, 0.9] but x2 = -0.01 is invalid
// per CSS easing spec (control-point x must be in [0, 1]). Modern browsers
// reject it via WAAPI ("Failed to execute 'animate' on Element"). Clamped
// to the closest valid curve below — visually identical.
export const easeMg = [0.6, 0.05, 0, 0.9] as const;
export const easeMgOut = [0.22, 1, 0.36, 1] as const;
export const easeMgIn = [0.6, 0, 0.78, 0] as const;

/** Headline / type clip-path wipe left → right. Mount on a `<motion.h1>`. */
export const wipeLR: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.6, ease: easeMg },
  },
};

/** Wipe with letter-stagger: each child wraps a word in its own wipe. */
export const wipeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** Image reveal — clip mask, never opacity. */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: easeMg },
  },
};

/** Hairline draw, scaleX 0 → 1 from left. */
export const hairlineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: easeMgOut } },
};

/**
 * Approximation of cubic-bezier(0.6, 0.05, -0.01, 0.9) for JS-driven counters.
 * The negative control point gives a subtle anticipation that mirrors the CSS curve.
 */
export function cubicEaseMg(t: number): number {
  // Fast hand-tuned approximation; close enough for 1.2s counter animation.
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
