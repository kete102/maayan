import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedProducts() {
	const featured = products.slice(0, 4);
	return (
		<section className="border-border bg-card border-y py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 md:px-8">
				<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
					<div className="max-w-xl">
						<p className="text-gold text-xs tracking-[0.3em] uppercase">
							Destacados
						</p>
						<h2 className="mt-3 font-serif text-4xl font-light text-balance md:text-5xl">
							Biblias Seleccionadas
						</h2>
					</div>
					<Link
						href="/shop"
						className="text-foreground text-sm tracking-[0.2em] uppercase underline-offset-8 hover:underline"
					>
						Ver todo
					</Link>
				</div>
				<Reveal className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
					{featured.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</Reveal>
			</div>
		</section>
	);
}
