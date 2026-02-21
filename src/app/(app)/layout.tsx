import GridBackgroundDemo from "@/components/grid-background-demo";
import Footer from "@/components/ui/Footer";
import Marquee from "@/components/ui/marquee";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "sonner";


interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const MarqueeItems = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Python ",
  ]

   return (
  <div className="min-h-screen w-full relative overflow-x-hidden">
    <GridBackgroundDemo />
    <div className="relative z-10">
      <Navbar />
      {children}
      <Toaster/>
      <Marquee items={MarqueeItems} />
      <Footer />
    </div>
  </div>
)
}