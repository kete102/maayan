import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { ProductDetail } from '@/components/shop/product-detail'
import { ProductReviews } from '@/components/shop/product-reviews'
import { ProductCard } from '@/components/product-card'
import {
  getProductBySlug,
  getRelatedProducts,
  getCollectionName,
  products,
} from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <SiteShell>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-2 px-4 pt-8 text-xs uppercase tracking-wide text-muted-foreground md:px-8"
      >
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/shop?collection=${product.collection}`}
          className="hover:text-foreground"
        >
          {getCollectionName(product.collection)}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <div className="bg-secondary/50">
        <ProductReviews product={product} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-balance font-serif text-4xl font-light">
          También te puede gustar
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
