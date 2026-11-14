import { AboutIntro } from "@/components/home/about-intro";
import { Hero } from "@/components/home/hero";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
	return (
		<>
			<Hero />
			<AboutIntro />
			<SiteFooter />
		</>
	);
}
