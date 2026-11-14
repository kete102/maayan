import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";

const footerGroups = [
	{
		title: "Explora",
		links: [
			{ label: "Biblias", href: "/" },
			{ label: "Nuestra historia", href: "/about" },
		],
	},
	{
		title: "Contacto",
		links: [
			{ label: "Escríbenos", href: null },
			{ label: "Preguntas frecuentes", href: null },
		],
	},
	{
		title: "Síguenos",
		links: [
			{ label: "Instagram", href: null },
			{ label: "Facebook", href: null },
			{ label: "TikTok", href: null },
		],
	},
];

export function SiteFooter() {
	return (
		<footer className="border-border bg-background text-foreground overflow-hidden border-t">
			<div className="mx-auto grid max-w-7xl gap-12 px-6 pt-14 pb-10 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-20">
				<div className="flex max-w-md flex-col items-start">
					<Logo />
					<p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
						Una fuente de agua viva para acompañar tu camino de fe.
					</p>
					<p className="text-muted-foreground mt-9 text-xs">
						© {new Date().getFullYear()} Maayan. Las Escrituras que Fluyen.
					</p>
				</div>

				<nav
					aria-label="Enlaces del pie de página"
					className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
				>
					{footerGroups.map(({ title, links }) => (
						<div key={title}>
							<h2 className="type-overline text-muted-foreground mb-4">
								{title}
							</h2>
							<ul className="flex flex-col items-start gap-3">
								{links.map(({ label, href }) => (
									<li key={label}>
										{href ? (
											<Link
												href={href}
												className="text-foreground/80 hover:text-foreground text-sm transition-colors"
											>
												{label}
											</Link>
										) : (
											<span
												aria-disabled="true"
												className="text-muted-foreground/70 text-sm"
											>
												{label}
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</div>

			<div
				aria-hidden="true"
				className="relative aspect-[11/5] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_30%)] sm:aspect-[19/5]"
			>
				<Image
					src="/footer2.webp"
					alt=""
					fill
					sizes="100vw"
					className="object-cover object-bottom sm:object-[center_74%]"
				/>
			</div>
		</footer>
	);
}
