import Image from "next/image";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/launch";
import Link from "next/link";

const socials = [
	{ label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
	{ label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
];

const legalLinks = [
	{ label: "Aviso legal", href: "/legal-notice" },
	{ label: "Privacidad", href: "/privacy-policy" },
	{
		label: "Condiciones de compra",
		href: "/terms-and-conditions",
	},
	{
		label: "Promoción",
		href: "/promotion-terms",
	},
];

export function SiteFooter() {
	return (
		<footer
			role="contentinfo"
			className="mt-10 px-4 pb-8 sm:px-6 sm:pb-10 lg:px-10"
		>
			<div className="mx-auto max-w-6xl">
				<div
					className="mb-8 h-px sm:mb-10"
					aria-hidden="true"
				/>

				<div className="grid gap-8 text-center sm:grid-cols-[1fr_auto] sm:items-start sm:text-left">
					<div className="flex flex-col items-center gap-3 sm:items-start">
						<div className="flex items-center gap-3">
							<Image
								src="/emblem.png"
								alt=""
								width={240}
								height={24}
								className="size-8 w-auto object-contain"
							/>
							<p className="font-serif text-2xl tracking-[0.3em]">M A A Y A N</p>
						</div>
						<p className="text-muted-foreground font-serif text-lg italic">
							La belleza tiene propósito
						</p>
					</div>

					<div className="flex flex-col items-center gap-4 sm:items-end">
						<p className="type-overline text-muted-foreground">Síguenos</p>
						<ul className="flex items-center gap-3">
							{socials.map(({ label, href, Icon }) => (
								<li key={label}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`M A A Y A N en ${label}`}
										className="border-border text-foreground/80 hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center rounded-full border transition-colors"
									>
										<Icon
											className="size-4"
											aria-hidden="true"
										/>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-foreground/10 mt-8 flex flex-col gap-4 border-t pt-5 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-3 sm:text-left">
					<p className="type-body-sm text-muted-foreground sm:shrink-0">
						© {new Date().getFullYear()} M A A Y A N. Todos los derechos reservados.
					</p>

					<nav aria-label="Enlaces legales">
						<ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
							{legalLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="type-body-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
}
