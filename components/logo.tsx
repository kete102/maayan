import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span className="flex items-center gap-2">
        <svg
          viewBox="0 0 64 64"
          className="h-8 w-8 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Water drop */}
          <path d="M32 4 C34 9 40 13 40 20 A8 8 0 0 1 24 20 C24 13 30 9 32 4Z" />

          {/* Top page wave (closest to drop) */}
          <path d="M20 30 C24 26 28 28 32 26 C36 28 40 26 44 30" />

          {/* Middle page wave */}
          <path d="M16 36 C22 31 28 33 32 31 C36 33 42 31 48 36" />

          {/* Bottom page wave */}
          <path d="M12 42 C20 36 27 39 32 36 C37 39 44 36 52 42" />

          {/* Book spine and covers */}
          <path d="M10 48 C18 42 27 44 32 41 C37 44 46 42 54 48 L54 50 C46 45 37 47 32 44 C27 47 18 45 10 50 Z" />
        </svg>
        <span className="font-serif text-3xl font-medium tracking-wide text-primary-foreground">
          Maayan
        </span>
      </span>
      {showTagline && (
        <span className="mt-1 pl-7 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Las Escrituras que Fluyen
        </span>
      )}
    </Link>
  );
}
