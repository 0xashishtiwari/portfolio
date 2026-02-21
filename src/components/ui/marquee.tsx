"use client"

export default function Marquee({ items }: { items: string[] }) {
  const content = items.flatMap((item, index) => [
    <span key={`text-${index}`} className="mx-4 sm:mx-6 text-xl sm:text-3xl font-monospace text-neutral-500 tracking-wide">
      {item}
    </span>,

    <span
      key={`dot-${index}`}
      className="mx-4 sm:mx-6 flex items-center justify-center"
    >
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground/40 rounded-full" />
    </span>,
  ])

  return (
    <div className="relative flex w-full overflow-x-hidden border-y-2 border-foreground bg-background text-foreground font-base">

      {/* First Layer */}
      <div className="animate-marquee whitespace-nowrap py-6 sm:py-10 flex items-center">
        {content}
      </div>

      {/* Second Layer */}
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-6 sm:py-10 flex items-center">
        {content}
      </div>

    </div>
  )
}