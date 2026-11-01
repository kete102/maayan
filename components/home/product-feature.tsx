import { ArrowRight, Gem } from "lucide-react";
import { ProductShowcase } from "@/components/home/product-showcase";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getProductSpecs, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/money";

export function ProductFeature({ product }: { product: Product }) {
	const specs = getProductSpecs(product);
	const translation = specs.find((spec) => spec.label === "Traducción")?.value;

	return (
		<section
			id="biblia"
			className="mx-auto flex min-h-dvh max-w-7xl items-center px-4 py-16 sm:px-8"
		>
			<div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-20">
				<ProductShowcase
					image={product.image_paths[0] ?? "/images/hero-water.png"}
					alt={product.name}
				/>
				<div className="max-w-xl">
					{translation && (
						<p className="text-gold font-sans text-xs font-medium tracking-[0.2em] uppercase">
							{translation}
						</p>
					)}
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
					{product.contents.length > 0 && (
						<div className="mt-6">
							<h3 className="font-serif text-xl">Contenido</h3>
							<ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 font-sans text-sm">
								{product.contents.map((content) => (
									<li key={content}>{content}</li>
								))}
							</ul>
						</div>
					)}
					{specs.length > 0 && (
						<dl className="border-border mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-5 sm:grid-cols-3">
							{specs.map((spec) => (
								<div key={spec.label}>
									<dt className="text-muted-foreground font-sans text-xs tracking-[0.15em] uppercase">
										{spec.label}
									</dt>
									<dd className="mt-1 font-sans text-sm">{spec.value}</dd>
								</div>
							))}
						</dl>
					)}
					<div className="border-border mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-serif text-4xl font-medium">
							{formatPrice(product.price_cents)}
						</p>
						<AddToCartButton product={product}>
							Añadir a la cesta
							<ArrowRight className="size-4" />
						</AddToCartButton>
					</div>
				</div>
			</div>
		</section>
	);
}
