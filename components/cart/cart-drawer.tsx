"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/money";
import {
	AnimatePresence,
	MotionConfig,
	motion,
	useIsPresent,
	type Variants,
} from "motion/react";

const panelVariants: Variants = {
	closed: {
		x: "100%",
		transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
	},
	open: {
		x: 0,
		transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
	},
};

const listVariants = {
	closed: {},
	open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
	closed: { opacity: 0, x: 16 },
	open: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 16, transition: { duration: 0.15 } },
};

export function CartDrawer() {
	const { isOpen } = useCart();

	return (
		<MotionConfig reducedMotion="user">
			<AnimatePresence>
				{isOpen && <CartPanel key="cart-panel" />}
			</AnimatePresence>
		</MotionConfig>
	);
}

function CartPanel() {
	const { items, setIsOpen, updateQuantity, removeItem, subtotal, count } =
		useCart();

	const closeRef = useRef<HTMLButtonElement>(null);
	const isPresent = useIsPresent();

	useEffect(() => {
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
	}, [setIsOpen]);

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.2 } }}
				transition={{ duration: 0.3 }}
				className="bg-ink/60 fixed inset-0 z-50 backdrop-blur-sm"
				onClick={() => setIsOpen(false)}
				aria-hidden="true"
			/>
			<motion.aside
				role="dialog"
				aria-modal="true"
				inert={!isPresent}
				initial="closed"
				animate="open"
				exit="closed"
				variants={panelVariants}
				drag="x"
				dragDirectionLock
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={{ left: 0, right: 0.6 }}
				dragMomentum={false}
				onDragEnd={(_, { offset, velocity }) => {
					if (offset.x > 100 || velocity.x > 500) setIsOpen(false);
				}}
				className="dark-surface bg-ink border-border fixed top-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col border-l shadow-2xl"
				aria-label="Carrito de compras"
				aria-hidden={!isPresent}
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
						<motion.ul
							variants={listVariants}
							initial="closed"
							animate="open"
							className="flex-1 overflow-y-auto px-6"
						>
							<AnimatePresence mode="popLayout">
								{items.map((item) => (
									<motion.li
										key={item.product.id}
										layout
										variants={itemVariants}
										className="border-border flex gap-4 border-b py-5 last:border-b-0"
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
													{formatPrice(
														item.product.price_cents * item.quantity
													)}
												</span>
											</div>
										</div>
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
							className="border-border border-t px-6 py-6"
						>
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
						</motion.div>
					</>
				)}
			</motion.aside>
		</>
	);
}
