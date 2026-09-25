import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import IntroLoader from "@/components/DeerPreloader";

// Body — Inter (most readable, Vercel/Linear stack)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display — Space Grotesk (geometric, dev-portfolio trend 2025)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Mono — JetBrains Mono (developer-culture, labels/metadata)
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// Editorial accent — keeps italic "Let's" contrast
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
          inter.variable,
          spaceGrotesk.variable,
          jetBrainsMono.variable,
          instrumentSerif.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>

            {/* Intro / Deer Preloader */}
            <IntroLoader />

            {/* Background grid */}
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>

            {/* Main content */}
            <div className="relative z-10 mx-auto flex w-full flex-1 flex-col max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
              <div className="relative border-x border-border/60 px-4 sm:px-6">
                {children}
              </div>
            </div>

            <footer className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
              <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row">
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