'use client'

import Link from 'next/link'
import { Button } from './button'
import { ArrowBigDownIcon } from 'lucide-react'
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
    <nav className="relative w-full border-b border-foreground bg-background text-foreground">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-16">
          {items.map((item) => (
            <Button
              key={item.href}
              className="text-foreground"
              asChild
              variant={pathname === item.href ? 'reverse' : 'default'}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <Button asChild className="hidden md:flex items-center gap-2 text-foreground">
            <Link href="/resume.pdf" target="_blank">
              <ArrowBigDownIcon size={20} />
              Resume
            </Link>
          </Button>

          {/* Mobile */}
          <NavbarMobile
            items={items}
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
        </div>
      </div>
    </nav>
  )
}
