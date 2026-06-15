import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { CheckoutClient } from "@/components/cart/checkout-client"

export const metadata: Metadata = {
  title: "Pago — Maayan",
  description: "Completa tu pedido de Escrituras premium.",
}

export default function CheckoutPage() {
  return (
    <SiteShell>
      <CheckoutClient />
    </SiteShell>
  )
}
