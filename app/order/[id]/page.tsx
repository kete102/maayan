import { supabase, type Order } from "@/lib/supabase";
import { formatPrice } from "@/lib/products";
import { CheckCircle2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single<Order>();

  if (error || !order) {
    notFound();
  }

  const createdAt = new Date(order.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Tu pedido</h1>
          <p className="text-sm text-muted-foreground">Realizado el {createdAt}</p>
        </div>
      </div>

      {/* Order meta */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-6 text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Número de pedido</span>
          <span className="font-mono text-xs text-foreground">
            {order.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estado</span>
          <span className="text-foreground capitalize">{order.status.toLowerCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Transacción PayPal</span>
          <span className="font-mono text-xs text-foreground">
            {order.paypal_transaction_id}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Correo</span>
          <span className="text-foreground">{order.payer_email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Envío a</span>
          <span className="text-foreground">
            {order.shipping_city}, {order.shipping_postal}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h2 className="mb-4 font-serif text-xl text-foreground">
          Artículos
        </h2>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="flex justify-between rounded-2xl border border-border bg-card px-6 py-4 text-base font-medium text-foreground">
        <span>Total cobrado</span>
        <span>{formatPrice(order.amount)}</span>
      </div>

      {/* Back link */}
      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Seguir explorando la colección
        </Link>
      </div>
    </div>
  );
}
