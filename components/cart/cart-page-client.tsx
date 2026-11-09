"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/money";

export function CartPageClient() {
	const { items, updateQuantity, removeItem, subtotal } = useCart();

	if (items.length === 0) {
		return (
			<div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-5 px-4 text-center md:px-8">
				<h1 className="type-h2">Tu carrito está vacío</h1>
				<p className="text-muted-foreground max-w-md">
					Aún no se han añadido Biblias. Cuando encuentres la edición para tu
					camino, descansará aquí.
				</p>
				<Link
					href="/"
					className="type-button bg-primary text-primary-foreground rounded-pill px-8 py-4 transition-opacity hover:opacity-90"
				>
					Explorar Biblias
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
			<h1 className="type-h2">Tu Carrito</h1>
			<div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
				<ul className="divide-border border-border divide-y border-y">
					{items.map((item) => (
						<li
							key={item.product.id}
							className="flex gap-5 py-6"
						>
							<Link
								href="/#biblia"
								className="border-border bg-parchment rounded-control relative h-32 w-24 shrink-0 overflow-hidden border"
							>
								<Image
									src={item.product.image_paths[0] || "/placeholder.svg"}
									alt={item.product.name}
									fill
									className="object-contain p-1.5"
									sizes="96px"
								/>
							</Link>
							<div className="flex flex-1 flex-col">
								<div className="flex items-start justify-between gap-3">
									<div>
										<Link
											href="/#biblia"
											className="type-h3 hover:text-muted-foreground"
										>
											{item.product.name}
										</Link>
										<p className="text-muted-foreground mt-1 text-xs">
											{item.product.short_description}
										</p>
									</div>
									<button
										type="button"
										onClick={() => removeItem(item.product.id)}
										aria-label="Eliminar artículo"
										className="text-muted-foreground hover:text-foreground"
									>
										<X className="h-5 w-5" />
									</button>
								</div>
								<div className="mt-auto flex items-center justify-between pt-4">
									<div className="border-border rounded-pill flex items-center border">
										<button
											type="button"
											onClick={() =>
												updateQuantity(item.product.id, item.quantity - 1)
											}
											aria-label="Disminuir cantidad"
											className="hover:bg-secondary px-2.5 py-2"
										>
											<Minus className="h-3.5 w-3.5" />
										</button>
										<span className="w-10 text-center text-sm">
											{item.quantity}
										</span>
										<button
											type="button"
											onClick={() =>
												updateQuantity(item.product.id, item.quantity + 1)
											}
											aria-label="Aumentar cantidad"
											className="hover:bg-secondary px-2.5 py-2"
										>
											<Plus className="h-3.5 w-3.5" />
										</button>
									</div>
									<span className="text-lg font-medium tabular-nums">
										{formatPrice(item.product.price_cents * item.quantity)}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>

				<aside className="border-border bg-card rounded-surface h-fit border p-8">
					<h2 className="type-h3">Resumen del Pedido</h2>
					<dl className="mt-6 space-y-4 text-sm">
						<div className="flex justify-between">
							<dt>Subtotal</dt>
							<dd>{formatPrice(subtotal)}</dd>
						</div>
					</dl>
					<p className="text-foreground mt-4 text-xs">
						El envío y los impuestos se calcularán al preparar el pago.
					</p>
					<button
						type="button"
						disabled
						className="type-button bg-primary text-primary-foreground rounded-pill mt-8 flex w-full cursor-not-allowed items-center justify-center py-4 opacity-60"
					>
						Pago próximamente
					</button>
					<Link
						href="/"
						className="text-foreground mt-3 flex w-full items-center justify-center py-2 font-sans text-sm underline-offset-4 hover:underline"
					>
						Seguir Comprando
					</Link>
				</aside>
			</div>
		</div>
	);
}
