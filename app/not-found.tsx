import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<SiteShell>
			<div className="mx-auto max-w-xl px-4 py-32 text-center">
				<p className="text-muted-foreground/30 font-serif text-8xl font-light">
					404
				</p>
				<h1 className="text-foreground mt-6 font-serif text-4xl">
					Página no encontrada
				</h1>
				<p className="text-muted-foreground mt-4 leading-relaxed">
					La página que buscas no existe o ha sido movida. Vuelve a la tienda
					para continuar explorando nuestra colección.
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button
						render={<Link href="/" />}
						className="px-8"
					>
						Explorar la colección
					</Button>
					<Button
						render={<Link href="/" />}
						variant="outline"
						className="px-8"
					>
						Ir al inicio
					</Button>
				</div>
			</div>
		</SiteShell>
	);
}
