"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import type { Product } from "@/lib/products";
import { getCollectionName } from "@/lib/products";
import { useCart } from "@/components/cart/cart-provider";
import { StarRating } from "@/components/star-rating";

export function ProductDetail({ product }: { product: Product }) {
	const { addItem, setIsOpen } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState<
		"description" | "features" | "specs"
	>("description");

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
			<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
				{/* galería */}
				<div className="border-border/70 bg-parchment relative aspect-[3/4] overflow-hidden rounded-3xl border">
					<Image
						src={product.image || "/placeholder.svg"}
						alt={product.name}
						fill
						priority
						className="object-contain p-4"
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				</div>

				{/* detalles */}
				<div className="flex flex-col">
					<p className="text-gold text-xs tracking-[0.3em] uppercase">
						{getCollectionName(product.collection)}
					</p>
					<h1 className="mt-3 font-serif text-4xl leading-tight text-balance md:text-5xl">
						{product.name}
					</h1>
					<div className="mt-4">
						<StarRating
							rating={product.rating}
							count={product.reviewCount}
						/>
					</div>
					<p className="mt-6 font-serif text-3xl">${product.price}</p>
					<p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
						{product.shortDescription}
					</p>

					<dl className="border-border mt-6 grid grid-cols-2 gap-y-3 border-y py-6 text-sm">
						<dt className="text-muted-foreground">Traducción</dt>
						<dd className="text-right">{product.translation}</dd>
						<dt className="text-muted-foreground">Cubierta</dt>
						<dd className="text-right">{product.coverType}</dd>
						<dt className="text-muted-foreground">Idioma</dt>
						<dd className="text-right">{product.language}</dd>
						<dt className="text-muted-foreground">Edición</dt>
						<dd className="text-right">{product.edition}</dd>
					</dl>

					<div className="mt-6 flex items-center gap-4">
						<div className="border-border flex items-center border">
							<button
								type="button"
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								aria-label="Disminuir cantidad"
								className="hover:bg-secondary px-3 py-3"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="w-12 text-center">{quantity}</span>
							<button
								type="button"
								onClick={() => setQuantity((q) => q + 1)}
								aria-label="Aumentar cantidad"
								className="hover:bg-secondary px-3 py-3"
							>
								<Plus className="h-4 w-4" />
							</button>
						</div>
						<button
							type="button"
							onClick={() => addItem(product, quantity)}
							className="bg-primary text-primary-foreground flex-1 rounded-full py-4 font-sans text-sm font-medium transition-opacity hover:opacity-90"
						>
							Añadir al Carrito
						</button>
					</div>
					<button
						type="button"
						onClick={() => {
							addItem(product, quantity);
							setIsOpen(true);
						}}
						className="border-border text-foreground hover:bg-muted mt-3 w-full rounded-full border py-4 font-sans text-sm font-medium transition-colors"
					>
						Comprar Ahora
					</button>

					<ul className="text-muted-foreground mt-8 space-y-3 text-sm">
						<li className="flex items-center gap-3">
							<Truck className="text-gold h-4 w-4" /> Envío gratuito en compras
							superiores a $75
						</li>
						<li className="flex items-center gap-3">
							<RefreshCw className="text-gold h-4 w-4" /> Devoluciones
							tranquilas en 30 días
						</li>
						<li className="flex items-center gap-3">
							<ShieldCheck className="text-gold h-4 w-4" /> Garantía de
							encuadernación de por vida
						</li>
					</ul>
				</div>
			</div>

			{/* pestañas */}
			<div className="border-border mt-16 border-t pt-10">
				<div className="border-border flex flex-wrap gap-8 border-b">
					{(["description", "features", "specs"] as const).map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={`-mb-px border-b-2 pb-4 text-sm tracking-[0.2em] uppercase transition-colors ${
								activeTab === tab
									? "border-gold text-foreground"
									: "text-muted-foreground hover:text-foreground border-transparent"
							}`}
						>
							{tab === "description"
								? "Descripción"
								: tab === "features"
									? "Características"
									: "Especificaciones"}
						</button>
					))}
				</div>
				<div className="max-w-3xl py-8">
					{activeTab === "description" && (
						<p className="text-muted-foreground leading-relaxed text-pretty">
							{product.description}
						</p>
					)}
					{activeTab === "features" && (
						<ul className="space-y-3">
							{product.features.map((f) => (
								<li
									key={f}
									className="flex items-start gap-3"
								>
									<span className="bg-gold mt-2 h-1.5 w-1.5 shrink-0" />
									{f}
								</li>
							))}
						</ul>
					)}
					{activeTab === "specs" && (
						<dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
							{product.specs.map((s) => (
								<div
									key={s.label}
									className="border-border flex justify-between border-b pb-3"
								>
									<dt className="text-muted-foreground">{s.label}</dt>
									<dd>{s.value}</dd>
								</div>
							))}
						</dl>
					)}
				</div>
			</div>
		</div>
	);
}
