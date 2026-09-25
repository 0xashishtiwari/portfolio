"use client";

import { useEffect, useRef } from "react";

function X({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden
      className="block"
      style={{ display: "block" }}
    >
      <line
        x1={0}
        y1={0}
        x2={10}
        y2={10}
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="square"
        shapeRendering="crispEdges"
      />
      <line
        x1={10}
        y1={0}
        x2={0}
        y2={10}
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="square"
        shapeRendering="crispEdges"
      />
    </svg>
  );
}

function Edge({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  // Optional: extremely subtle scroll-linked opacity — static lines, X fades slightly when in viewport
  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const xs = Array.from(root.querySelectorAll<HTMLElement>("[data-x]"));
    if (xs.length === 0 || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.style.opacity = "0.52";
          } else {
            el.style.opacity = "0.34";
          }
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );
    xs.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Generate X positions — vertically continuous, spaced ~96px (X + 2 gaps)
  const xCount = 28;
  const gap = 72; // distance between X centers

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 hidden sm:flex ${
        side === "left" ? "left-0" : "right-0"
      } w-[12px] justify-center`}
      style={{ zIndex: 1 }}
    >
      {/* two thin parallel vertical lines — 1px, low-contrast */}
      <div className="absolute inset-y-0 left-[0px] w-px bg-[oklch(0.55_0.01_285_/_0.14)] dark:bg-[oklch(0.7_0.01_285_/_0.13)]" />
      <div className="absolute inset-y-0 right-[0px] w-px bg-[oklch(0.55_0.01_285_/_0.14)] dark:bg-[oklch(0.7_0.01_285_/_0.13)]" />

      {/* X braces — sit entirely between the two lines, gap 10px */}
      <div className="absolute inset-0 flex flex-col items-center">
        {Array.from({ length: xCount }).map((_, i) => (
          <div
            key={i}
            data-x
            className="absolute flex size-[10px] items-center justify-center text-[oklch(0.45_0.015_285_/_0.42)] dark:text-[oklch(0.78_0.008_285_/_0.42)] transition-opacity duration-500 ease-out"
            style={{
              top: `${18 + i * gap}px`,
              opacity: 0.34,
              // ensure X is exactly between the lines (1px inset each side)
              left: "1px",
              width: "10px",
              height: "10px",
            }}
          >
            <X size={10} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArchitecturalEdges() {
  return (
    <>
      <Edge side="left" />
      <Edge side="right" />
    </>
  );
}
