"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Calendar, Linkedin } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "../ui/button";

export default function ContactSection() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();

      cal("ui", {
        theme: "auto",
      });
    })();
  }, []);

  return (
    <section className="relative pt-8 pb-20">
      <div className="relative w-full overflow-hidden rounded-xl border bg-background px-6 py-12 sm:px-10 sm:py-14">
        {/* Background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden opacity-40">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
          {/* Label */}
          <span className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Contact
          </span>

          {/* Heading */}
          <h2 className="text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            <span
              className="font-normal italic"
              style={{
                fontFamily: "var(--font-instrument)",
              }}
            >
              Let&apos;s
            </span>{" "}
            Connect
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            Interested in collaborating, discussing a project, or exploring an
            opportunity? Feel free to reach out. I&apos;m always open to
            meaningful conversations and new challenges.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={async () => {
                const cal = await getCalApi();

                cal("modal", {
                  calLink: "helloashish/30min",
                });
              }}
              className="h-9 cursor-pointer gap-2 rounded-lg px-4 text-sm font-medium"
            >
              <Calendar className="size-4" />
              Schedule a Call
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-9 gap-2 rounded-lg px-4 text-sm font-medium hover:bg-muted"
            >
              <Link
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-4" />
                Connect on LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}