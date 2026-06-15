"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

type Field = {
  id: string
  label: string
  type?: string
  autoComplete?: string
  half?: boolean
}

const contactFields: Field[] = [
  { id: "email", label: "Correo electrónico", type: "email", autoComplete: "email" },
]

const shippingFields: Field[] = [
  { id: "firstName", label: "Nombre", autoComplete: "given-name", half: true },
  { id: "lastName", label: "Apellido", autoComplete: "family-name", half: true },
  { id: "address", label: "Dirección", autoComplete: "street-address" },
  { id: "city", label: "Ciudad", autoComplete: "address-level2", half: true },
  { id: "postal", label: "Código postal", autoComplete: "postal-code", half: true },
]

const paymentFields: Field[] = [
  { id: "card", label: "Número de tarjeta", autoComplete: "cc-number" },
  { id: "expiry", label: "Vencimiento (MM/AA)", autoComplete: "cc-exp", half: true },
  { id: "cvc", label: "CVC", autoComplete: "cc-csc", half: true },
]

export function CheckoutClient() {
  const { items, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6.5
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clear()
    setPlaced(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-accent">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-8 font-serif text-4xl text-foreground">Gracias</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Tu pedido ha sido recibido. Que estas Escrituras sean un manantial de gracia en tu hogar.
          Se ha enviado una confirmación a tu bandeja de entrada.
        </p>
        <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
          <Link href="/shop">Seguir comprando</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-foreground">Tu carrito está vacío</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Añade una Biblia a tu carrito antes de proceder al pago.
        </p>
        <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
          <Link href="/shop">Explorar la colección</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-foreground">Pago</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="Contacto" fields={contactFields} />
          <Section title="Dirección de envío" fields={shippingFields} />
          <Section title="Pago" fields={paymentFields} note="Esta es una tienda de demostración. No se procesa ningún pago real." />
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
          >
            Realizar pedido — {formatPrice(total)}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-serif text-xl text-foreground">Resumen del pedido</h2>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between gap-2">
                  <span className="text-sm text-foreground">{item.product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Envío</dt>
              <dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Impuesto estimado</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium text-foreground">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}

function Section({ title, fields, note }: { title: string; fields: Field[]; note?: string }) {
  return (
    <fieldset>
      <legend className="font-serif text-xl text-foreground">{title}</legend>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.id} className={field.half ? "col-span-1" : "col-span-2"}>
            <label htmlFor={field.id} className="mb-1.5 block text-sm text-muted-foreground">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              required
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
        ))}
      </div>
    </fieldset>
  )
}
