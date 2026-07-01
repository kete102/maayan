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
      currency ?? "USD",
    );

    console.log(order);

    return NextResponse.json(order);
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e.message ?? "Failed to create order",
      },
      { status: 500 },
    );
  }
}
