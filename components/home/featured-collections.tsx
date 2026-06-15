import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { collections } from '@/lib/products'

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Colecciones</p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light md:text-5xl">
            Encuentra la edición hecha para tu camino
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-sm uppercase tracking-[0.2em] text-foreground underline-offset-8 hover:underline"
        >
          Ver todo
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?collection=${c.slug}`}
            className="group flex min-h-44 flex-col justify-between bg-card p-6 transition-colors hover:bg-secondary"
          >
            <ArrowUpRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div>
              <h3 className="font-serif text-2xl font-light leading-tight">{c.name}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
