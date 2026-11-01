"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
	product: Product;
	quantity: number;
};

type CartContextValue = {
	items: CartItem[];
	addItem: (product: Product, quantity?: number) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	count: number;
	subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "maayan_cart_v2";

function clampToStock(quantity: number, stock: number) {
	return Math.min(quantity, stock);
}

function isCartItem(value: unknown): value is CartItem {
	if (typeof value !== "object" || value === null) return false;

	const { product, quantity } = value as Record<string, unknown>;
	if (typeof quantity !== "number" || !Number.isInteger(quantity)) return false;
	if (quantity <= 0) return false;
	if (typeof product !== "object" || product === null) return false;

	const candidate = product as Record<string, unknown>;
	return (
		typeof candidate.id === "string" &&
		typeof candidate.name === "string" &&
		typeof candidate.short_description === "string" &&
		typeof candidate.price_cents === "number" &&
		typeof candidate.stock === "number" &&
		Array.isArray(candidate.image_paths)
	);
}

function loadCartFromStorage(): CartItem[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(CART_STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];

		const seen = new Set<string>();
		const items: CartItem[] = [];
		for (const entry of parsed) {
			if (!isCartItem(entry) || seen.has(entry.product.id)) continue;

			const quantity = clampToStock(entry.quantity, entry.product.stock);
			if (quantity < 1) continue;

			seen.add(entry.product.id);
			items.push({ ...entry, quantity });
		}
		return items;
	} catch {
		return [];
	}
}

function saveCartToStorage(items: CartItem[]) {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	} catch {
		// localStorage unavailable (e.g. private browsing with storage blocked)
	}
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	// Load cart from localStorage on mount (client-only)
	useEffect(() => {
		setItems(loadCartFromStorage());
		setHydrated(true);
	}, []);

	// Persist cart to localStorage whenever it changes (skip before hydration)
	useEffect(() => {
		if (!hydrated) return;
		saveCartToStorage(items);
	}, [items, hydrated]);

	function addItem(product: Product, quantity = 1) {
		if (!Number.isInteger(quantity) || quantity <= 0) return;
		if (product.stock < 1) return;

		setItems((prev) => {
			const existing = prev.find((i) => i.product.id === product.id);
			if (existing) {
				// Replace the stored snapshot so a stale price/stock is refreshed.
				return prev.map((i) =>
					i.product.id === product.id
						? {
								...i,
								product,
								quantity: clampToStock(i.quantity + quantity, product.stock),
							}
						: i
				);
			}
			return [
				...prev,
				{ product, quantity: clampToStock(quantity, product.stock) },
			];
		});
		setIsOpen(true);
	}

	function removeItem(id: string) {
		setItems((prev) => prev.filter((i) => i.product.id !== id));
	}

	function updateQuantity(id: string, quantity: number) {
		if (quantity <= 0) {
			removeItem(id);
			return;
		}
		setItems((prev) =>
			prev.flatMap((item) => {
				if (item.product.id !== id) return [item];

				const nextQuantity = clampToStock(quantity, item.product.stock);
				return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
			})
		);
	}

	function clearCart() {
		setItems([]);
	}

	// lock scroll when drawer is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const count = items.reduce((sum, i) => sum + i.quantity, 0);
	const subtotal = items.reduce(
		(sum, i) => sum + i.product.price_cents * i.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				isOpen,
				setIsOpen,
				count,
				subtotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
