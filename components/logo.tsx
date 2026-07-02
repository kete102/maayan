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
					src="/logo_v1.png"
					alt="Maayan logo"
					width={32}
					height={32}
					className="size-14 object-contain"
				/>
				<span className="text-primary-foreground font-serif text-3xl font-medium tracking-wide">
					Maayan
				</span>
			</span>
			{showTagline && (
				<span className="text-muted-foreground mt-1 pl-10 font-sans text-[0.6rem] tracking-[0.3em] uppercase">
					Las Escrituras que Fluyen
				</span>
			)}
		</Link>
	);
}
