'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    subtotal,
    count,
  } = useCart()

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl font-medium">
            Tu Carrito{count > 0 && <span className="text-muted-foreground"> ({count})</span>}
          </h2>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar carrito">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-xl text-muted-foreground">
              Tu carrito está vacío.
            </p>
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
            >
              Explorar Biblias
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
                    <Image
                      src={item.product.image || '/placeholder.svg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-serif text-lg leading-tight hover:text-ocean"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Eliminar artículo"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {item.product.translation} · {item.product.coverType}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Disminuir cantidad"
                          className="px-2 py-1.5 hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="px-2 py-1.5 hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-serif text-lg">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-2xl">${subtotal}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Envío e impuestos calculados al finalizar la compra.
              </p>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="mt-5 flex w-full items-center justify-center bg-primary py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Proceder al Pago
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="mt-3 flex w-full items-center justify-center py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                Ver Carrito
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
