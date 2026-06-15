import { SiteShell } from "@/components/site-shell";
import { ShopClient } from "@/components/shop/shop-client";
import { WaveDivider } from "@/components/wave-divider";
import { collections } from "@/lib/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const valid = collections.some((c) => c.slug === collection);
  const active = valid ? collection : undefined;
  const activeName = collections.find((c) => c.slug === active)?.name;

  return (
    <SiteShell>
      <div className="relative">
        <section className="relative bg-primary py-16 text-primary-foreground md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              La Colección
            </p>
            <h1 className="mt-3 text-balance font-serif text-5xl font-light md:text-6xl">
              {activeName ?? "Todas las Biblias"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty font-light leading-relaxed text-primary-foreground/75">
              Cada edición es elegida para ayudarte a sacar del manantial de las
              Escrituras. Encuentra la que está hecha para tu camino.
            </p>
          </div>
        </section>
        <WaveDivider className="absolute bottom-0 left-0 right-0 text-background" />
      </div>
      <ShopClient initialCollection={active} />
    </SiteShell>
  );
}
