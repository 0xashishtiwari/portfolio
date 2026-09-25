/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import GitHubSection from "@/components/section/github-section";

import { ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/icons";
import { MOTION } from "@/lib/motion";

const BLUR_FADE_DELAY = 0.04;

const socialLinks = [
  { label: "Resume", href: "/resume.pdf", icon: Icons.resume },
  { label: "GitHub", href: "https://github.com/0xashishtiwari", icon: Icons.github },
  { label: "LinkedIn", href: "https://linkedin.com/in/ashiishtiwarii", icon: Icons.linkedin },
  { label: "LeetCode", href: "https://leetcode.com/1xashishtiwari", icon: Icons.leetcode },
];

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-10 pb-10 sm:gap-12">
      {/* Hero — one of the few noticeable motion moments */}
      <section id="hero" className="pt-0 sm:pt-2">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col gap-2.5 py-3 sm:py-4">
            <BlurFade delay={0} yOffset={8} duration={MOTION.duration.slow} blur="4px">
              <p className="section-label mb-1">Hello, I&apos;m</p>
            </BlurFade>

            <BlurFade delay={0.06} yOffset={8} duration={MOTION.duration.slow}>
              <h1
                className="text-4xl font-normal leading-[0.9] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 380,
                }}
              >
                Ashish
                <span className="font-normal opacity-80" style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>
                  .
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.12} yOffset={6} duration={MOTION.duration.normal}>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={0.18} yOffset={4} duration={MOTION.duration.normal}>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex h-8 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 pr-3.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-px hover:border-foreground/15 hover:bg-foreground hover:text-background hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border/60 transition-colors duration-200 group-hover:bg-background/15 group-hover:text-background group-hover:ring-white/20 motion-reduce:transition-none">
                      <Icon className="size-3.5 shrink-0" />
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em]">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About — static after single reveal */}
      <BlurFade delay={0.04} yOffset={12} duration={MOTION.duration.slow} inView inViewMargin="-60px">
        <section id="about">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="section-label">About</h2>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </div>
        </section>
      </BlurFade>

      {/* Education — single reveal, items static */}
      <BlurFade delay={0.04} yOffset={12} duration={MOTION.duration.slow} inView inViewMargin="-50px">
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="section-label">Education</h2>
            <div className="flex flex-col gap-3">
              {DATA.education.map((education) => (
                <Link
                  key={education.school}
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-card/40 p-3.5 transition-all duration-200 ease-out hover:-translate-y-px hover:border-border hover:bg-card/80 hover:shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
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
                          className="size-3.5 shrink-0 text-muted-foreground opacity-60 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                          aria-hidden
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{education.degree}</div>
                    </div>
                  </div>
                  <div className="flex flex-none items-center pt-1 text-right text-[11px] tabular-nums text-muted-foreground/80 sm:text-xs">
                    {education.start} - {education.end}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </BlurFade>

      {/* Skills — single reveal, individual hover is CSS only */}
      <BlurFade delay={0.04} yOffset={12} duration={MOTION.duration.slow} inView inViewMargin="-50px">
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="section-label">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex h-9 w-fit items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 shadow-[0_12px_25px_-22px_rgba(15,23,42,0.65)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-border hover:shadow-[0_10px_20px_-18px_rgba(15,23,42,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {skill.icon && <skill.icon className="size-4 overflow-hidden rounded object-contain" />}
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </BlurFade>

      {/* GitHub — single reveal */}
      <BlurFade delay={0.04} yOffset={12} duration={MOTION.duration.slow} inView inViewMargin="-50px">
        <section id="github">
          <GitHubSection />
        </section>
      </BlurFade>

      {/* Projects — single reveal */}
      <BlurFade delay={0.04} yOffset={12} duration={MOTION.duration.slow} inView inViewMargin="-50px">
        <section id="projects">
          <ProjectsSection />
        </section>
      </BlurFade>

      {/* Contact — owns its own entrance + copy transition, no outer BlurFade */}
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
