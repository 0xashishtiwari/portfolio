import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

interface LayoutProps {
    href: string;
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full bg-[#F9F9F9] ">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}