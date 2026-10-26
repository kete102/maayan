"use client";

import { ArrowRight, Gem } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { ProductShowcase } from "@/components/home/product-showcase";
import { Button } from "@/components/ui/button";
import { products, formatPrice } from "@/lib/products";

export function ProductFeature() {
	const { addItem } = useCart();
	const product = products[0];

	return (
		<section
			id="biblia"
			className="mx-auto flex min-h-dvh max-w-7xl items-center px-4 py-16 sm:px-8"
		>
			<div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-20">
				<ProductShowcase
					image={product.image}
					alt={product.name}
				/>
				<div className="max-w-xl">
					<p className="text-gold font-sans text-xs font-medium tracking-[0.2em] uppercase">
						{product.edition} · {product.translation}
					</p>
					<h2 className="mt-3 font-serif text-4xl leading-tight font-normal">
						{product.name}
					</h2>
					<p className="text-muted-foreground mt-4 font-sans text-sm leading-relaxed">
						{product.description}
					</p>
					<ul className="mt-5 space-y-2">
						{product.features.map((feature) => (
							<li
								key={feature}
								className="text-muted-foreground flex items-center gap-3 font-sans text-sm"
							>
								<Gem
									className="text-gold size-4 shrink-0"
									strokeWidth={1.6}
									aria-hidden="true"
								/>
								{feature}
							</li>
						))}
					</ul>
					<dl className="border-border mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-5 sm:grid-cols-3">
						{product.specs.map((spec) => (
							<div key={spec.label}>
								<dt className="text-muted-foreground font-sans text-xs tracking-[0.15em] uppercase">
									{spec.label}
								</dt>
								<dd className="mt-1 font-sans text-sm">{spec.value}</dd>
							</div>
						))}
					</dl>
					<div className="border-border mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-serif text-4xl font-medium">
							{formatPrice(product.price)}
						</p>
						<Button
							variant="solid"
							size="hero"
							onClick={() => addItem(product)}
						>
							Añadir a la cesta
							<ArrowRight className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
