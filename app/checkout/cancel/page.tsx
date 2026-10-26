"use client";

import { useCart } from "@/components/cart/cart-provider";
import { SiteShell } from "@/components/site-shell";
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
			sessionStorage.removeItem("paypal_shipping_backup");
		}
	}, []);

	return (
		<SiteShell>
			<div className="mx-auto max-w-xl px-4 py-24 text-center">
				<div className="border-border bg-secondary text-muted-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full border">
					<XCircle className="h-8 w-8" />
				</div>
				<h1 className="text-foreground mt-8 font-serif text-4xl">
					Pago cancelado
				</h1>
				<p className="text-muted-foreground mt-4 leading-relaxed">
					No se realizó ningún cargo. Tus artículos han sido restaurados en el
					carrito.
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button
						render={<Link href="/checkout" />}
						className="px-8"
					>
						Intentar de nuevo
					</Button>
					<Button
						render={<Link href="/" />}
						variant="outline"
						className="px-8"
					>
						Seguir explorando
					</Button>
				</div>
			</div>
		</SiteShell>
	);
}
