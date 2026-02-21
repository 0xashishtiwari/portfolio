import { Github, Linkedin, X, Mail } from "lucide-react"
import React from "react"
import Mandala from "./Mandala"

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-border/40 py-8">
      <Mandala />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Left */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs text-muted-foreground/70">
              Built with ❤️
            </p>
            <p className="text-sm text-muted-foreground">
              © 2026 ashishx.in. All rights reserved.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            
            <a
              href="mailto:ashishinrewa@gmail.com"
              className="text-muted-foreground transition duration-200  hover:text-foreground hover:scale-125"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>

            <a
              href="https://www.linkedin.com/in/ashiishtiwarii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition duration-200 hover:text-foreground hover:scale-125"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>

            <a
              href="https://github.com/0xashishtiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground hover:scale-125 "
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>

            <a
              href="https://x.com/1xashishtiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition duration-200 hover:text-foreground hover:scale-125"
              aria-label="X"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer