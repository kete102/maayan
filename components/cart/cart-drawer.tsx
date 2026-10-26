"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

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
					"bg-canyon-950/75 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300",
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
					"dark-surface glass bg-canyon-950-95 fixed top-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col border-y-0 border-r-0 shadow-2xl transition-transform duration-300",
					isOpen ? "translate-x-0" : "translate-x-full"
				)}
				aria-label="Carrito de compras"
				aria-hidden={!isOpen}
			>
				<div className="border-border flex items-center justify-between border-b px-6 py-5">
					<h2 className="font-serif text-2xl font-medium">
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
						className="hover:text-gold grid size-11 place-items-center"
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
							className="text-gold font-sans text-sm underline-offset-4 hover:underline"
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
									<div className="border-border bg-parchment relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border">
										<Image
											src={item.product.image || "/placeholder.svg"}
											alt={item.product.name}
											fill
											className="object-contain p-1"
											sizes="80px"
										/>
									</div>
									<div className="flex flex-1 flex-col">
										<div className="flex justify-between gap-2">
											<Link
												href={`/product/${item.product.slug}`}
												onClick={() => setIsOpen(false)}
												className="hover:text-gold font-serif text-lg leading-tight"
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
										<p className="text-muted-foreground text-xs tracking-wide uppercase">
											{item.product.translation} · {item.product.coverType}
										</p>
										<div className="mt-auto flex items-center justify-between pt-2">
											<div className="border-border flex items-center rounded-full border">
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.product.id, item.quantity - 1)
													}
													aria-label="Disminuir cantidad"
													className="hover:bg-secondary grid size-10 place-items-center rounded-full"
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
													className="hover:bg-secondary grid size-10 place-items-center rounded-full"
												>
													<Plus className="h-3.5 w-3.5" />
												</button>
											</div>
											<span className="font-serif text-lg">
												${item.product.price * item.quantity}
											</span>
										</div>
									</div>
								</li>
							))}
						</ul>
						<div className="border-border border-t px-6 py-6">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
									Subtotal
								</span>
								<span className="font-serif text-2xl">${subtotal}</span>
							</div>
							<p className="text-muted-foreground mt-1 text-xs">
								Envío e impuestos calculados al finalizar la compra.
							</p>
							<Link
								href="/checkout"
								onClick={() => setIsOpen(false)}
								className="bg-primary text-primary-foreground mt-5 flex h-12 w-full items-center justify-center rounded-full font-sans text-sm font-medium transition-opacity hover:opacity-90"
							>
								Proceder al Pago
							</Link>
							<Link
								href="/cart"
								onClick={() => setIsOpen(false)}
								className="border-border hover:bg-secondary text-foreground mt-3 flex h-12 w-full items-center justify-center rounded-full border text-sm font-medium"
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
