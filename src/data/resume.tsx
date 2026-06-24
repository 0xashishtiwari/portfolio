import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Ashish Tiwari",
  initials: "AT",
  url: "https://ashishtiwari.dev",
  location: "Bhopal, India",
  locationLink: "https://www.google.com/maps/place/bhopal",
  description:
    "Building software, exploring new technologies, and occasionally breaking production on a VPS.",
  summary:
    "I like building things on the internet. Recently, I've been working on AI-powered applications, workflow automation systems, and full-stack products while exploring backend engineering and cloud technologies. Most of what I know comes from building projects, breaking them, and learning how to make them better.",
  avatarUrl: "/me.jpeg",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "C++", icon: Csharp },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/0xashishtiwari",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ashiishtiwarii/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/1xashishtiwari",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:ashishinrewa@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [

    {
      company: "Mitre Media",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/mitremedia.png",
      start: "May 2017",
      end: "August 2017",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  education: [
    {
      school: "Oriental Institute of Science and Technology",
      href: "https://oriental.ac.in",
      degree: "Computer Science and Engineering",
      logoUrl: "https://synques-dyn-cdn.s3.ap-south-1.amazonaws.com/oriental/images/favicon.webp",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "ContractIQ",
      href: "https://github.com/0xashishtiwari/contractiq",
      dates: "May 2026 - June 2026",
      active: true,
      description: "AI-powered contract review platform that analyzes PDF contracts, identifies risks, and generates professional reports using LLMs and automated workflows.",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Trigger.dev",
        "OpenAI",
        "Gemini",
        "TailwindCSS"
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/0xashishtiwari/contractiq",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "/ContractIQ_image.png",
      video:
        "",
    },
    {
      title: "Secure Whisper",
      href: "https://securewhisper.ashishx.in",
      dates: "December 2025 - January 2026",
      active: true,
      description:
        "Anonymous messaging platform that enables users to receive messages without revealing sender identities. Built with secure authentication, scalable APIs, and real-time user workflows while maintaining privacy and ease of use.",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "NextAuth.js",
        "Tailwind CSS",
        "React",
        "JWT",
        "REST APIs"
      ],
      links: [
        {
          type: "Website",
          href: "https://securewhisper.ashishx.in",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/0xashishtiwari/securewhisper",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/secureWhisper.png",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "Check Inly",
      href: "https://github.com/0xashishtiwari/check-inly",
      dates: "2024",
      active: true,
      description:
        "Full-stack property listing platform that enables users to discover, create, and manage property listings. Built with secure authentication, image upload workflows, and a scalable REST API architecture following the MVC design pattern.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Passport.js",
        "Cloudinary",
        "Multer",
        "Bootstrap"
      ],
      links: [
        {
          type: "Website",
          href: "https://checkinly.onrender.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/0xashishtiwari/checkinly",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/checkInly.png",
    }
    ,

  ],
  hackathons: [
    
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark",
        },
      ],
    },
  ],
} as const;
