import { Github, Linkedin, X } from "lucide-react"
import React from "react"
import Mandala from "./Mandala"

const Footer = () => {
  return (
    <footer className="relative w-full py-6 sm:py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pr-20 sm:pr-24 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-muted-foreground text-center md:text-left">
          © 2026 ashishx.in. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/ashiishtiwarii/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors  "
          >
            <Linkedin size={22}/>
          </a>

          <a
            href="https://github.com/0xashishtiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={22} />
          </a>

          <a
            href="https://x.com/1xashishtiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={22} />
          </a>
        </div>

      </div>
      <Mandala />
    </footer>
  )
}

export default Footer