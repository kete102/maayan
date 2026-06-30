"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
  amount: string;
  currency: string;
};

export default function PaypalCheckout({ amount, currency = "USD" }: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // Prevent crashing or sending broken script requests if env is missing
  if (!clientId) {
    console.error("PayPal Client ID is missing from environment variables.");
    return <p>Payment system unavailable. Please contact support.</p>;
  }
  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency,
        intent: "capture",
      }}
    >
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ amount, currency }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Create Order Error");

          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const captureData = await res.json();

          if (!res.ok) {
            throw new Error(captureData.error || "Capture Order Error");
          }

          alert("Payment success");
        }}
        onError={(error) => {
          console.error("Paypal error", error);
          alert("Something went wrong with Paypal checkout");
        }}
      />
    </PayPalScriptProvider>
  );
}
