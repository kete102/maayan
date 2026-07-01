"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutCancelPage() {
  const { addItem } = useCart();

  useEffect(() => {
    const backup = sessionStorage.getItem("paypal_cart_backup");
    if (!backup) return;

    try {
      const items = JSON.parse(backup);
      if (Array.isArray(items)) {
        items.forEach((item) => addItem(item.product, item.quantity));
      }
    } catch {
      // Backup was malformed — silently ignore, cart stays empty
    } finally {
      sessionStorage.removeItem("paypal_cart_backup");
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <XCircle className="h-8 w-8" />
      </div>
      <h1 className="mt-8 font-serif text-4xl text-foreground">
        Pago cancelado
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        No se realizó ningún cargo. Tus artículos han sido restaurados en el
        carrito.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          render={<Link href="/checkout" />}
          className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          Intentar de nuevo
        </Button>
        <Button render={<Link href="/shop" />} variant="outline" className="rounded-full px-8">
          Seguir explorando
        </Button>
      </div>
    </div>
  );
}
