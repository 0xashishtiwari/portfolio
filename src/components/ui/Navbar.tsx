'use client'

import Link from 'next/link'
import { Button } from './button'
import { ArrowBigDownIcon } from 'lucide-react'
import NavbarMobile from '../NavbarMobile'
import { useState } from 'react'

interface NavbarItem {
  href: string
  label: string
}

const items: NavbarItem[] = [
  { href: '/', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]


export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  return (
    <nav className="relative h-20 w-full border-b-2 border-gray-900 bg-white flex items-center">
      {/* Desktop */}
      <div className="container mx-auto hidden md:flex h-full items-center gap-16 justify-center">
        {items.map((item) => (
          <Button
            key={item.href}
            
            asChild
            className='bg-[#F9F9F9]'
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
    
    
        <Button className=' items-center gap-2 bg-[#F9F9F9] mr-5 cursor-pointer md:flex hidden' >
            <ArrowBigDownIcon size={20} />
            <Link href="/resume.pdf" target="_blank" >
                Resume
                
            </Link>
        </Button>

      {/* Mobile */}
      <NavbarMobile
        items={items}
        
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />
    </nav>
  )
}
