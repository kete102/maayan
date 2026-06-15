'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'

export function CartPageClient() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-5 px-4 text-center md:px-8">
        <h1 className="font-serif text-4xl font-light">Tu carrito está vacío</h1>
        <p className="max-w-md font-light text-muted-foreground">
          Aún no se han añadido Biblias. Cuando encuentres la edición para tu camino,
          descansará aquí.
        </p>
        <Link
          href="/shop"
          className="bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Explorar Biblias
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="font-serif text-4xl font-light md:text-5xl">Tu Carrito</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.product.id} className="flex gap-5 py-6">
              <Link
                href={`/product/${item.product.slug}`}
                className="relative h-32 w-24 shrink-0 overflow-hidden rounded-sm bg-secondary"
              >
                <Image
                  src={item.product.image || '/placeholder.svg'}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif text-xl leading-tight hover:text-ocean"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {item.product.translation} · {item.product.coverType} · {item.product.edition}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Eliminar artículo"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                      className="px-2.5 py-2 hover:bg-secondary"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                      className="px-2.5 py-2 hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-serif text-xl">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-border bg-card p-8">
          <h2 className="font-serif text-2xl font-light">Resumen del Pedido</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío</dt>
              <dd>{shipping === 0 ? 'Gratuito' : `$${shipping}`}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-4 font-serif text-xl">
              <dt>Total</dt>
              <dd>${total}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-8 flex w-full items-center justify-center bg-primary py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pagar
          </Link>
          <Link
            href="/shop"
            className="mt-3 flex w-full items-center justify-center py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            Seguir Comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}
