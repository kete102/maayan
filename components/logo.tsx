import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
	className,
	textClassName,
	showTagline = false,
	hideText = false,
}: {
	className?: string;
	textClassName?: string;
	showTagline?: boolean;
	hideText?: boolean;
}) {
	return (
		<Link
			href="/"
			className={cn("group inline-flex flex-col leading-none", className)}
		>
			<span className="flex items-center">
				<Image
					src="/logo-gold.webp"
					alt="Maayan logo"
					width={32}
					height={32}
					className={cn("size-9 object-contain", !hideText && "mr-0.5")}
				/>
				<span
					className={cn(
						"grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
						hideText
							? "grid-cols-[0fr] opacity-0"
							: "grid-cols-[1fr] opacity-100"
					)}
				>
					<span
						className={cn(
							"text-gold min-w-0 overflow-hidden font-serif text-2xl font-medium tracking-wide whitespace-nowrap",
							textClassName
						)}
					>
						Maayan
					</span>
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
