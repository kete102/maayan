import Image from "next/image";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { INSTAGRAM_URL } from "@/lib/launch";

export function LandingFooter() {
	return (
		<footer className="px-6 pb-10 sm:px-10">
			<div
				className="via-accent/60 mx-auto mb-10 h-px max-w-6xl bg-linear-to-r from-transparent to-transparent"
				aria-hidden="true"
			/>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
				<div className="flex flex-row items-start gap-3">
					<Image
						src="/emblem.png"
						alt=""
						width={240}
						height={24}
						className="size-8 w-auto object-contain"
					/>
					<p className="font-serif text-2xl tracking-[0.3em]">MAAYAN</p>
				</div>
				<div className="flex flex-col items-start gap-2">
					{/* <p className="type-overline text-muted-foreground">Síguenos</p> */}
					<a
						href={INSTAGRAM_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground/80 hover:text-foreground type-body-sm inline-flex items-center gap-2 transition-colors"
					>
						<InstagramIcon className="size-4" />
						<span className="sr-only">Instagram </span>
					</a>
				</div>

				<div className="text-muted-foreground type-body-sm flex flex-col items-start gap-1">
					<p>© {new Date().getFullYear()} Maayan</p>
					{/* <p className="italic">Hecho con intención</p> */}
				</div>
			</div>
		</footer>
	);
}
