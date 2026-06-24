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
    <div className="relative pt-8">
      <div className="relative overflow-hidden rounded-xl border p-10">
        <div className="absolute inset-0 h-1/2 overflow-hidden rounded-xl">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Let&apos;s Connect
          </h2>

          <p className="max-w-lg text-balance text-muted-foreground">
            Interested in collaborating, discussing a project, or exploring an
            opportunity? Feel free to reach out. I&apos;m always open to meaningful
            conversations and new challenges.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={async () => {
                const cal = await getCalApi();
                cal("modal", {
                  calLink: "helloashish/30min",
                });
              }}
              className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-105"
            >
              <Calendar className="size-4" />
              Schedule a Call
            </Button>

            <Button
              asChild
              variant="outline"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
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
    </div>
  );
}