import { INSTAGRAM_URL } from "@/lib/launch";

export function LandingFooter() {
	return (
		<footer className="px-6 pb-10 sm:px-10">
			<div
				className="via-accent/60 mx-auto mb-10 h-px max-w-6xl bg-linear-to-r from-transparent to-transparent"
				aria-hidden="true"
			/>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
				<div className="flex flex-col items-center gap-2 md:items-start">
					<p className="type-overline text-muted-foreground">Síguenos</p>
					<a
						href={INSTAGRAM_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground/80 hover:text-foreground type-body-sm inline-flex items-center gap-2 transition-colors"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-4"
							aria-hidden="true"
						>
							<rect
								x="2"
								y="2"
								width="20"
								height="20"
								rx="5"
							/>
							<circle
								cx="12"
								cy="12"
								r="4"
							/>
							<circle
								cx="17.5"
								cy="6.5"
								r="0.75"
								fill="currentColor"
							/>
						</svg>
						<span className="sr-only">Instagram </span>
						@maayan.shop
					</a>
				</div>

				<div className="flex flex-row items-start gap-3">
					{/* Masked so the emblem takes the brand ink instead of its baked-in blue. */}
					<span
						aria-hidden="true"
						className="bg-ink h-8 w-[3.1rem] mask-[url(/emblem.png)] mask-contain mask-center mask-no-repeat"
					/>
					<p className="font-serif text-2xl tracking-[0.3em]">MAAYAN</p>
				</div>
				<div className="text-muted-foreground type-body-sm flex flex-col items-center gap-1 md:items-start">
					<p>© {new Date().getFullYear()} Maayan</p>
					<p className="italic">Hecho con intención</p>
				</div>
			</div>
		</footer>
	);
}
