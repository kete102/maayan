import { ScrollCue } from "@/components/home/scroll-cue";
import { Countdown } from "@/components/home/countdown";
import { HeroVideo } from "@/components/home/hero-video";

export function Hero() {
	return (
		<section className="relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden">
			<HeroVideo />
			{/* Static fallback when the user prefers reduced motion. */}
			<div
				className="absolute inset-0 -z-20 hidden scale-105 bg-[url(/hero-poster.jpg)] bg-cover bg-center blur-[3px] motion-reduce:block"
				aria-hidden="true"
			/>
			{/*
			 * A soft blur (scaled up to hide the blurred edges) keeps the footage
			 * from competing with the text; a light veil warms it to parchment.
			 */}
			<div
				className="from-parchment/35 via-parchment/35 to-white absolute inset-0 -z-10 bg-linear-to-b via-90%"
				aria-hidden="true"
			/>

			<div className="flex w-full flex-col items-center px-4 py-24 text-center">
				<h1 className="pl-[0.32em] font-serif text-[clamp(2.75rem,10vw,8.5rem)] leading-none font-light tracking-[0.32em] text-black uppercase">
					Maayan
				</h1>
				<p className="type-body text-foreground mx-auto mt-8 max-w-xl font-serif text-[1.375rem] leading-relaxed text-pretty italic sm:text-[1.75rem]">
					&ldquo;La belleza despierta algo en nosotros. Creemos que lo que vemos
					puede ser el comienzo de algo mucho más grande.&rdquo;
				</p>
				<Countdown className="mt-14" />
			</div>

			<ScrollCue
				href="#about"
				label="Conócenos"
			/>
		</section>
	);
}
