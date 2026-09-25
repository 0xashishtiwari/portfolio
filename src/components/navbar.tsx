import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-3 sm:bottom-5 sm:px-4">
      <Dock className="pointer-events-auto relative mx-auto flex h-[52px] w-fit max-w-[min(88vw,22rem)] items-end gap-1 rounded-full border border-border/50 bg-white/75 px-2 py-1.5 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.14),0_2px_8px_-4px_rgba(15,23,42,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-white/[0.08] dark:bg-[oklch(0.205_0_0)]/85 dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  aria-label={item.label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="shrink-0"
                >
                  <DockIcon className="cursor-pointer rounded-full border border-border/40 bg-white text-muted-foreground/80 shadow-sm ring-0 transition-colors duration-200 hover:border-border hover:bg-white hover:text-foreground hover:shadow-md active:scale-[0.96] dark:border-white/10 dark:bg-white/[0.06] dark:text-muted-foreground dark:hover:border-white/15 dark:hover:bg-white/[0.10] dark:hover:text-foreground">
                    <item.icon className="size-full rounded-full object-contain p-[1px]" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={10}
                className="rounded-lg border border-border/50 bg-foreground px-2.5 py-1 text-xs font-medium tracking-tight text-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]"
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-foreground" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="mx-1 h-6 w-px shrink-0 self-center bg-border/50 dark:bg-white/10"
        />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={name}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="shrink-0"
                  >
                    <DockIcon className="cursor-pointer rounded-full border border-border/40 bg-white text-muted-foreground/80 shadow-sm ring-0 transition-colors duration-200 hover:border-border hover:bg-white hover:text-foreground hover:shadow-md active:scale-[0.96] dark:border-white/10 dark:bg-white/[0.06] dark:text-muted-foreground dark:hover:border-white/15 dark:hover:bg-white/[0.10] dark:hover:text-foreground">
                      <IconComponent className="size-full rounded-full object-contain p-[1px]" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={10}
                  className="rounded-lg border border-border/50 bg-foreground px-2.5 py-1 text-xs font-medium tracking-tight text-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]"
                >
                  <p>{name}</p>
                  <TooltipArrow className="fill-foreground" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="mx-1 h-6 w-px shrink-0 self-center bg-border/50 dark:bg-white/10"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="cursor-pointer rounded-full border border-border/40 bg-white text-muted-foreground/80 shadow-sm ring-0 transition-colors duration-200 hover:border-border hover:bg-white hover:text-foreground hover:shadow-md active:scale-[0.96] dark:border-white/10 dark:bg-white/[0.06] dark:text-muted-foreground dark:hover:border-white/15 dark:hover:bg-white/[0.10] dark:hover:text-foreground">
              <ModeToggle className="size-full cursor-pointer rounded-full" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={10}
            className="rounded-lg border border-border/50 bg-foreground px-2.5 py-1 text-xs font-medium tracking-tight text-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]"
          >
            <p>Theme</p>
            <TooltipArrow className="fill-foreground" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
