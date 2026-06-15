import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { WaveDivider } from "@/components/wave-divider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Nuestra Historia — Maayan",
  description:
    "El significado de Maayan como fuente de agua viva, y nuestra misión de ayudar a las personas a conectarse con la Palabra de Dios.",
};

const pillars = [
  {
    number: "01",
    title: "La Palabra por encima de todo",
    body: "La Biblia es el centro de todo lo que hacemos. Nuestro deseo es que cada persona se acerque a Dios a través de Su Palabra y descubra la verdad, esperanza y vida que contiene.",
  },
  {
    number: "02",
    title: "Belleza con propósito",
    body: "Creemos que la belleza puede abrir puertas y despertar interés. Cada diseño busca reflejar la armonía, creatividad y excelencia presentes en la creación de Dios.",
  },
  {
    number: "03",
    title: "Artesanía y dedicación",
    body: "Cada Biblia es confeccionada a mano con materiales cuidadosamente seleccionados, prestando atención a cada detalle para crear piezas únicas y especiales.",
  },
  {
    number: "04",
    title: "Excelencia para la gloria de Dios",
    body: "Buscamos la excelencia en todo lo que hacemos, porque creemos que aquello que representa la Palabra de Dios merece ser tratado con respeto, cuidado y amor.",
  },
  {
    number: "05",
    title: "Alcanzar corazones",
    body: "Nuestro anhelo es que cada Biblia pueda convertirse en una invitación a abrir sus páginas, ya sea para quien conoce a Dios desde hace años o para quien se acerca a ellas por primera vez.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      {/* héroe */}
      <div className="relative">
        <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden">
          <Image
            src="/images/about-water.png"
            alt="Un manantial de agua dulce fluyendo sobre piedras lisas"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative mx-auto w-full max-w-3xl px-4 text-center text-primary-foreground md:px-8">
            <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/80">
              Nuestra Historia
            </p>
            <h1 className="mt-5 text-balance font-serif text-5xl font-light leading-tight md:text-7xl">
              Un manantial de agua viva
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty font-light leading-relaxed text-primary-foreground/85">
              El nombre que elegimos lleva el corazón de todo lo que hacemos.
            </p>
          </div>
        </section>
        <WaveDivider className="absolute bottom-0 left-0 right-0 text-background" />
      </div>

      {/* significado */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          El Significado de Maayan
        </p>
        <p className="mt-8 text-pretty font-serif text-2xl font-light leading-relaxed md:text-3xl">
          En hebreo, <span className="italic">Maayan</span> (מַעְיָן) significa{" "}
          <span className="italic">manantial</span> — una fuente de agua que
          brota constantemente y da vida.
        </p>
        <p className="mt-8 text-pretty font-light leading-relaxed text-muted-foreground">
          En la Biblia, los manantiales simbolizan{" "}
          <span className="italic text-foreground">
            la provisión de Dios, la renovación espiritual, la esperanza y la
            salvación.
          </span>{" "}
          El profeta Isaías escribió:
        </p>
        <blockquote className="mx-auto mt-6 max-w-xl border-l-2 border-gold pl-6 text-left font-serif text-xl font-light italic leading-relaxed text-foreground md:text-2xl">
          &ldquo;Sacaréis con gozo aguas de las fuentes de la salvación&rdquo;
        </blockquote>
        <p className="mt-2 pl-6 text-left text-xs uppercase tracking-[0.3em] text-gold">
          Isaías 12:3
        </p>
        <p className="mt-8 text-pretty font-light leading-relaxed text-muted-foreground">
          Esa imagen inspiró profundamente nuestra visión. Creemos que{" "}
          <span className="italic text-foreground">
            la Palabra de Dios es un manantial inagotable
          </span>{" "}
          de vida, verdad y esperanza, capaz de transformar corazones y
          acompañar a las personas en cada etapa de su camino. Por eso elegimos
          el nombre Maayan: porque deseamos que cada Biblia conduzca a quienes
          la reciben hacia esa fuente eterna.
        </p>
      </section>

      {/* comienzos */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Nuestros Comienzos
        </p>
        <h2 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
          Un regalo que se convirtió en vocación
        </h2>
        <p className="mt-8 text-pretty font-light leading-relaxed text-muted-foreground">
          Nuestra historia comenzó de una manera muy sencilla y personal.
          Mientras preparábamos{" "}
          <span className="italic text-foreground">nuestra boda</span>, surgió
          el deseo de regalar Biblias a nuestros invitados. Sin embargo, no
          queríamos entregar una Biblia cualquiera. Soñábamos con crear algo
          especial — una pieza que reflejara{" "}
          <span className="italic text-foreground">
            la belleza, el cuidado y la excelencia
          </span>{" "}
          con los que Dios hace todas las cosas.
        </p>
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs tracking-widest text-gold">✦</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-pretty font-light leading-relaxed text-muted-foreground">
          Así nacieron nuestras Biblias artesanales. Cada una es confeccionada{" "}
          <span className="italic text-foreground">
            a mano con telas cuidadosamente seleccionadas
          </span>{" "}
          y acabados únicos, poniendo amor y dedicación en cada detalle. No
          buscamos embellecer únicamente un libro, sino honrar el tesoro que
          guarda en su interior:{" "}
          <span className="italic text-foreground">la Palabra de Dios.</span>
        </p>
      </section>

      {/* misión */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Nuestra Misión
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
              Belleza que abre el corazón
            </h2>
            <p className="mt-6 text-pretty font-light leading-relaxed text-muted-foreground">
              Creemos que la belleza tiene la capacidad de{" "}
              <span className="italic text-foreground">
                captar la atención y abrir el corazón.
              </span>{" "}
              Por eso diseñamos Biblias que inspiran a ser tomadas, abiertas y
              leídas. Queremos que cada creación sea un regalo significativo,
              una expresión de fe y reverencia, y una invitación a descubrir el
              mensaje que transforma vidas.
            </p>
            <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
              En Maayan unimos{" "}
              <span className="italic text-foreground">
                fe, artesanía y elegancia
              </span>{" "}
              con un propósito: que el exterior refleje, aunque sea de forma
              humilde, la grandeza del mensaje que contiene. Porque si la Biblia
              es un manantial de vida, queremos que cada una de nuestras
              creaciones{" "}
              <span className="italic text-foreground">
                invite a acercarse a sus aguas.
              </span>
            </p>
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "hero" }),
                "mt-8",
              )}
            >
              Explorar nuestras Biblias
            </Link>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src="/images/hero-water.png"
              alt="Agua tranquila rizando al amanecer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* pilares */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Lo que nos guía
        </p>
        <h2 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
          Nuestros pilares
        </h2>
        <div className="mt-12">
          {pillars.map((pilar) => (
            <div
              key={pilar.number}
              className="grid grid-cols-[56px_1fr] gap-6 border-t border-border py-8 last:border-b"
            >
              <span className="font-serif text-3xl font-light text-gold/50 md:text-4xl">
                {pilar.number}
              </span>
              <div>
                <h3 className="font-serif text-xl font-light uppercase tracking-widest text-foreground md:text-2xl">
                  {pilar.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-muted-foreground">
                  {pilar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
