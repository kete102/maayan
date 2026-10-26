import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export const metadata = {
	title: "Nuestra Historia — Maayan",
	description:
		"El significado de Maayan como fuente de agua viva, y nuestra misión de ayudar a las personas a conectarse con la Palabra de Dios.",
};

const pillars = [
	{
		title: "La Palabra por encima de todo",
		body: "La Biblia es el centro de todo lo que hacemos. Nuestro deseo es que cada persona se acerque a Dios a través de Su Palabra y descubra la verdad, esperanza y vida que contiene.",
	},
	{
		title: "Belleza con propósito",
		body: "Creemos que la belleza puede abrir puertas y despertar interés. Cada diseño busca reflejar la armonía, creatividad y excelencia presentes en la creación de Dios.",
	},
	{
		title: "Artesanía y dedicación",
		body: "Cada Biblia es confeccionada a mano con materiales cuidadosamente seleccionados, prestando atención a cada detalle para crear piezas únicas y especiales.",
	},
	{
		title: "Excelencia para la gloria de Dios",
		body: "Buscamos la excelencia en todo lo que hacemos, porque creemos que aquello que representa la Palabra de Dios merece ser tratado con respeto, cuidado y amor.",
	},
	{
		title: "Alcanzar corazones",
		body: "Nuestro anhelo es que cada Biblia pueda convertirse en una invitación a abrir sus páginas, ya sea para quien conoce a Dios desde hace años o para quien se acerca a ellas por primera vez.",
	},
];

export default function AboutPage() {
	return (
		<SiteShell>
			{/* héroe */}
			<section
				data-header-theme="dark"
				className="dark-surface relative isolate -mt-20 flex min-h-[70dvh] items-center overflow-hidden pt-20 md:-mt-24 md:pt-24"
			>
				<Image
					src="/images/canyon-story.webp"
					alt=""
					fill
					priority
					sizes="100vw"
					className="-z-20 object-cover object-center"
				/>
				<div
					className="from-canyon-950/80 via-canyon-950/60 to-canyon-950/40 absolute inset-0 -z-10 bg-gradient-to-b"
					aria-hidden="true"
				/>
				<div
					className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent via-[#d2b9a2]/60 to-[#d2b9a2] md:h-64"
					aria-hidden="true"
				/>
				<div className="mx-auto w-full max-w-3xl px-4 pt-16 pb-44 text-center md:px-8 md:pb-56">
					<p className="text-gold font-sans text-xs font-medium tracking-[0.3em] uppercase">
						Nuestra Historia
					</p>
					<h1 className="mt-5 font-serif text-5xl leading-tight font-normal text-balance md:text-7xl">
						Un manantial de agua viva
					</h1>
					<p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty md:text-lg">
						El nombre que elegimos lleva el corazón de todo lo que hacemos.
					</p>
				</div>
			</section>

			{/* significado */}
			<Reveal className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-28">
				<p className="text-gold text-xs tracking-[0.3em] uppercase">
					El Significado de Maayan
				</p>
				<p className="mt-8 font-serif text-2xl leading-relaxed text-pretty md:text-3xl">
					En hebreo, <span className="italic">Maayan</span> (מַעְיָן) significa{" "}
					<span className="italic">manantial</span> — una fuente de agua que
					brota constantemente y da vida.
				</p>
				<p className="text-muted-foreground mt-8 leading-relaxed text-pretty">
					En la Biblia, los manantiales simbolizan{" "}
					<span className="text-foreground italic">
						la provisión de Dios, la renovación espiritual, la esperanza y la
						salvación.
					</span>{" "}
					El profeta Isaías escribió:
				</p>
				<blockquote className="border-gold text-foreground mx-auto mt-6 max-w-xl border-l-2 pl-6 text-left font-serif text-xl leading-relaxed italic md:text-2xl">
					&ldquo;Sacaréis con gozo aguas de las fuentes de la salvación&rdquo;
				</blockquote>
				<p className="text-gold mt-2 pl-6 text-left text-xs tracking-[0.3em] uppercase">
					Isaías 12:3
				</p>
				<p className="text-muted-foreground mt-8 leading-relaxed text-pretty">
					Esa imagen inspiró profundamente nuestra visión. Creemos que{" "}
					<span className="text-foreground italic">
						la Palabra de Dios es un manantial inagotable
					</span>{" "}
					de vida, verdad y esperanza, capaz de transformar corazones y
					acompañar a las personas en cada etapa de su camino. Por eso elegimos
					el nombre Maayan: porque deseamos que cada Biblia conduzca a quienes
					la reciben hacia esa fuente eterna.
				</p>
			</Reveal>

			{/* comienzos */}
			<Reveal className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
				<p className="text-gold text-xs tracking-[0.3em] uppercase">
					Nuestros Comienzos
				</p>
				<h2 className="mt-3 font-serif text-4xl leading-tight text-balance md:text-5xl">
					Un regalo que se convirtió en vocación
				</h2>
				<p className="text-muted-foreground mt-8 leading-relaxed text-pretty">
					Nuestra historia comenzó de una manera muy sencilla y personal.
					Mientras preparábamos{" "}
					<span className="text-foreground italic">nuestra boda</span>, surgió
					el deseo de regalar Biblias a nuestros invitados. Sin embargo, no
					queríamos entregar una Biblia cualquiera. Soñábamos con crear algo
					especial — una pieza que reflejara{" "}
					<span className="text-foreground italic">
						la belleza, el cuidado y la excelencia
					</span>{" "}
					con los que Dios hace todas las cosas.
				</p>
				<div className="my-8 flex items-center gap-4">
					<div className="bg-border h-px flex-1" />
					<span className="text-gold text-xs tracking-widest">✦</span>
					<div className="bg-border h-px flex-1" />
				</div>
				<p className="text-muted-foreground leading-relaxed text-pretty">
					Así nacieron nuestras Biblias artesanales. Cada una es confeccionada{" "}
					<span className="text-foreground italic">
						a mano con telas cuidadosamente seleccionadas
					</span>{" "}
					y acabados únicos, poniendo amor y dedicación en cada detalle. No
					buscamos embellecer únicamente un libro, sino honrar el tesoro que
					guarda en su interior:{" "}
					<span className="text-foreground italic">la Palabra de Dios.</span>
				</p>
			</Reveal>

			{/* misión */}
			<Reveal className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
				<p className="text-gold text-xs tracking-[0.3em] uppercase">
					Nuestra Misión
				</p>
				<h2 className="mt-3 font-serif text-4xl leading-tight text-balance md:text-5xl">
					Belleza que abre el corazón
				</h2>
				<p className="text-muted-foreground mt-6 leading-relaxed text-pretty">
					Creemos que la belleza tiene la capacidad de{" "}
					<span className="text-foreground italic">
						captar la atención y abrir el corazón.
					</span>{" "}
					Por eso diseñamos Biblias que inspiran a ser tomadas, abiertas y
					leídas. Queremos que cada creación sea un regalo significativo, una
					expresión de fe y reverencia, y una invitación a descubrir el mensaje
					que transforma vidas.
				</p>
				<p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
					En Maayan unimos{" "}
					<span className="text-foreground italic">
						fe, artesanía y elegancia
					</span>{" "}
					con un propósito: que el exterior refleje, aunque sea de forma
					humilde, la grandeza del mensaje que contiene. Porque si la Biblia es
					un manantial de vida, queremos que cada una de nuestras creaciones{" "}
					<span className="text-foreground italic">
						invite a acercarse a sus aguas.
					</span>
				</p>
				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "solid", size: "hero" }),
						"mt-8"
					)}
				>
					Volver al inicio
				</Link>
			</Reveal>

			{/* pilares */}
			<Reveal className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
				<p className="text-gold text-xs tracking-[0.3em] uppercase">
					Lo que nos guía
				</p>
				<h2 className="mt-3 font-serif text-4xl leading-tight text-balance md:text-5xl">
					Nuestros pilares
				</h2>
				<div className="mt-12">
					{pillars.map((pilar) => (
						<div
							key={pilar.title}
							className="border-border border-t py-8 last:border-b"
						>
							<div>
								<h3 className="text-foreground font-serif text-xl md:text-2xl">
									{pilar.title}
								</h3>
								<p className="text-muted-foreground mt-3 leading-relaxed">
									{pilar.body}
								</p>
							</div>
						</div>
					))}
				</div>
			</Reveal>
		</SiteShell>
	);
}
