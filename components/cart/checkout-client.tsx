"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Field = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  half?: boolean;
};

const contactFields: Field[] = [
  {
    id: "email",
    label: "Correo electrónico",
    type: "email",
    autoComplete: "email",
  },
  {
    id: "phone",
    label: "Teléfono",
    type: "tel",
    autoComplete: "tel",
  },
];

const shippingFields: Field[] = [
  { id: "firstName", label: "Nombre", autoComplete: "given-name", half: true },
  {
    id: "lastName",
    label: "Apellido",
    autoComplete: "family-name",
    half: true,
  },
  { id: "address", label: "Dirección", autoComplete: "street-address" },
  { id: "city", label: "Ciudad", autoComplete: "address-level2", half: true },
  {
    id: "state",
    label: "Estado / Provincia",
    autoComplete: "address-level1",
    half: true,
  },
  {
    id: "postal",
    label: "Código postal",
    autoComplete: "postal-code",
    half: true,
  },
  {
    id: "country",
    label: "País",
    autoComplete: "country-name",
    half: true,
  },
];

export function CheckoutClient() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6.5;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  async function handleSubmitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const shippingInfo = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postal: formData.get("postal") as string,
        country: formData.get("country") as string,
      };

      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          amount: total.toFixed(2),
          shipping: shipping.toFixed(2),
          tax: tax.toFixed(2),
          currency: "USD",
          cart_items: items,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.returnURL) {
        setError("No se pudo iniciar el pago. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      // Save cart and shipping info to sessionStorage before leaving the page
      sessionStorage.setItem("paypal_cart_backup", JSON.stringify(items));
      sessionStorage.setItem("paypal_shipping_backup", JSON.stringify(shippingInfo));

      window.location.href = data.returnURL;
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-foreground">
          Tu carrito está vacío
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Añade una Biblia a tu carrito antes de proceder al pago.
        </p>
        <Button
          render={<Link href="/shop" />}
          className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          Explorar la colección
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-foreground">Pago</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmitOrder} className="space-y-10">
          <Section title="Contacto" fields={contactFields} />
          <Section title="Dirección de envío" fields={shippingFields} />

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full rounded-full bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Redirigiendo a PayPal..." : `Pagar con PayPal — ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-serif text-xl text-foreground">
            Resumen del pedido
          </h2>
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
                  <span className="text-sm text-foreground">
                    {item.product.name}
                  </span>
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
  );
}

function Section({
  title,
  fields,
  note,
}: {
  title: string;
  fields: Field[];
  note?: string;
}) {
  return (
    <fieldset>
      <legend className="font-serif text-xl text-foreground">{title}</legend>
      {note ? (
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      ) : null}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className={field.half ? "col-span-1" : "col-span-2"}
          >
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-sm text-muted-foreground"
            >
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
  );
}
