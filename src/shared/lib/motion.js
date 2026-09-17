/**
 * Central, reduced-motion-aware framer-motion presets, built from the
 * duration/ease tokens in tokens.css. The blanket `prefers-reduced-motion`
 * rule in global.css only neutralizes CSS `animation`/`transition`
 * properties — it does not reach framer-motion's JS/WAAPI-driven
 * animations, so every framer-motion usage in the app must go through
 * `reduced` explicitly rather than relying on that CSS rule alone.
 */

const EASE_STANDARD = [0.4, 0, 0.2, 1];
const EASE_EMPHASIZED = [0.2, 0, 0, 1];

const DURATION = {
  fast: 0.16,
  normal: 0.24,
  slow: 0.42,
};

export function fadeIn(reduced, { duration = DURATION.normal, delay = 0 } = {}) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE_STANDARD },
  };
}

export function fadeInUp(reduced, { duration = DURATION.normal, delay = 0, distance = 12 } = {}) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE_STANDARD },
  };
}

export function fadeInScale(reduced, { duration = DURATION.normal, delay = 0, from = 0.96 } = {}) {
  return {
    initial: { opacity: 0, scale: reduced ? 1 : from },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE_EMPHASIZED },
  };
}

/** Stagger helper for a parent `m.div` wrapping a list of `fadeInUp` children. */
export function staggerContainer(reduced, { staggerChildren = 0.04, delayChildren = 0 } = {}) {
  return {
    animate: {
      transition: reduced ? {} : { staggerChildren, delayChildren },
    },
  };
}

export function hoverLift(reduced) {
  return {
    whileHover: reduced ? {} : { y: -2, transition: { duration: DURATION.fast, ease: EASE_STANDARD } },
    whileTap: reduced ? {} : { scale: 0.98, transition: { duration: DURATION.fast, ease: EASE_STANDARD } },
  };
}
