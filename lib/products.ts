import "server-only";
import { cache } from "react";
import type { Database, Json } from "@/lib/database.types";
import { createPublicSupabaseClient } from "@/lib/db/public";

export type Product = Database["public"]["Tables"]["products"]["Row"];

type ProductSpec = {
	[key: string]: Json | undefined;
	label: string;
	value: string;
};

function isProductSpec(value: Json): value is ProductSpec {
	return (
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value) &&
		typeof value.label === "string" &&
		typeof value.value === "string"
	);
}

// Featured product rule: first active product by created_at (id breaks ties).
export const getFeaturedProduct = cache(async (): Promise<Product | null> => {
	const { data, error } = await createPublicSupabaseClient()
		.from("products")
		.select("*")
		.eq("active", true)
		.order("created_at", { ascending: true })
		.order("id", { ascending: true })
		.limit(1)
		.maybeSingle();

	if (error) {
		console.error("Failed to load featured product:", {
			code: error.code,
			message: error.message,
			hint: error.hint,
		});
		throw new Error("No se pudo cargar el producto.");
	}

	return data;
});

export function getProductSpecs(product: Product): ProductSpec[] {
	const specs = product.specs;
	if (!Array.isArray(specs)) return [];

	return specs.filter(isProductSpec);
}
