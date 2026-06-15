import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <Link href="/" className={cn('group inline-flex flex-col leading-none', className)}>
      <span className="flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2c2 4 5 6 5 10a5 5 0 0 1-10 0c0-4 3-6 5-10Z" />
        </svg>
        <span className="font-serif text-2xl font-medium tracking-wide">
          Maayan
        </span>
      </span>
      {showTagline && (
        <span className="mt-1 pl-7 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Las Escrituras que Fluyen
        </span>
      )}
    </Link>
  )
}
