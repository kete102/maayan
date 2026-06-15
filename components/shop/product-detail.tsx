'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import type { Product } from '@/lib/products'
import { getCollectionName } from '@/lib/products'
import { useCart } from '@/components/cart/cart-provider'
import { StarRating } from '@/components/star-rating'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, setIsOpen } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specs'>(
    'description',
  )

  // la galería usa la imagen del producto más ángulos reutilizados para variedad visual
  const gallery = [product.image, '/images/about-water.png', '/images/hero-water.png']
  const [activeImage, setActiveImage] = useState(product.image)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* galería */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(src)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`relative h-20 w-16 overflow-hidden rounded-sm border transition-colors ${
                  activeImage === src ? 'border-ocean' : 'border-border'
                }`}
              >
                <Image src={src || '/placeholder.svg'} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-sm bg-secondary">
            <Image
              src={activeImage || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* detalles */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {getCollectionName(product.collection)}
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <p className="mt-6 font-serif text-3xl">${product.price}</p>
          <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-y-3 border-y border-border py-6 text-sm">
            <dt className="text-muted-foreground">Traducción</dt>
            <dd className="text-right">{product.translation}</dd>
            <dt className="text-muted-foreground">Cubierta</dt>
            <dd className="text-right">{product.coverType}</dd>
            <dt className="text-muted-foreground">Idioma</dt>
            <dd className="text-right">{product.language}</dd>
            <dt className="text-muted-foreground">Edición</dt>
            <dd className="text-right">{product.edition}</dd>
          </dl>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
                className="px-3 py-3 hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
                className="px-3 py-3 hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              className="flex-1 bg-primary py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Añadir al Carrito
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              addItem(product, quantity)
              setIsOpen(true)
            }}
            className="mt-3 w-full border border-primary py-4 text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Comprar Ahora
          </button>

          <ul className="mt-8 space-y-3 text-sm font-light text-muted-foreground">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-ocean" /> Envío gratuito en compras superiores a $75
            </li>
            <li className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4 text-ocean" /> Devoluciones tranquilas en 30 días
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-ocean" /> Garantía de encuadernación de por vida
            </li>
          </ul>
        </div>
      </div>

      {/* pestañas */}
      <div className="mt-16 border-t border-border pt-10">
        <div className="flex flex-wrap gap-8 border-b border-border">
          {(['description', 'features', 'specs'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 pb-4 text-sm uppercase tracking-[0.2em] transition-colors ${
                activeTab === tab
                  ? 'border-gold text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'description' ? 'Descripción' : tab === 'features' ? 'Características' : 'Especificaciones'}
            </button>
          ))}
        </div>
        <div className="max-w-3xl py-8">
          {activeTab === 'description' && (
            <p className="text-pretty font-light leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}
          {activeTab === 'features' && (
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 font-light">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'specs' && (
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  )
}
