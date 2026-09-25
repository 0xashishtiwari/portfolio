"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useSound } from "@/lib/sound";

export default function RetroComputer() {
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { play } = useSound();

  const c = {
    bg: isDark ? "#1C1C1C" : "#F7F5F0",
    ink: isDark ? "#F2EFE8" : "#171717",
    muted: isDark ? "#9A968D" : "#6F6B63",
    border: isDark ? "#33312D" : "#D8D4CC",
    key: isDark ? "#232323" : "#E8E2D9",
    keyHi: isDark ? "#2A2A2A" : "#E8DDD3",
    screen: isDark ? "#141414" : "#FFFEFC",
    accent: isDark ? "#D47752" : "#B85C3A",
  };

  const handleClick = () => {
    play("tap");
    if (shouldReduceMotion) return;
    setClicked(true);
    setTimeout(() => setClicked(false), 320);
  };

  return (
    <motion.div
      aria-hidden={false}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="absolute -top-1 right-1 block select-none sm:-top-8 sm:right-2 lg:right-6"
      style={{ width: "clamp(86px, 22vw, 190px)" }}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : clicked
              ? { y: [0, -1.5, 0], x: [0, 0.8, 0] }
              : { y: [0, -1, 0] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : clicked
              ? { duration: 0.32, ease: "easeOut" }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative w-full"
      >
        <div
          className="group relative w-full cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          role="img"
          aria-label="Retro CRT computer — click to flicker"
          style={{ pointerEvents: "auto" }}
        >
          <svg
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full transition-all duration-300 ease-out"
            style={{
              display: "block",
              filter: hovered && !shouldReduceMotion ? "brightness(1.04)" : "brightness(1)",
            }}
          >
            {/* Guide marks — theme-aware */}
            <g
              opacity={hovered ? 0.22 : 0.14}
              stroke={c.muted}
              strokeWidth="0.6"
              strokeDasharray="2 3"
              className="transition-opacity duration-300"
            >
              <line x1="6" y1="6" x2="18" y2="6" />
              <line x1="6" y1="6" x2="6" y2="18" />
              <line x1="194" y1="6" x2="182" y2="6" />
              <line x1="194" y1="6" x2="194" y2="18" />
            </g>

            {/* Monitor body — theme-aware */}
            <rect x="22" y="14" width="118" height="84" rx="4.5" stroke={c.ink} strokeWidth="1.15" fill={c.bg} />
            <rect x="22" y="14" width="118" height="84" rx="4.5" stroke={c.border} strokeWidth="0.6" fill="none" opacity="0.6" />

            {/* Monitor bezel inner */}
            <rect x="30" y="22" width="102" height="62" rx="2.5" stroke={hovered ? c.accent : c.ink} strokeWidth="0.9" fill="none" className="transition-colors duration-200" style={{ opacity: hovered ? 0.9 : 1 }} />

            {/* Screen — theme-aware */}
            <motion.rect
              x="33"
              y="25"
              width="96"
              height="56"
              rx="1.5"
              fill={c.screen}
              stroke={c.muted}
              strokeWidth="0.7"
              animate={clicked && !shouldReduceMotion ? { opacity: [1, 0.7, 1] } : undefined}
              transition={clicked ? { duration: 0.18, times: [0, 0.5, 1] } : undefined}
            />
            {/* Screen scanline — theme-aware */}
            <g opacity={hovered ? 0.07 : 0.04} stroke={c.ink} strokeWidth="0.4" className="transition-opacity duration-300">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1="33" y1={28 + i * 4.2} x2="129" y2={28 + i * 4.2} />
              ))}
            </g>

            {/* Power LED — theme-aware accent */}
            <motion.circle
              cx="74"
              cy="92"
              r="1.6"
              fill={c.accent}
              opacity="0.95"
              animate={
                shouldReduceMotion
                  ? undefined
                  : hovered
                    ? { opacity: [0.95, 1, 0.95], scale: [1, 1.15, 1] }
                    : { opacity: [0.85, 0.95, 0.85] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: hovered ? 0.7 : 1.8, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <motion.circle
              cx="74"
              cy="92"
              r="3.2"
              fill={c.accent}
              animate={shouldReduceMotion ? undefined : { opacity: hovered ? [0.12, 0.22, 0.12] : [0.08, 0.12, 0.08], scale: hovered ? [1, 1.25, 1] : [1, 1.1, 1] }}
              transition={{ duration: hovered ? 0.7 : 2.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Screen content — theme-aware */}
            <g opacity="0.85">
              <rect x="39" y="32" width="42" height="2" rx="1" fill={c.muted} opacity="0.45" />
              <motion.rect
                x="39"
                y="37.5"
                width="58"
                height="1.7"
                rx="1"
                fill={c.muted}
                initial={false}
                animate={{ opacity: hovered ? 0.42 : 0.28, width: hovered ? 64 : 58 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <rect x="39" y="42" width="36" height="1.7" rx="1" fill={c.muted} opacity="0.22" />
              <motion.rect
                x="39"
                y="48"
                width="52"
                height="1.7"
                rx="1"
                fill={c.ink}
                initial={false}
                animate={{ opacity: hovered ? 0.85 : 0.24 }}
                transition={{ duration: 0.3 }}
              />
              {/* hover-only extra line */}
              <motion.rect
                x="39"
                y="53.5"
                width="28"
                height="1.7"
                rx="1"
                fill={c.accent}
                initial={false}
                animate={{ opacity: hovered ? 0.55 : 0, width: hovered ? 28 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </g>

            {/* Blinking cursor — accent */}
            <motion.rect
              x="83"
              y="31"
              width="5.5"
              height="7"
              rx="0.5"
              fill={c.accent}
              animate={shouldReduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 1.1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
            />
            {/* hover typing cursor — accent */}
            <motion.rect
              x="69"
              y="53.5"
              width="3.5"
              height="4.5"
              rx="0.5"
              fill={c.accent}
              initial={false}
              animate={{ opacity: hovered ? [1, 0, 1] : 0 }}
              transition={hovered ? { duration: 0.7, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
            />

            {/* Monitor stand — theme-aware */}
            <rect x="64" y="98" width="34" height="10" rx="1.5" stroke={c.ink} strokeWidth="0.9" fill={c.bg} />
            <rect x="52" y="108" width="58" height="4.5" rx="1.2" fill={c.ink} opacity="0.92" />
            <rect x="52" y="108" width="58" height="4.5" rx="1.2" stroke={c.ink} strokeWidth="0.7" fill="none" />

            {/* Keyboard — theme-aware */}
            <g>
              <rect x="18" y="118" width="126" height="18" rx="2" stroke={c.ink} strokeWidth="0.9" fill={c.bg} />
              <g stroke={c.border} strokeWidth="0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.rect
                    key={`k1-${i}`}
                    x={22 + i * 10.2}
                    y="121.5"
                    width="8.2"
                    height="5.2"
                    rx="0.6"
                    fill={hovered ? (i % 3 === 0 ? c.keyHi : c.key) : c.key}
                    animate={
                      hovered && !shouldReduceMotion
                        ? { fill: i % 4 === 0 ? [c.key, c.keyHi, c.key] : undefined, y: i % 5 === 0 ? [0, 0.6, 0] : 0 }
                        : undefined
                    }
                    transition={
                      hovered && i % 4 === 0 ? { duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" } : undefined
                    }
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <rect key={`k2-${i}`} x={22 + i * 10.2} y="128.2" width="8.2" height="5.2" rx="0.6" fill={c.key} stroke={c.border} strokeWidth="0.5" />
                ))}
              </g>
              <rect x="62" y="128.2" width="28" height="5.2" rx="0.6" fill={hovered ? c.keyHi : c.key} stroke={c.border} strokeWidth="0.5" className="transition-colors duration-200" />
            </g>

            {/* Mouse — theme-aware */}
            <motion.g animate={clicked && !shouldReduceMotion ? { y: [0, 1.2, 0] } : undefined} transition={clicked ? { duration: 0.2, ease: "easeOut" } : undefined}>
              <ellipse cx="156" cy="127" rx="9" ry="7" fill={c.bg} stroke={c.ink} strokeWidth="0.85" />
              <path d="M 156 120 L 156 127" stroke={c.border} strokeWidth="0.6" />
              <motion.circle
                cx="156"
                cy="124.5"
                r="0.9"
                fill={c.accent}
                animate={hovered && !shouldReduceMotion ? { opacity: [0.9, 1, 0.9], scale: [1, 1.3, 1] } : { opacity: 0.9 }}
                transition={hovered ? { duration: 0.8, repeat: Infinity } : undefined}
              />
            </motion.g>

            {/* Mouse cable — theme-aware */}
            <motion.path
              d="M 147 125 C 142 118, 138 112, 144 106"
              stroke={c.muted}
              strokeWidth="0.6"
              fill="none"
              opacity="0.35"
              strokeLinecap="round"
              animate={hovered && !shouldReduceMotion ? { opacity: [0.35, 0.55, 0.35], d: ["M 147 125 C 142 118, 138 112, 144 106", "M 147 125 C 143 117, 139 111, 145 106", "M 147 125 C 142 118, 138 112, 144 106"] } : undefined}
              transition={hovered ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : undefined}
            />

            {/* Technical label — theme-aware */}
            <g fontFamily="var(--font-mono)" fontSize="3.2" fill={c.muted} opacity="0.45" letterSpacing="0.4">
              <text x="34" y="88" textAnchor="start">
                CRT-01
              </text>
              <motion.text
                x="112"
                y="88"
                textAnchor="end"
                fontSize="2.8"
                fill={c.accent}
                initial={false}
                animate={{ opacity: hovered ? 0.85 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ● LIVE
              </motion.text>
            </g>
          </svg>

          {/* Hover glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(260px 140px at 50% 32%, rgba(184,92,58,0.08), transparent 68%)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
