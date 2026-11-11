import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
	className,
	showTagline = false,
	hideText = false,
	compactOnMobile = false,
}: {
	className?: string;
	showTagline?: boolean;
	hideText?: boolean;
	compactOnMobile?: boolean;
}) {
	return (
		<Link
			href="/"
			className={cn("group inline-flex flex-col leading-none", className)}
		>
			<span className="flex items-center">
				<Image
					src="/logo.svg"
					alt="Maayan logo"
					width={32}
					height={32}
					className={cn(
						"size-20 object-contain",
						!hideText && "mr-0.5",
						compactOnMobile && "max-sm:size-14"
					)}
				/>
				<span
					className={cn(
						"grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
						hideText
							? "grid-cols-[0fr] opacity-0"
							: "grid-cols-[1fr] opacity-100"
					)}
				>
					<h1
						className={cn(
							"text-[1.625rem] tracking-[8px]",
							compactOnMobile && "max-sm:text-[1.375rem] max-sm:tracking-[6px]"
						)}
					>
						MAAYAN
					</h1>
				</span>
			</span>
			{showTagline && (
				<span className="text-muted-foreground type-overline mt-1 pl-10">
					Las Escrituras que Fluyen
				</span>
			)}
		</Link>
	);
}
