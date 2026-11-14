import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="dark-surface relative isolate flex h-280 items-start overflow-hidden">
			<Image
				src="/images/canyon-hero.webp"
				alt=""
				fill
				priority
				sizes="100vw"
				className="-z-20 object-cover object-center"
			/>
			<div
				className="from-ink/10 via-ink/30 to-ink/40 absolute inset-0 -z-10 bg-linear-to-b"
				aria-hidden="true"
			/>
			<div className="mx-auto max-w-7xl px-4 pt-[26dvh] pb-16 text-center sm:px-8">
				<p className="type-body-sm font-semibold tracking-[0.075rem] text-[#EFD998]">
					Maayan · Escrituras que fluyen
				</p>
				<h1 className="type-display mt-4">La Palabra, fuente de agua viva.</h1>
				<p className="type-body-lg text-foreground/90 mx-auto mt-6 max-w-5xl">
					Biblias artesanales creadas para honrar la belleza de la Palabra de
					Dios.
				</p>
				<div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
					<Button
						variant="solid"
						size="hero"
						render={<a href="#biblia" />}
					>
						Descubrir la edición
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
