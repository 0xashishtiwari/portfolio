/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import GitHubSection from "@/components/section/github-section";

import {
  ArrowUpRight,
  Code2,
  FileText,
  Github,
  Linkedin,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-11">

      {/* Hero */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex flex-col gap-2 py-4">

            <BlurFade delay={BLUR_FADE_DELAY}>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Hello, I&apos;m
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={6}>
              <h1
                className="
                  text-4xl
                  font-medium
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-foreground
                  sm:text-5xl
                  
                "
              >
                Ashish. 
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3} yOffset={6}>
              <p className="mt-2 max-w-[580px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="mt-5 flex items-center gap-2">
  {[
    {
      label: "Resume",
      href: "/resume.pdf",
      icon: FileText,
    },
    {
      label: "GitHub",
      href: "https://github.com/0xashishtiwari",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ashiishtiwarii",
      icon: Linkedin,
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/1xashishtiwari",
      icon: Code2,
    },
  ].map(({ label, href, icon: Icon }) => (
    <Link
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        h-9
        items-center
        gap-2
        overflow-hidden
        rounded-full
        border
        border-border
        bg-background/70
        px-3
        backdrop-blur-sm
        transition-all
        duration-300
        hover:gap-2.5
        hover:px-4
        hover:bg-foreground
        hover:text-background
      "
    >
      <Icon className="size-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

      <span
        className="
          max-w-0
          overflow-hidden
          whitespace-nowrap
          font-mono
          text-[10px]
          uppercase
          tracking-[0.15em]
          opacity-0
          transition-all
          duration-300
          group-hover:max-w-[80px]
          group-hover:opacity-100
        "
      >
        {label}
      </span>
    </Link>
  ))}
</div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              About
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>

        </div>
      </section>

      {/* Education */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">

          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Education
            </h2>
          </BlurFade>

          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-x-3">

                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 flex-none rounded-full border p-1 object-contain"
                      />
                    ) : (
                      <div className="size-8 flex-none rounded-full border bg-muted" />
                    )}

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">

                      <div className="flex items-center gap-2 font-medium leading-none">
                        {education.school}

                        <ArrowUpRight
                          className="
                            size-3.5
                            text-muted-foreground
                            opacity-0
                            -translate-x-1
                            transition-all
                            duration-200
                            group-hover:translate-x-0
                            group-hover:opacity-100
                          "
                          aria-hidden
                        />
                      </div>

                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-none items-center gap-1 text-xs tabular-nums text-muted-foreground">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>

        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">

          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Skills
            </h2>
          </BlurFade>

          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <div className="flex h-8 w-fit items-center gap-2 rounded-xl border border-border bg-background px-4">
                  {skill.icon && (
                    <skill.icon className="size-4 overflow-hidden rounded object-contain" />
                  )}

                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>

        </div>
      </section>

      {/* GitHub */}
      <section id="github">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <GitHubSection />
        </BlurFade>
      </section>

      {/* Projects */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Contact */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

    </main>
  );
}