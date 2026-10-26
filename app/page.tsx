import { Hero } from "@/components/home/hero";
import { ProductFeature } from "@/components/home/product-feature";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
	return (
		<SiteShell>
			<Hero />
			<ProductFeature />
		</SiteShell>
	);
}
