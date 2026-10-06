"use client";

import { useEffect, useRef, useState } from "react";

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

const X_GAP = 72; // distance between X centers
const X_TOP_OFFSET = 18; // distance of first/last X from content edges

function Edge({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [xCount, setXCount] = useState(12);

  /*
   * Size the X marks to the actual content height so both rails
   * always cover the same span. Each side measures the same parent,
   * so left and right stay perfectly symmetric on every page and
   * at every scroll position (no per-side observers to drift apart).
   */
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const compute = () => {
      const height = parent.clientHeight;
      setXCount(
        Math.max(2, Math.floor((height - X_TOP_OFFSET * 2) / X_GAP))
      );
    };

    compute();

    const observer = new ResizeObserver(compute);
    observer.observe(parent);

    return () => observer.disconnect();
  }, []);

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

      {/* X braces — sit entirely between the two lines, evenly spaced */}
      <div className="absolute inset-0 flex flex-col items-center">
        {Array.from({ length: xCount }).map((_, i) => (
          <div
            key={i}
            className="absolute flex size-[10px] items-center justify-center text-[oklch(0.45_0.015_285_/_0.42)] dark:text-[oklch(0.78_0.008_285_/_0.42)]"
            style={{
              top: `${X_TOP_OFFSET + i * X_GAP}px`,
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
