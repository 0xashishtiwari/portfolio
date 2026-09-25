import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import IntroLoader from "@/components/DeerPreloader";
import ArchitecturalEdges from "@/components/architectural-edges";

// Sans — Instrument Sans: airy, editorial, generous apertures (replaces Inter)
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Display — Fraunces: soft editorial serif for hero & section headings
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

// Mono — Geist Mono: more open than JetBrains, less congested at small sizes
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// Editorial accent — Instrument Serif italic for “talk.” moments
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),

  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },

  description: DATA.description,

  alternates: {
    types: {
      "application/rss+xml": `${DATA.url}/rss.xml`,
    },
  },

  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },

  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative flex min-h-screen flex-col bg-background font-sans antialiased",
          instrumentSans.variable,
          fraunces.variable,
          geistMono.variable,
          instrumentSerif.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>

            {/* Intro / Deer Preloader */}
            <IntroLoader />

            {/* Background — warm paper, no cold slate gradient */}
            <div className="absolute inset-0 top-0 left-0 right-0 h-[140px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full opacity-[0.06] dark:opacity-[0.04]"
                squareSize={2}
                gridGap={3}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>

            {/* Main content — more breathing room */}
            <div className="relative z-10 mx-auto flex w-full flex-1 flex-col max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
              <div className="relative px-5 sm:px-7">
                <ArchitecturalEdges />
                {children}
              </div>
            </div>

            <footer className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
              <div className="flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 sm:flex-row">
                <p>© {new Date().getFullYear()} Ashish Tiwari</p>

                <div className="flex items-center gap-4">
                  <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
                  <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
                  <Link href="/rss.xml" className="transition-colors hover:text-foreground">RSS</Link>
                  <Link href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">GitHub</Link>
                  <Link href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">LinkedIn</Link>
                </div>
              </div>
            </footer>

            {/* Navbar */}
            <Navbar />

          
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
