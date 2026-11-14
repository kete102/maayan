import { AboutIntro } from "@/components/home/about-intro";
import { Hero } from "@/components/home/hero";
import { LandingFooter } from "@/components/home/landing-footer";

export default function HomePage() {
	return (
		<>
			<Hero />
			<AboutIntro />
			<LandingFooter />
		</>
	);
}
