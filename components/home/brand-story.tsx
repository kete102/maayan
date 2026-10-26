import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
	return (
		<section className="relative isolate overflow-hidden py-20 md:py-32">
			<div
				className="absolute inset-0 -z-20 bg-cover bg-center"
				style={{ backgroundImage: "url('/images/canyon-story.webp')" }}
				aria-hidden="true"
			/>
			<div className="bg-canyon-950/80 absolute inset-0 -z-10" />
			<div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
				<div className="glass order-last flex min-h-72 flex-col justify-between p-8 md:p-12 lg:order-first">
					<p
						className="text-gold font-serif text-6xl leading-none md:text-7xl"
						aria-hidden="true"
					>
						מַעְיָן
					</p>
					<p className="text-canyon-50 max-w-sm font-serif text-2xl leading-snug md:text-3xl">
						Una fuente de vida que vuelve a comenzar cada día.
					</p>
				</div>
				<div>
					<p
						className="text-gold font-serif text-6xl leading-none font-normal md:text-7xl lg:text-8xl"
						aria-hidden="true"
					>
						מַעְיָן
					</p>
					<p className="text-canyon-50-80 mt-1 font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase">
						Manantial · Fuente de vida
					</p>
					<h2 className="text-canyon-50 mt-8 font-serif text-3xl leading-snug font-normal md:text-4xl">
						Fe hecha arte, entregada para toda una vida
					</h2>
					<div className="text-canyon-50-85 mt-6 space-y-4 font-sans text-sm leading-relaxed font-light">
						<p>
							Maayan nace del deseo de llevar la Palabra de Dios como un
							manantial de vida, esperanza y salvación.
						</p>
						<p>
							Creamos Biblias artesanales encuadernadas a mano con excelencia,
							amor y atención a cada detalle. Cada pieza une fe, belleza y
							elegancia para honrar el mensaje más valioso que existe.
						</p>
					</div>
					<Link
						href="/about"
						className="group text-gold hover:text-canyon-50 mt-8 inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors"
					>
						Nuestra historia
						<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
