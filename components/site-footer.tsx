import Link from "next/link";
import { Logo } from "@/components/logo";
import { WaveDivider } from "@/components/wave-divider";

const footerNav = [
  {
    title: "Tienda",
    links: [
      { href: "/shop?collection=study-bibles", label: "Biblias de Estudio" },
      {
        href: "/shop?collection=journaling-bibles",
        label: "Biblias de Diario",
      },
      { href: "/shop?collection=large-print-bibles", label: "Letra Grande" },
      { href: "/shop?collection=gift-editions", label: "Ediciones de Regalo" },
      { href: "/shop?collection=premium-leather", label: "Cuero Premium" },
    ],
  },
  {
    title: "Maayan",
    links: [
      { href: "/about", label: "Nuestra Historia" },
      { href: "/shop", label: "Todas las Biblias" },
      { href: "/cart", label: "Carrito" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { href: "/about", label: "Envíos y Devoluciones" },
      { href: "/about", label: "Contacto" },
      { href: "/about", label: "Preguntas Frecuentes" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <WaveDivider className="absolute -top-px left-0 right-0 -translate-y-full text-primary" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo className="text-primary-foreground [&_span]:text-primary-foreground" />
            <p className="mt-4 text-sm font-light leading-relaxed text-primary-foreground/70">
              Las Escrituras presentadas como una fuente de agua viva. Biblias
              premium para toda una vida de devoción.
            </p>
          </div>
          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg font-medium">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-xs font-light text-primary-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Maayan. Las Escrituras que Fluyen.</p>
          <p className="font-serif text-sm italic text-primary-foreground/60">
            &ldquo;Con alegría sacaréis aguas de las fuentes de la
            salvación.&rdquo; — Isaías 12:3
          </p>
        </div>
      </div>
    </footer>
  );
}
