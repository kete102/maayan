import Image from "next/image";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/launch";

const socials = [
	{ label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
	{ label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
];

export function SiteFooter() {
	return (
		<footer className="px-6 pt-4 pb-10 sm:px-10">
			<div className="mx-auto max-w-6xl">
				<div
					className="via-accent/60 mb-12 h-px bg-linear-to-r from-transparent to-transparent"
					aria-hidden="true"
				/>

				<div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
					<div className="flex flex-col items-center gap-3 md:items-start">
						<div className="flex items-center gap-3">
							<Image
								src="/emblem.png"
								alt=""
								width={240}
								height={24}
								className="size-8 w-auto object-contain"
							/>
							<p className="font-serif text-2xl tracking-[0.3em]">MAAYAN</p>
						</div>
						<p className="text-muted-foreground font-serif text-lg italic">
							Las Escrituras que Fluyen
						</p>
					</div>

					<div className="flex flex-col items-center gap-4 md:items-end">
						<p className="type-overline text-muted-foreground">Síguenos</p>
						<ul className="flex items-center gap-3">
							{socials.map(({ label, href, Icon }) => (
								<li key={label}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Maayan en ${label}`}
										className="border-border text-foreground/80 hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center rounded-full border transition-colors"
									>
										<Icon className="size-4" aria-hidden="true" />
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<p className="text-muted-foreground border-border/60 mt-12 border-t pt-6 text-center text-xs md:text-left">
					© {new Date().getFullYear()} Maayan. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
}
