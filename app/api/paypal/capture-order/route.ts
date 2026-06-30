import { capturePaypalOrder } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();
    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const capture = await capturePaypalOrder(orderID);

    return NextResponse.json(capture);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to capture order" },
      {
        status: 500,
      },
    );
  }
}
