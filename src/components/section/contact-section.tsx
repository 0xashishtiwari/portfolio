"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getCalApi } from "@calcom/embed-react";
import { DATA } from "@/data/resume";
import { MOTION } from "@/lib/motion";
import { useSound } from "@/lib/sound";

type WaterButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
};

function WaterButton({ children, onClick, href, variant = "primary" }: WaterButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 6 droplets per button — rise bottom → top, clipped inside
  const droplets = [
    { left: "16%", size: 4.2, dur: 2.8, delay: 0, rise: 20, drift: 1.2 },
    { left: "28%", size: 3, dur: 3.2, delay: 0.45, rise: 18, drift: -1.0 },
    { left: "42%", size: 3.6, dur: 2.6, delay: 0.9, rise: 22, drift: 1.4 },
    { left: "58%", size: 2.8, dur: 3.5, delay: 0.25, rise: 19, drift: -1.3 },
    { left: "72%", size: 4.0, dur: 2.9, delay: 0.65, rise: 21, drift: 0.8 },
    { left: "86%", size: 2.4, dur: 3.0, delay: 1.1, rise: 17, drift: -0.9 },
  ];

  const base =
    variant === "primary"
      ? "bg-foreground text-background border-foreground/90 hover:bg-foreground/90 hover:border-foreground"
      : "bg-card text-foreground border-border/60 hover:bg-card hover:border-border dark:bg-white/[0.06] dark:text-foreground dark:border-white/10 dark:hover:bg-white/[0.08]";

  const content = (
    <>
      {/* liquid layer — behind text, clipped */}
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]"
        aria-hidden
      >
        {droplets.map((d, i) => (
          <motion.span
            key={i}
            className="absolute bottom-[5px] rounded-full will-change-transform"
            style={{
              left: d.left,
              width: d.size,
              height: d.size,
              background: "currentColor",
              border: "0.5px solid currentColor",
              boxShadow: "inset 0 0.6px 0.6px rgba(255,255,255,0.55)",
              opacity: 0.22,
            }}
            initial={{ y: 6, opacity: 0, scale: 0.75, x: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.16, y: 0, scale: 1, x: 0 }
                : pressed
                  ? { y: -d.rise - 6, x: d.drift, opacity: 0, scale: 0.72 }
                  : {
                      y: [8, -d.rise],
                      x: [0, d.drift, d.drift * 0.6, 0],
                      opacity: hovered ? [0, 0.34, 0.38, 0] : [0, 0.18, 0.22, 0],
                      scale: [0.72, 1, 0.92, 0.62],
                    }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : pressed
                  ? { duration: 0.28, ease: "easeOut" }
                  : {
                      duration: d.dur,
                      delay: d.delay,
                      repeat: Infinity,
                      ease: "easeIn",
                      repeatDelay: 0.4 + Math.random() * 0.6,
                    }
            }
          />
        ))}
      </span>

      {/* content layer — always on top */}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
        <ArrowUpRight
          aria-hidden
          className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:opacity-100 motion-reduce:transition-none"
          strokeWidth={1.7}
        />
      </span>
    </>
  );

  const className = `group relative inline-flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-[10px] border px-5 py-2.5 font-mono text-[12.5px] font-normal tracking-[-0.01em] transition-all duration-200 ease-out hover:-translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:w-auto ${base}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ fontFamily: "var(--font-mono)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setTimeout(() => setPressed(false), 180)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{ fontFamily: "var(--font-mono)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setTimeout(() => setPressed(false), 180)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setTimeout(() => setPressed(false), 180)}
    >
      {content}
    </button>
  );
}

export default function ContactSection() {
  const { play } = useSound();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi();
        cal("ui", { theme: "auto" });
      } catch {}
    })();
  }, []);

  const handleBook = useCallback(async () => {
    play("tap");
    try {
      const cal = await getCalApi();
      cal("modal", { calLink: "helloashish/30min" });
    } catch {}
  }, [play]);

  const handleLinkedIn = useCallback(() => {
    play("tap");
  }, [play]);

  return (
    <section id="contact" className="flex flex-col">
      <div className="flex items-center gap-4">
        <span
          className="font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-muted-foreground/70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Contact
        </span>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out }}
        className="pt-6 sm:pt-7"
      >
        <div className="relative flex flex-col items-center overflow-hidden rounded-[14px] border border-border/50 bg-[oklch(98.6%_0.003_240)] px-6 py-7 text-center shadow-[0_8px_32px_-20px_rgba(15,23,42,0.06)] dark:border-white/[0.07] dark:bg-[oklch(0.205_0_0)] dark:shadow-none sm:px-8 sm:py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
            style={{
              background:
                "radial-gradient(520px 220px at 18% 0%, rgba(148,163,184,0.28) 0%, transparent 60%), radial-gradient(460px 260px at 88% 90%, rgba(148,163,184,0.18) 0%, transparent 65%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

          <div className="relative flex flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2
                className="text-center text-[26px] font-normal leading-[0.98] tracking-[-0.03em] text-foreground antialiased sm:text-[30px] sm:leading-[0.98]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Building something interesting?
              </h2>

            </div>

            <div className="flex w-full flex-col items-center gap-3 pt-1 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <WaterButton variant="primary" onClick={handleBook}>
                Book a call
              </WaterButton>
              <WaterButton variant="secondary" href={DATA.contact.social.LinkedIn.url} onClick={handleLinkedIn}>
                LinkedIn
              </WaterButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
