import { createPaypalOrder } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    const order = await createPaypalOrder(amount, currency ?? "USD");

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
