"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function GitHubSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="flex min-h-0 flex-col gap-3">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          GitHub Activity
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-background p-3 sm:p-4" />
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-col gap-3">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          GitHub Activity
        </h2>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-background p-3 transition-colors duration-200 hover:border-border sm:p-4 motion-reduce:transition-none">
        <div className="w-full overflow-hidden">
          <GitHubCalendar
            username="0xashishtiwari"
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            blockSize={11}
            blockMargin={4}
            blockRadius={2}
            fontSize={12}
            theme={{
              light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#71717a", "#27272a"],
              dark: ["#18181b", "#3f3f46", "#71717a", "#a1a1aa", "#e4e4e7"],
            }}
          />
        </div>
      </div>
    </section>
  );
}
