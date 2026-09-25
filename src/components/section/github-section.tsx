"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function GitHubSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) {
    return (
      <section className="flex min-h-0 flex-col gap-4">
        <div className="flex items-center gap-4">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">GitHub Activity</h2>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <div className="w-full overflow-hidden rounded-xl border bg-card p-4" style={{ borderColor: "#D8D4CC" }}>
          <div className="flex gap-1.5 animate-pulse">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((__, j) => (
                  <div key={j} className="size-2.5 rounded-sm bg-muted" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-col gap-4">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">GitHub Activity</h2>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div
        className="group relative w-full overflow-hidden rounded-xl border bg-card p-3 transition-colors duration-200 hover:border-border sm:p-4"
        style={{ borderColor: "#D8D4CC" }}
      >
        {/* subtle top accent line — green */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent dark:via-[#22c55e]/20" />
        <div className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-thin [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
          <div className="min-w-[640px] sm:min-w-0">
            <GitHubCalendar
              username="0xashishtiwari"
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              blockSize={isMobile ? 9 : 11}
              blockMargin={isMobile ? 3 : 4}
              blockRadius={3}
              fontSize={11}
              theme={{
                light: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#22c55e", "#15803d"],
                dark: ["#0a1a12", "#14532d", "#15803d", "#22c55e", "#4ade80"],
              }}
            />
          </div>
        </div>
        {/* fade edges for scroll hint */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card to-transparent opacity-60 sm:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card to-transparent opacity-60 sm:hidden" />
      </div>
      <p className="font-mono text-[11px] tracking-wide text-muted-foreground/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#22c55e]" /> Less
          <span className="mx-1 h-px w-4 bg-border/60" /> More
        </span>
        <span className="mx-2 text-border/40">·</span>
        <span className="hidden sm:inline">Scroll to explore</span>
        <span className="sm:hidden">Swipe to explore</span>
      </p>
    </section>
  );
}
