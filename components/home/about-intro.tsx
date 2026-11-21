import { RevealItem } from "@/components/motion/reveal-item";

export function AboutIntro() {
	return (
		<section
			id="about"
			className="relative isolate scroll-mt-8 overflow-hidden px-4 py-28 md:px-8 md:py-40"
		>
			{/* Hebrew "Maayan" (spring) as a decorative watermark. */}
			<span
				lang="he"
				dir="rtl"
				aria-hidden="true"
				className="text-truffle/5 pointer-events-none absolute top-[38%] left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(10rem,32vw,28rem)] leading-none whitespace-nowrap select-none"
			>
				מַעְיָן
			</span>

			<div className="mx-auto max-w-2xl text-center">
				<RevealItem>
					<p className="type-overline text-muted-foreground text-sm">
						Quiénes somos
					</p>
					<h2 className="type-h2 mt-6 md:text-5xl">
						Todo empieza con una idea
					</h2>
					<div
						className="bg-accent/70 mx-auto mt-8 h-px w-14"
						aria-hidden="true"
					/>
				</RevealItem>

				<RevealItem delay={0.1}>
					<p className="type-body-lg text-muted-foreground mt-10 text-pretty">
						Creemos que la belleza puede despertar algo en nosotros.
					</p>
				</RevealItem>

				<RevealItem delay={0.15}>
					<blockquote className="text-foreground mx-auto mt-12 mb-10 max-w-[40rem] font-serif text-[1.75rem] leading-normal font-light text-balance italic md:text-[2.75rem]">
						&ldquo;Una mirada, una textura, un pequeño detalle pueden
						convertirse en el comienzo de algo mucho más grande.&rdquo;
					</blockquote>
				</RevealItem>

				<RevealItem
					delay={0.1}
					className="space-y-6"
				>
					<p className="type-body-lg text-muted-foreground text-pretty">
						<span className="text-foreground font-serif tracking-widest">
							MAAYAN
						</span>{" "}
						nace de ese pensamiento: de querer acercar la belleza a aquello que
						realmente importa.
					</p>
					<p className="type-body-lg text-muted-foreground text-pretty">
						De crear con intención, cuidar los detalles y encontrar nuevas
						formas de despertar curiosidad por{" "}
						<span className="text-foreground">la Palabra de Dios</span>.
					</p>
				</RevealItem>

				<RevealItem delay={0.15}>
					<div
						className="bg-accent/60 mx-auto mt-14 h-px w-8"
						aria-hidden="true"
					/>
					<p className="text-foreground mt-8 font-serif text-xl leading-relaxed text-balance md:text-2xl">
						Porque a veces, acercarse a algo importante empieza con algo tan
						sencillo como descubrir su belleza.
					</p>
				</RevealItem>
			</div>
		</section>
	);
}
