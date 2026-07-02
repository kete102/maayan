import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <p className="font-serif text-8xl font-light text-muted-foreground/30">
          404
        </p>
        <h1 className="mt-6 font-serif text-4xl text-foreground">
          Página no encontrada
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          La página que buscas no existe o ha sido movida. Vuelve a la tienda
          para continuar explorando nuestra colección.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link href="/shop" />}
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            Explorar la colección
          </Button>
          <Button
            render={<Link href="/" />}
            variant="outline"
            className="rounded-full px-8"
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
