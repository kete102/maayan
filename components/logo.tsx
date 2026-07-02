import Link from "next/link";
import Image from "next/image";
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
        <Image
          src="/logo_v2.png"
          alt="Maayan logo"
          width={32}
          height={32}
          className="size-18 object-contain"
        />
        <span className="font-serif text-3xl font-medium tracking-wide text-primary-foreground">
          Maayan
        </span>
      </span>
      {showTagline && (
        <span className="mt-1 pl-10 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Las Escrituras que Fluyen
        </span>
      )}
    </Link>
  );
}
