"use client";

import type { ReactNode } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

const LOW_STOCK_THRESHOLD = 5;

export function AddToCartButton({
	product,
	children,
}: {
	product: Product;
	children: ReactNode;
}) {
	const { addItem } = useCart();
	const unavailable = product.stock < 1;

	return (
		<div className="flex flex-col items-start gap-2">
			<Button
				variant="solid"
				size="hero"
				disabled={unavailable}
				onClick={() => addItem(product)}
			>
				{unavailable ? "Agotado" : children}
			</Button>
			{!unavailable && product.stock <= LOW_STOCK_THRESHOLD && (
				<p className="text-muted-foreground text-xs">
					{product.stock === 1
						? "Queda 1 unidad."
						: `Quedan ${product.stock} unidades.`}
				</p>
			)}
		</div>
	);
}
