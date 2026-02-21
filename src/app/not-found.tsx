import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      
      <div className="mb-8">
        <Image
          src="/warning.png"
          alt="Not Found"
          width={200}
          height={200}
          priority
          className="mx-auto animate-pulse"
        />
      </div>

      <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
        404 - Not Found
      </h1>

      <p className="mt-4 max-w-md text-sm sm:text-base text-muted-foreground text-neutral-500">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
      >
        Go Home
      </Link>
    </div>
  )
}