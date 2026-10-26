import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/products";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedCollections() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
			<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
				<div className="max-w-xl">
					<p className="text-gold text-xs tracking-[0.3em] uppercase">
						Colecciones
					</p>
					<h2 className="mt-3 font-serif text-4xl font-light text-balance md:text-5xl">
						Encuentra la edición hecha para tu camino
					</h2>
				</div>
				<Link
					href="/shop"
					className="text-foreground text-sm tracking-[0.2em] uppercase underline-offset-8 hover:underline"
				>
					Ver todo
				</Link>
			</div>

			<Reveal className="border-border bg-border mt-12 grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-5">
				{collections.map((c) => (
					<Link
						key={c.slug}
						href={`/shop?collection=${c.slug}`}
						className="group bg-card hover:bg-muted flex min-h-44 flex-col justify-between p-6 transition-colors"
					>
						<ArrowUpRight className="text-gold h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						<div>
							<h3 className="font-serif text-2xl leading-tight font-light">
								{c.name}
							</h3>
							<p className="text-muted-foreground mt-2 text-sm leading-relaxed font-light">
								{c.description}
							</p>
						</div>
					</Link>
				))}
			</Reveal>
		</section>
	);
}
