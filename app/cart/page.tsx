import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
	title: "Tu Carrito — Maayan",
	description: "Revisa las Escrituras en tu carrito antes de pagar.",
};

export default function CartPage() {
	return <CartPageClient />;
}
