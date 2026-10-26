import { createPaypalOrder } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { amount, currency, cart_items, shipping, tax } = await req.json();

		const order = await createPaypalOrder(
			cart_items,
			amount,
			shipping,
			tax,
			currency ?? "USD"
		);

		return NextResponse.json(order);
	} catch (error: unknown) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to create order",
			},
			{ status: 500 }
		);
	}
}
