import { sendOrderConfirmationEmail } from "@/lib/email";
import { capturePaypalOrder } from "@/lib/paypal";
import { supabase, type OrderItem } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      orderID,
      cartItems,
      shippingName,
      shippingEmail,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostal,
      shippingCountry,
    } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const capture = await capturePaypalOrder(orderID);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error: `Payment not completed. Status: ${capture.status}`,
          status: capture.status,
        },
        { status: 422 },
      );
    }

    // Extract data from the PayPal capture response
    const paypalCapture =
      capture.purchase_units?.[0]?.payments?.captures?.[0];

    const orderItems: OrderItem[] = (cartItems ?? []).map((item: any) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      currency: item.product.currency,
      quantity: item.quantity,
      image: item.product.image,
    }));

    const order = {
      paypal_order_id: orderID,
      paypal_transaction_id: paypalCapture?.id ?? "",
      status: capture.status,
      payer_name: `${capture.payer?.name?.given_name ?? ""} ${capture.payer?.name?.surname ?? ""}`.trim(),
      payer_email: capture.payer?.email_address ?? "",
      amount: Number(paypalCapture?.amount?.value ?? 0),
      currency: paypalCapture?.amount?.currency_code ?? "USD",
      items: orderItems,
      shipping_name: shippingName ?? "",
      shipping_email: shippingEmail ?? "",
      shipping_phone: shippingPhone ?? "",
      shipping_address: shippingAddress ?? "",
      shipping_city: shippingCity ?? "",
      shipping_state: shippingState ?? "",
      shipping_postal: shippingPostal ?? "",
      shipping_country: shippingCountry ?? "",
    };

    // Save order to Supabase
    const { data: savedOrder, error: dbError } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (dbError) {
      console.error("Failed to save order to database:", dbError.message);
      // Don't fail the request — payment already captured, return capture data
      return NextResponse.json(capture);
    }

    // Send confirmation email — non-blocking, don't fail if it errors
    sendOrderConfirmationEmail(savedOrder).catch((err) => {
      console.error("Failed to send confirmation email:", err.message);
    });

    return NextResponse.json({ ...capture, orderId: savedOrder.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to capture order" },
      { status: 500 },
    );
  }
}
