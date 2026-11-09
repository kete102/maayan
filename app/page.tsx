import { Hero } from "@/components/home/hero";
import { ProductFeature } from "@/components/home/product-feature";
import { Logo } from "@/components/logo";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProduct } from "@/lib/products";
import { connection } from "next/server";

export default async function HomePage() {
	// Opt out of static prerendering: the product is read from Supabase at request time.
	await connection();
	const product = await getFeaturedProduct();

	return (
		<SiteShell>
			<Hero product={product ?? undefined} />
			{product ? (
				<ProductFeature product={product} />
			) : (
				<section
					id="biblia"
					className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-8"
				>
					<h2 className="font-serif text-3xl">Producto no disponible</h2>
					<p className="text-muted-foreground mt-3">
						Estamos preparando nuestra próxima edición.
					</p>
				</section>
			)}
		</SiteShell>
	);
}
