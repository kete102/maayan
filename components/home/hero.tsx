import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export function Hero() {
	const product = products[0];

	return (
		<section
			data-header-theme="dark"
			className="dark-surface relative isolate -mt-20 flex min-h-dvh items-center overflow-hidden pt-20 md:-mt-24 md:pt-24"
		>
			<Image
				src="/images/canyon-hero.webp"
				alt=""
				fill
				priority
				sizes="100vw"
				className="-z-20 object-cover object-center"
			/>
			<div
				className="from-canyon-950/80 via-canyon-950/60 to-canyon-950/40 absolute inset-0 -z-10 bg-gradient-to-b"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent via-[#d2b9a2]/60 to-[#d2b9a2] md:h-64"
				aria-hidden="true"
			/>
			<div className="mx-auto max-w-4xl px-4 pt-16 pb-44 text-center sm:px-8 md:pb-56">
				<p className="text-gold font-sans text-xs font-medium tracking-[0.2em] uppercase">
					Una edición para atesorar
				</p>
				<h1 className="mt-4 font-serif text-5xl leading-[1.02] font-normal tracking-tight sm:text-6xl lg:text-8xl">
					La Palabra, hecha para acompañarte.
				</h1>
				<p className="text-muted-foreground mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed sm:text-lg">
					{product.shortDescription} Encuentra un espacio de calma para volver a
					las Escrituras cada día.
				</p>
				<div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
					<Button
						variant="solid"
						size="hero"
						render={<a href="#biblia" />}
					>
						Descubrir la edición
						<ArrowDown className="size-4" />
					</Button>
					<Link
						href="/about"
						className="text-gold hover:text-foreground py-2 font-sans text-sm font-medium transition-colors"
					>
						Conoce nuestra historia
					</Link>
				</div>
			</div>
		</section>
	);
}
