"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/money";

export function CartDrawer() {
	const {
		items,
		isOpen,
		setIsOpen,
		updateQuantity,
		removeItem,
		subtotal,
		count,
	} = useCart();

	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const previous = document.activeElement as HTMLElement | null;
		closeRef.current?.focus();
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("keydown", onKey);
			previous?.focus?.();
		};
	}, [isOpen, setIsOpen]);

	return (
		<>
			<div
				className={cn(
					"bg-ink/75 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300",
					isOpen ? "opacity-100" : "pointer-events-none opacity-0"
				)}
				onClick={() => setIsOpen(false)}
				aria-hidden="true"
			/>
			<aside
				role="dialog"
				aria-modal="true"
				inert={!isOpen}
				className={cn(
					"dark-surface bg-ink/95 border-border fixed top-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col border-l shadow-2xl backdrop-blur-xl transition-transform duration-300",
					isOpen ? "translate-x-0" : "translate-x-full"
				)}
				aria-label="Carrito de compras"
				aria-hidden={!isOpen}
			>
				<div className="border-border flex items-center justify-between border-b px-6 py-5">
					<h2 className="type-h3">
						Tu Carrito
						{count > 0 && (
							<span className="text-muted-foreground"> ({count})</span>
						)}
					</h2>
					<button
						ref={closeRef}
						type="button"
						onClick={() => setIsOpen(false)}
						aria-label="Cerrar carrito"
						className="hover:text-muted-foreground size-touch-target grid place-items-center"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{items.length === 0 ? (
					<div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
						<p className="text-muted-foreground font-serif text-xl">
							Tu carrito está vacío.
						</p>
						<Link
							href="/"
							onClick={() => setIsOpen(false)}
							className="type-button text-foreground underline-offset-4 hover:underline"
						>
							Explorar Biblias
						</Link>
					</div>
				) : (
					<>
						<ul className="divide-border flex-1 divide-y overflow-y-auto px-6">
							{items.map((item) => (
								<li
									key={item.product.id}
									className="flex gap-4 py-5"
								>
									<div className="border-border bg-parchment rounded-control relative h-24 w-20 shrink-0 overflow-hidden border">
										<Image
											src={item.product.image_paths[0] || "/placeholder.svg"}
											alt={item.product.name}
											fill
											className="object-contain p-1"
											sizes="80px"
										/>
									</div>
									<div className="flex flex-1 flex-col">
										<div className="flex justify-between gap-2">
											<Link
												href="/#biblia"
												onClick={() => setIsOpen(false)}
												className="hover:text-muted-foreground font-serif text-lg leading-tight"
											>
												{item.product.name}
											</Link>
											<button
												type="button"
												onClick={() => removeItem(item.product.id)}
												aria-label="Eliminar artículo"
												className="text-muted-foreground hover:text-foreground grid size-10 shrink-0 place-items-center"
											>
												<X className="h-4 w-4" />
											</button>
										</div>
										<p className="text-muted-foreground text-xs">
											{item.product.short_description}
										</p>
										<div className="mt-auto flex items-center justify-between pt-2">
											<div className="border-border rounded-pill flex items-center border">
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.product.id, item.quantity - 1)
													}
													aria-label="Disminuir cantidad"
													className="hover:bg-secondary rounded-pill grid size-10 place-items-center"
												>
													<Minus className="h-3.5 w-3.5" />
												</button>
												<span className="w-8 text-center text-sm">
													{item.quantity}
												</span>
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.product.id, item.quantity + 1)
													}
													aria-label="Aumentar cantidad"
													className="hover:bg-secondary rounded-pill grid size-10 place-items-center"
												>
													<Plus className="h-3.5 w-3.5" />
												</button>
											</div>
											<span className="text-base font-medium tabular-nums">
												{formatPrice(item.product.price_cents * item.quantity)}
											</span>
										</div>
									</div>
								</li>
							))}
						</ul>
						<div className="border-border border-t px-6 py-6">
							<div className="flex items-center justify-between">
								<span className="type-overline text-muted-foreground">
									Subtotal
								</span>
								<span className="text-xl font-medium tabular-nums">
									{formatPrice(subtotal)}
								</span>
							</div>
							<p className="text-muted-foreground mt-1 text-xs">
								Envío e impuestos calculados al finalizar la compra.
							</p>
							<button
								type="button"
								disabled
								className="type-button bg-primary text-primary-foreground rounded-pill h-control mt-5 flex w-full cursor-not-allowed items-center justify-center opacity-60"
							>
								Pago próximamente
							</button>
							<Link
								href="/cart"
								onClick={() => setIsOpen(false)}
								className="type-button border-border hover:bg-secondary text-foreground rounded-pill h-control mt-3 flex w-full items-center justify-center border"
							>
								Ver Carrito
							</Link>
						</div>
					</>
				)}
			</aside>
		</>
	);
}
