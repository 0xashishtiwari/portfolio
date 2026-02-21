'use client'

import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

interface NavbarItem {
  href: string
  label: string
}

interface NavbarMobileProps {
  items: NavbarItem[]
 
  isNavbarOpen: boolean
  setIsNavbarOpen: (open: boolean) => void
}

const NavbarMobile = ({
  items,
 
  isNavbarOpen,
  setIsNavbarOpen,
}: NavbarMobileProps) => {
  return (
    <div className="md:hidden">
      <Sheet open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
        <SheetTrigger asChild>
          <Button variant="neutral" size="icon" className="cursor-pointer">
            <Menu size={20} />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[85vw] max-w-90 bg-background p-0"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-border">
            <SheetTitle className="text-xl font-bold"> Explore </SheetTitle>
          </SheetHeader>

          {/* Links */}
          <div className="flex flex-col">
            {items.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={`
  w-full
  px-6
  py-4
  text-lg
  font-medium
  transition-colors
  duration-200
  border-b
  cursor-pointer
  text-gray-700
  hover:bg-black
  hover:text-white
  active:bg-black
  active:text-white
`}

                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        
        <div className="flex-1" /> {/* Spacer to push the resume link to the bottom */}

        {/* Resume Link */}
        <SheetClose asChild>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 px-6 py-4 text-lg font-medium transition-colors duration-200 border-t cursor-pointer text-gray-600 hover:bg-black hover:text-white"
          >
         
            Resume
          </Link>
        </SheetClose>

        </SheetContent>
      </Sheet>
    </div>
  )
}

export default NavbarMobile
