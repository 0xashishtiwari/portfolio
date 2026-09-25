"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  active?: boolean;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  active = false,
  tags,
  links,
  className,
}: Props) {
  const TitleWrapper = href ? Link : "div";
  const titleWrapperProps = href
    ? {
        href,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-card/70 hover:shadow-[0_12px_32px_-16px_rgba(15,23,42,0.12)] active:scale-[0.98] dark:hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {/* @ts-expect-error polymorphic wrapper */}
            <TitleWrapper
              {...titleWrapperProps}
              className={cn(
                "min-w-0 rounded-sm text-[17px] font-medium leading-none tracking-[-0.015em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                href && "underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-border/60 group-hover:decoration-foreground/20 motion-reduce:transition-none"
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="truncate">{title}</span>
                {href && (
                  <ArrowUpRight className="size-3 shrink-0 text-muted-foreground/60 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:text-muted-foreground motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
                )}
              </span>
            </TitleWrapper>

            {active && (
              <span
                className="relative flex size-2 shrink-0 items-center justify-center"
                aria-label="Active"
                title="Active"
              >
                <span className="absolute size-2 animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
            )}
          </div>

          <p className="mt-1.5 font-mono text-[12px] font-medium tabular-nums tracking-wide text-muted-foreground/70">
            {dates}
          </p>
        </div>

        {links && links.length > 0 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.type}
                className="flex size-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-200 ease-out hover:border-foreground/15 hover:bg-foreground hover:text-background active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="my-4 h-px w-full bg-border/50" />

      {/* Optional media — very subtle scale on group hover */}
      {links?.[0]?.href && (
        <div className="hidden" aria-hidden />
      )}

      <div className="flex-1">
        <div className="prose prose-sm max-w-none text-[15px] font-normal leading-[1.7] tracking-[-0.008em] text-muted-foreground dark:prose-invert prose-p:my-0 prose-p:leading-[1.7]">
          <Markdown>{description}</Markdown>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/60 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
