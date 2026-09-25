/**
 * Cohesive minimal motion system
 * CALM -> INTERACTION -> RESPONSE -> CALM
 * 80-90% static, 10-20% subtle interaction
 */

export const MOTION = {
  duration: {
    fast: 0.15,
    normal: 0.22,
    slow: 0.35,
  },
  ease: {
    out: [0.22, 1, 0.36, 1] as const, // calm settle
    inOut: [0.4, 0, 0.2, 1] as const,
  },
  // Section reveal — used sparingly, once per major section
  section: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  hero: {
    heading: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
    description: { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } },
    cta: { hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } },
  },
} as const;
