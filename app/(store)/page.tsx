import { AboutIntro } from "@/components/home/about-intro";
import { Hero } from "@/components/home/hero";
import { ViewTransition } from "react";

export default function HomePage() {
	return (
		<ViewTransition
			enter={{ "nav-forward": "nav-forward", default: "none" }}
			exit={{ "nav-forward": "nav-forward", default: "none" }}
			default="none"
		>
			<main className="flex-1">
				<Hero />
				<AboutIntro />
			</main>
		</ViewTransition>
	);
}
