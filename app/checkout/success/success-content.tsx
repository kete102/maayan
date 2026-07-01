"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CaptureStatus = "loading" | "success" | "error";

type OrderDetails = {
  orderId: string;
  transactionId: string;
  amount: string;
  currency: string;
  payerName: string;
  payerEmail: string;
};

export function CheckoutSuccessContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const { items, clearCart } = useCart();

  const [status, setStatus] = useState<CaptureStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const hasCaptured = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No se encontró el ID de la orden.");
      return;
    }

    // Guard against double capture in React strict mode
    if (hasCaptured.current) return;
    hasCaptured.current = true;

    // Read cart and shipping backups from sessionStorage
    const cartBackup = sessionStorage.getItem("paypal_cart_backup");
    const shippingBackup = sessionStorage.getItem("paypal_shipping_backup");
    const cartItems = cartBackup ? JSON.parse(cartBackup) : items;
    const shippingInfo = shippingBackup ? JSON.parse(shippingBackup) : {};

    async function captureOrder() {
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            orderID: token,
            cartItems,
            shippingName: `${shippingInfo.firstName ?? ""} ${shippingInfo.lastName ?? ""}`.trim(),
            shippingEmail: shippingInfo.email ?? "",
            shippingPhone: shippingInfo.phone ?? "",
            shippingAddress: shippingInfo.address ?? "",
            shippingCity: shippingInfo.city ?? "",
            shippingState: shippingInfo.state ?? "",
            shippingPostal: shippingInfo.postal ?? "",
            shippingCountry: shippingInfo.country ?? "",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error ?? "Error al capturar el pago.");
          return;
        }

        // Extract order details from the PayPal capture response
        const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
        setOrderDetails({
          orderId: data.orderId ?? "",
          transactionId: capture?.id ?? token,
          amount: capture?.amount?.value ?? "—",
          currency: capture?.amount?.currency_code ?? "USD",
          payerName: `${shippingInfo.firstName ?? ""} ${shippingInfo.lastName ?? ""}`.trim()
            || `${data.payer?.name?.given_name ?? ""} ${data.payer?.name?.surname ?? ""}`.trim(),
          payerEmail: shippingInfo.email || data.payer?.email_address || "—",
        });

        sessionStorage.removeItem("paypal_cart_backup");
        sessionStorage.removeItem("paypal_shipping_backup");
        clearCart();
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage("Ocurrió un error inesperado.");
      }
    }

    captureOrder();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-muted-foreground">Confirmando tu pago...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-foreground">Algo salió mal</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {errorMessage}
        </p>
        <Button
          render={<Link href="/checkout" />}
          className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          Volver al pago
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-accent">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="mt-8 font-serif text-4xl text-foreground">Gracias</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Tu pedido ha sido recibido. Te hemos enviado un correo de confirmación.
        Que estas Escrituras sean un manantial de gracia en tu hogar.
      </p>

      {orderDetails && (
        <dl className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-6 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Número de pedido</dt>
            <dd className="font-mono text-xs text-foreground">
              {orderDetails.orderId.slice(0, 8).toUpperCase()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total cobrado</dt>
            <dd className="text-foreground">
              {Number(orderDetails.amount).toLocaleString("es-ES", {
                style: "currency",
                currency: orderDetails.currency,
              })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Nombre</dt>
            <dd className="text-foreground">{orderDetails.payerName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Correo</dt>
            <dd className="text-foreground">{orderDetails.payerEmail}</dd>
          </div>
        </dl>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {orderDetails?.orderId && (
          <Button
            render={<Link href={`/order/${orderDetails.orderId}`} />}
            variant="outline"
            className="rounded-full px-8"
          >
            Ver mi pedido
          </Button>
        )}
        <Button
          render={<Link href="/shop" />}
          className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          Seguir comprando
        </Button>
      </div>
    </div>
  );
}
