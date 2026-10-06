"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  /** Max pull in px when the cursor reaches the edge of the field. */
  strength?: number;
  /** Invisible proximity zone (px) around the child that triggers the pull. */
  field?: number;
  className?: string;
  innerClassName?: string;
};

/*
 * Magnetic hover: when the cursor enters an invisible field around
 * the child, the child is gently pulled toward the cursor and springs
 * back on leave. The negative margin cancels the field padding so
 * layout is unaffected. Disabled for reduced-motion and touch pointers.
 */
export default function Magnetic({
  children,
  strength = 8,
  field = 16,
  className,
  innerClassName,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 180,
    damping: 14,
    mass: 0.2,
  });
  const springY = useSpring(y, {
    stiffness: 180,
    damping: 14,
    mass: 0.2,
  });

  const canPull = () =>
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!canPull() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2 || 1);
    const normY = (e.clientY - centerY) / (rect.height / 2 || 1);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    x.set(clamp(normX) * strength);
    y.set(clamp(normY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ margin: -field, padding: field }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.span
        style={{ x: springX, y: springY }}
        className={cn("inline-flex", innerClassName)}
      >
        {children}
      </motion.span>
    </div>
  );
}
