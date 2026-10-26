"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { calcShipping, calcTax, calcTotal } from "@/lib/pricing";
import { formatPrice } from "@/lib/products";

export function CartPageClient() {
	const { items, updateQuantity, removeItem, subtotal } = useCart();
	const shipping = calcShipping(subtotal);
	const tax = calcTax(subtotal);
	const total = calcTotal(subtotal);

	if (items.length === 0) {
		return (
			<div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-5 px-4 text-center md:px-8">
				<h1 className="font-serif text-4xl font-light">
					Tu carrito está vacío
				</h1>
				<p className="text-muted-foreground max-w-md font-light">
					Aún no se han añadido Biblias. Cuando encuentres la edición para tu
					camino, descansará aquí.
				</p>
				<Link
					href="/"
					className="bg-primary text-primary-foreground rounded-full px-8 py-4 font-sans text-sm font-medium transition-opacity hover:opacity-90"
				>
					Explorar Biblias
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
			<h1 className="font-serif text-4xl font-light md:text-5xl">Tu Carrito</h1>
			<div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
				<ul className="divide-border border-border divide-y border-y">
					{items.map((item) => (
						<li
							key={item.product.id}
							className="flex gap-5 py-6"
						>
							<Link
								href={`/product/${item.product.slug}`}
								className="border-border bg-parchment relative h-32 w-24 shrink-0 overflow-hidden rounded-2xl border"
							>
								<Image
									src={item.product.image || "/placeholder.svg"}
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
											href={`/product/${item.product.slug}`}
											className="hover:text-gold font-serif text-xl leading-tight"
										>
											{item.product.name}
										</Link>
										<p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">
											{item.product.translation} · {item.product.coverType} ·{" "}
											{item.product.edition}
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
									<div className="border-border flex items-center rounded-full border">
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
									<span className="font-serif text-xl">
										{formatPrice(item.product.price * item.quantity)}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>

				<aside className="border-border bg-card h-fit rounded-2xl border p-8">
					<h2 className="font-serif text-2xl font-light">Resumen del Pedido</h2>
					<dl className="mt-6 space-y-4 text-sm">
						<div className="flex justify-between">
							<dt className="text-muted-foreground">Subtotal</dt>
							<dd>{formatPrice(subtotal)}</dd>
						</div>
						<div className="flex justify-between">
							<dt className="text-muted-foreground">Envío</dt>
							<dd>{shipping === 0 ? "Gratuito" : formatPrice(shipping)}</dd>
						</div>
						<div className="flex justify-between">
							<dt className="text-muted-foreground">Impuesto estimado</dt>
							<dd>{formatPrice(tax)}</dd>
						</div>
						<div className="border-border flex justify-between border-t pt-4 font-serif text-xl">
							<dt>Total</dt>
							<dd>{formatPrice(total)}</dd>
						</div>
					</dl>
					<Link
						href="/checkout"
						className="bg-primary text-primary-foreground mt-8 flex w-full items-center justify-center rounded-full py-4 font-sans text-sm font-medium transition-opacity hover:opacity-90"
					>
						Pagar
					</Link>
					<Link
						href="/"
						className="text-muted-foreground hover:text-foreground mt-3 flex w-full items-center justify-center py-2 font-sans text-sm"
					>
						Seguir Comprando
					</Link>
				</aside>
			</div>
		</div>
	);
}
