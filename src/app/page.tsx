/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
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

const BLUR_FADE_DELAY = 0.04;

const socialLinks = [
  { label: "Resume", href: "/resume.pdf", icon: FileText },
  { label: "GitHub", href: "https://github.com/0xashishtiwari", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/ashiishtiwarii", icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/1xashishtiwari", icon: Code2 },
];

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-14 pb-24 sm:gap-16">
      <section id="hero" className="pt-2 sm:pt-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col gap-3 py-4 sm:gap-4 sm:py-6">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <p className="section-label mb-1">Hello, I&apos;m</p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={6}>
              <h1
                className="text-4xl font-medium leading-[0.96] text-foreground sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: '"Times New Roman", Georgia, serif',
                  fontStyle: "normal",
                  letterSpacing: "-0.04em",
                }}
              >
                Ashish.
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3} yOffset={6}>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 items-center gap-2.5 overflow-hidden rounded-full border border-border/80 bg-background/70 px-3.5 text-foreground shadow-[0_14px_30px_-24px_rgba(15,23,42,0.55)] backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-foreground hover:text-background"
                  >
                    <Icon className="size-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] transition-opacity duration-300 sm:text-[10px]">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="section-label">About</h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="section-label">Education</h2>
          </BlurFade>

          <div className="flex flex-col gap-4 sm:gap-5">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-card/40 p-3.5 transition-colors duration-200 hover:border-border hover:bg-card/80 sm:p-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-9 flex-none rounded-full border border-border bg-white/80 p-1.5 object-contain"
                      />
                    ) : (
                      <div className="size-9 flex-none rounded-full border border-border bg-muted" />
                    )}

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm font-medium leading-tight text-foreground sm:text-base">
                        {education.school}

                        <ArrowUpRight
                          className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-none items-center pt-1 text-right text-[11px] tabular-nums text-muted-foreground/80 sm:text-xs">
                    {education.start} - {education.end}
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="section-label">Skills</h2>
          </BlurFade>

          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="flex h-9 w-fit items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 shadow-[0_12px_25px_-22px_rgba(15,23,42,0.65)]">
                  {skill.icon && <skill.icon className="size-4 overflow-hidden rounded object-contain" />}
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="github">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <GitHubSection />
        </BlurFade>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
