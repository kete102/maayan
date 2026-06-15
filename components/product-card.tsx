'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Product } from '@/lib/products'
import { getCollectionName } from '@/lib/products'
import { useCart } from '@/components/cart/cart-provider'
import { StarRating } from '@/components/star-rating'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-secondary"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-background/85 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-foreground/80 backdrop-blur-sm">
          {getCollectionName(product.collection)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
          aria-label={`Añadir ${product.name} al carrito`}
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 hover:bg-gold hover:text-primary group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <span>{product.translation}</span>
          <span aria-hidden="true">·</span>
          <span>{product.edition}</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-serif text-xl leading-snug transition-colors hover:text-ocean">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1">
          <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm font-light text-muted-foreground">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-serif text-xl">${product.price}</p>
      </div>
    </article>
  )
}
