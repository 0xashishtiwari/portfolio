"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DATA } from "@/data/resume";
import { MOTION } from "@/lib/motion";
import { useSound } from "@/lib/sound";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { enabled: soundEnabled, toggle: toggleSound, play } = useSound();
  const shouldReduceMotion = useReducedMotion();
  const copyTimer = useRef<number | null>(null);

  const handleEmailClick = useCallback(() => {
    play("tap");
  }, [play]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      play("confirm");
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600) as unknown as number;
    } catch {}
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
        initial={shouldReduceMotion ? false : MOTION.section.hidden}
        whileInView={shouldReduceMotion ? undefined : MOTION.section.visible}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out }}
        className="flex flex-col gap-8 pt-9 sm:gap-9 sm:pt-10"
      >
        <div className="flex flex-col gap-4">
          <h2
            className="text-[34px] font-normal leading-[0.92] tracking-[-0.045em] text-foreground antialiased sm:text-[42px] sm:leading-[0.92]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Let&apos;s{" "}
            <em className="font-normal" style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>
              talk.
            </em>
          </h2>
          <p
            className="max-w-[480px] text-[15px] font-normal leading-[1.75] tracking-[-0.012em] text-muted-foreground antialiased sm:text-[15.5px] sm:leading-[1.8]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Open to interesting projects, collaborations, and conversations about software.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`mailto:${DATA.contact.email}`}
              onClick={handleEmailClick}
              className="group inline-flex w-fit items-baseline gap-1.5 rounded-sm font-mono text-[13.5px] font-normal tracking-[-0.02em] text-foreground underline decoration-border/50 underline-offset-[8px] decoration-[0.5px] transition-colors duration-200 ease-out hover:decoration-foreground/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-[14.5px] motion-reduce:transition-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>{DATA.contact.email}</span>
              <ArrowUpRight
                aria-hidden
                className="size-[13px] shrink-0 translate-y-[1px] text-muted-foreground/50 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:text-muted-foreground group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[2px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                strokeWidth={1.6}
              />
            </Link>

            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              className="inline-flex items-center gap-1 rounded-sm px-1 py-1 font-mono text-[11px] font-normal tracking-[0.04em] text-muted-foreground/60 transition-colors duration-200 ease-out hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="relative inline-flex size-3 items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { scale: 0.7, opacity: 0 }}
                      transition={{ duration: MOTION.duration.fast, ease: "easeOut" }}
                      className="absolute inset-0 inline-flex items-center justify-center"
                    >
                      <Check className="size-3 text-emerald-600" strokeWidth={2} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { scale: 0.7, opacity: 0 }}
                      transition={{ duration: MOTION.duration.fast, ease: "easeOut" }}
                      className="absolute inset-0 inline-flex items-center justify-center"
                    >
                      <Copy className="size-3" strokeWidth={1.6} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 rounded-sm font-mono text-[11.5px] font-normal tracking-[0.04em] text-muted-foreground/70 underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:decoration-border/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              GitHub
              <ArrowUpRight
                aria-hidden
                className="size-3 shrink-0 opacity-60 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                strokeWidth={1.6}
              />
            </Link>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 rounded-sm font-mono text-[11.5px] font-normal tracking-[0.04em] text-muted-foreground/70 underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:decoration-border/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              LinkedIn
              <ArrowUpRight
                aria-hidden
                className="size-3 shrink-0 opacity-60 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                strokeWidth={1.6}
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <p
            className="inline-flex items-center gap-2 font-mono text-[10.5px] font-normal leading-relaxed tracking-[0.06em] text-muted-foreground/45"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="size-1 rounded-full bg-emerald-500/70" aria-hidden />
            Available for opportunities · Bhopal, India · Usually replies within 24h
          </p>
          <span className="hidden h-3 w-px bg-border/30 sm:block" aria-hidden />
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Disable interface sounds" : "Enable interface sounds"}
            aria-pressed={soundEnabled}
            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-normal tracking-[0.06em] text-muted-foreground/40 underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:text-muted-foreground/70 hover:decoration-border/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            style={{ fontFamily: "var(--font-mono)" }}
            title={soundEnabled ? "Sound on — click to mute" : "Sound off — click to enable"}
          >
            <span className={`size-1 rounded-full transition-colors ${soundEnabled ? "bg-emerald-500/50" : "bg-muted-foreground/25"}`} aria-hidden />
            {soundEnabled ? "Sound on" : "Sound off"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
