import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function FeaturedProducts() {
  const featured = products.slice(0, 4)
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Destacados</p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-light md:text-5xl">
              Biblias Seleccionadas
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-[0.2em] text-foreground underline-offset-8 hover:underline"
          >
            Ver todo
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
