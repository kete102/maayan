import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function Hero({ product }: { product?: Product }) {
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
				className="from-ink/80 via-ink/60 to-ink/40 absolute inset-0 -z-10 bg-gradient-to-b"
				aria-hidden="true"
			/>
			<div
				className="via-parchment/60 to-parchment absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent md:h-64"
				aria-hidden="true"
			/>
			<div className="mx-auto max-w-4xl px-4 pt-16 pb-44 text-center sm:px-8 md:pb-56">
				<p className="type-overline text-foreground">
					Una edición para atesorar
				</p>
				<h1 className="type-display mt-4">
					La Palabra, hecha para acompañarte.
				</h1>
				<p className="type-body-lg text-foreground/90 mx-auto mt-6 max-w-xl">
					{product?.short_description ??
						"Encuentra un espacio de calma para volver a las Escrituras cada día."}
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
						className="type-button text-muted-foreground hover:text-foreground py-2 transition-colors"
					>
						Conoce nuestra historia
					</Link>
				</div>
			</div>
		</section>
	);
}
