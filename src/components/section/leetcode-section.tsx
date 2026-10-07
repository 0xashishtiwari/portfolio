"use client";

import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import { Icons } from "@/components/icons";

const LEETCODE_URL = "https://leetcode.com/1xashishtiwari";

const STATS = [
  { label: "Easy", value: "322", bar: "w-[42%]", barClass: "bg-emerald-500/80" },
  { label: "Medium", value: "404", bar: "w-[53%]", barClass: "bg-amber-500/80" },
  { label: "Hard", value: "60", bar: "w-[8%]", barClass: "bg-rose-500/80" },
];

export default function LeetCodeSection() {
  return (
    <section className="flex min-h-0 flex-col gap-4">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Coding Activity
        </h2>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <Link
        href={LEETCODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View LeetCode profile for 1xashishtiwari"
        className="group relative block w-full overflow-hidden rounded-xl border bg-card p-4 transition-colors duration-200 hover:border-border sm:p-5"
        style={{ borderColor: "#D8D4CC" }}
      >
        {/* subtle top accent line — LeetCode amber */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFA116]/40 to-transparent" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-foreground">
              <Icons.leetcode className="size-5" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[15px] font-medium tracking-[-0.01em] text-foreground">
                1xashishtiwari
              </span>
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground/80">
                Rank ~72K · 786 solved
              </span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-muted-foreground transition-colors group-hover:border-foreground/15 group-hover:text-foreground">
            View profile
            <ArrowUpRight
              className="size-3 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFA116]/10 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-[#b45309] ring-1 ring-[#FFA116]/25 dark:text-amber-400">
            <Flame className="size-3" strokeWidth={2} aria-hidden />
            500-day streak
          </span>
          <span className="inline-flex items-center rounded-full bg-muted/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground ring-1 ring-border/50">
            10 badges
          </span>
          <span className="inline-flex items-center rounded-full bg-muted/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground ring-1 ring-border/50">
            C++ · Java
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border/50 bg-background/60 px-3 py-2.5"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground/70">
                {s.label}
              </div>
              <div className="mt-0.5 text-[18px] font-medium tabular-nums tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${s.bar} ${s.barClass}`} />
              </div>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
