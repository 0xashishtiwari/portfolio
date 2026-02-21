'use client'

import Link from 'next/link'
import { Button } from './button'
import { ArrowBigDownIcon, ArrowDownToLine } from 'lucide-react'
import NavbarMobile from '../NavbarMobile'
import { useState } from 'react'
import ThemeToggle from './theme-toggle'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface NavbarItem {
  href: string
  label: string
}

const items: NavbarItem[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]



export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const pathname = usePathname()

  return (  
    <nav className="relative w-full border-b-2 border-foreground  text-foreground">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Mobile - Hamburger on left */}
        <div className="md:hidden">
          <NavbarMobile
            items={items}
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-16">
          {items.map((item) => (
            <Button
              key={item.href}
              className="text-foreground"
              asChild
              variant={pathname === item.href ? 'noShadow' : 'default'}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile - Theme toggle on right, Desktop - Theme toggle + Resume */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <Button asChild variant={'neutral'} className="hidden md:flex items-center gap-2 text-foreground">
            <Link href="/resume.pdf" target="_blank">
              <ArrowDownToLine size={20} />
              Resume
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
