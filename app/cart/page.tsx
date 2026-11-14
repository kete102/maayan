import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";
import { requireLaunched } from "@/lib/require-launched";

export const metadata: Metadata = {
	title: "Tu Carrito — Maayan",
	description: "Revisa las Escrituras en tu carrito antes de pagar.",
};

export default async function CartPage() {
	// CartProvider is not mounted during the pre-launch landing.
	await requireLaunched();
	return <CartPageClient />;
}
