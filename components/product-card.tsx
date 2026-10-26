"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { getCollectionName } from "@/lib/products";
import { useCart } from "@/components/cart/cart-provider";
import { StarRating } from "@/components/star-rating";

export function ProductCard({ product }: { product: Product }) {
	const { addItem } = useCart();

	return (
		<article className="group flex flex-col">
			<Link
				href={`/product/${product.slug}`}
				className="border-border/70 bg-parchment relative block aspect-[4/5] overflow-hidden border"
			>
				<Image
					src={product.image || "/placeholder.svg"}
					alt={product.name}
					fill
					sizes="(max-width: 768px) 50vw, 25vw"
					className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04]"
				/>
				<span className="glass text-canyon-50 absolute bottom-2 left-2 px-2.5 py-1.5 text-[0.65rem] tracking-[0.15em] uppercase">
					{getCollectionName(product.collection)}
				</span>
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						addItem(product);
					}}
					aria-label={`Añadir ${product.name} al carrito`}
					className="glass text-canyon-50 hover:text-gold absolute top-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
				>
					<Plus className="h-4 w-4" />
				</button>
			</Link>
			<div className="mt-4 flex flex-1 flex-col">
				<div className="text-muted-foreground flex items-center gap-2 text-xs tracking-wide uppercase">
					<span>{product.translation}</span>
					<span aria-hidden="true">·</span>
					<span>{product.edition}</span>
				</div>
				<Link href={`/product/${product.slug}`}>
					<h3 className="hover:text-gold mt-1 font-serif text-xl leading-snug transition-colors">
						{product.name}
					</h3>
				</Link>
				<div className="mt-1">
					<StarRating
						rating={product.rating}
						count={product.reviewCount}
						size="sm"
					/>
				</div>
				<p className="text-muted-foreground mt-2 line-clamp-2 text-sm font-light">
					{product.shortDescription}
				</p>
				<p className="mt-3 font-serif text-xl">${product.price}</p>
			</div>
		</article>
	);
}
