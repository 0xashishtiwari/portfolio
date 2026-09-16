import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import IntroLoader from "@/components/DeerPreloader";


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),

  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },

  description: DATA.description,

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
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
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
            <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 pb-16 sm:px-6 sm:py-24">
              <div className="relative border-x border-border/60 px-3 sm:px-8">
                {children}
              </div>
            </div>

            <footer className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
              <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row">
                <p>© {new Date().getFullYear()} Ashish Tiwari</p>

                <div className="flex items-center gap-4">
                  <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
                  <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
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