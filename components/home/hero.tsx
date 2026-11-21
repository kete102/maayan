"use client";
import { ScrollCue } from "@/components/home/scroll-cue";
import { Countdown } from "@/components/home/countdown";
import { HeroVideo } from "@/components/home/hero-video";
import Link from "next/link";
import { ArrowRight, MailIcon } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
	return (
		<section className="relative isolate flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
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
				className="from-parchment/35 via-parchment/35 to-background absolute inset-0 -z-10 bg-linear-to-b via-90%"
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

				<div className="mt-16 flex flex-row items-center">
					<motion.div
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.5,
							ease: "easeOut",
						}}
					>
						<Link
							href="/waitlist"
							className="type-button border-ink group hover:bg-ink relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-8 py-3 backdrop-blur-sm transition-colors duration-350 ease-in-out hover:text-white"
						>
							<MailIcon
								strokeWidth={1.25}
								className="size-4"
							/>

							<span>Únete a la lista de espera</span>

							<ArrowRight
								strokeWidth={1.5}
								className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
							/>
						</Link>
					</motion.div>
				</div>
			</div>

			<ScrollCue
				href="#about"
				label="Conócenos"
			/>
		</section>
	);
}
