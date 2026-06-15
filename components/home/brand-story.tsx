import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Nuestro Significado
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
            Maayan — Fe hecha arte
          </h2>
          <p className="mt-6 text-pretty font-light leading-relaxed text-muted-foreground">
            Maayan nace del deseo de llevar la Palabra de Dios como{" "}
            <span className="italic text-foreground">
              un manantial de vida, esperanza y salvación.
            </span>
          </p>
          <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
            Creamos Biblias artesanales únicas,{" "}
            <span className="italic text-foreground">
              elaboradas a mano con excelencia, amor y atención a cada detalle.
            </span>
          </p>
          <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
            Cada pieza une{" "}
            <span className="italic text-foreground">
              fe, belleza y elegancia
            </span>{" "}
            para honrar el mensaje más valioso que existe.
          </p>
          {/* <div className="my-6 flex items-center gap-4"> */}
          {/*   <div className="h-px flex-1 bg-border" /> */}
          {/*   <span className="text-xs uppercase tracking-[0.3em] text-gold"> */}
          {/*     ✦ */}
          {/*   </span> */}
          {/*   <div className="h-px flex-1 bg-border" /> */}
          {/* </div> */}
          <Link
            href="/about"
            className="mt-6 inline-flex items-center border-b border-foreground pb-1 text-sm uppercase tracking-[0.2em] text-foreground"
          >
            Lee nuestra historia
          </Link>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-sm">
          <Image
            src="/images/about-water.png"
            alt="Un manantial de agua dulce fluyendo sobre piedras lisas"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
