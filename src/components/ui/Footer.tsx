import { Github, Linkedin, X } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white w-full text-black py-4 border-t-2 border-black mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm text-center md:text-left">
          © 2026 ashishx.in All rights reserved.
        </p>

        <div className="flex items-center mt-4 md:mt-0 space-x-6 mr-5">
          
          <a
            href="https://www.linkedin.com/in/ashiishtiwarii/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="text-gray-500 hover:text-gray-700 transition" size={24} />
          </a>

          <a
            href="https://github.com/0xashishtiwari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="text-gray-500 hover:text-gray-700 transition" size={24} />
          </a>

          <a
            href="https://x.com/1xashishtiwari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X className="text-gray-500 hover:text-gray-700 transition" size={24} />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
