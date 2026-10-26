import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
	return (
		<footer className="border-border bg-background text-foreground border-t">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
				<div className="max-w-sm">
					<Logo textClassName="text-gold" />
					<p className="text-muted-foreground mt-3 text-sm leading-relaxed font-light">
						Una fuente de agua viva para acompañar tu camino de fe.
					</p>
				</div>
				<div className="flex flex-col gap-2 text-sm sm:items-end">
					<Link
						className="text-muted-foreground hover:text-foreground transition-colors"
						href="/"
					>
						Inicio
					</Link>
					<Link
						className="text-muted-foreground hover:text-foreground transition-colors"
						href="/about"
					>
						Nuestra historia
					</Link>
					<p className="text-muted-foreground text-xs">
						© {new Date().getFullYear()} Maayan
					</p>
				</div>
			</div>
		</footer>
	);
}
