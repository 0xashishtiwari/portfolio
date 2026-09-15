/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="aspect-[16/9] w-full bg-muted/40" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
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
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 transition-all duration-300 hover:border-border hover:bg-card/70",
        className
      )}
    >
      {/* Image */}
      <div className="relative shrink-0 overflow-hidden border-b border-border/60">
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            ) : image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <div className="aspect-[16/9] w-full bg-muted/40" />
            )}
          </Link>
        ) : (
          <>
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="aspect-[16/9] w-full object-cover"
              />
            ) : image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <div className="aspect-[16/9] w-full bg-muted/40" />
            )}
          </>
        )}

        {/* Project links */}
        {links && links.length > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={link.type}
                className="flex size-7 items-center justify-center rounded-md border border-white/15 bg-black/60 text-white/90 backdrop-blur-md transition-all hover:bg-black/80 hover:text-white"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        {/* Title + date */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[16px] font-medium tracking-[-0.01em] text-foreground">
                {title}
              </h3>

              {href && (
                <ArrowUpRight
                  className="size-3.5 shrink-0 text-muted-foreground/60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              )}
            </div>

            <time className="mt-1.5 block text-[11px] tabular-nums text-muted-foreground/70">
              {dates}
            </time>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 flex-1">
          <div className="prose prose-sm max-w-none text-[13px] leading-6 text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>

        {/* Technologies */}
        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-muted-foreground/75"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}