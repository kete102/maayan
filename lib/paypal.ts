import { cursorTo } from "readline";

interface PaypalAccessTokenResponse {
  scope: string;
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

class PaypalAccessTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PAYPAL_ACCESS_TOKEN_ERROR";
    Object.setPrototypeOf(this, PaypalAccessTokenError.prototype);
  }
}

class PaypalCreateOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PAYPAL_CREATE_ORDER_ERROR";
    Object.setPrototypeOf(this, PaypalCreateOrderError.prototype);
  }
}

class PaypalCaptureOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PAYPAL_CAPTURE_ORDER_ERROR";
    Object.setPrototypeOf(this, PaypalCaptureOrderError.prototype);
  }
}

type GeneratePaypalAccessToken = {
  accessToken: PaypalAccessTokenResponse["access_token"];
};

export async function generateAccessToken(): Promise<GeneratePaypalAccessToken> {
  // TODO: validate env variables
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(
    `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new PaypalAccessTokenError(`Paypal Authentication error\n: ${err}`);
  }

  const data: PaypalAccessTokenResponse = await response.json();

  return {
    accessToken: data.access_token,
  };
}

export async function createPaypalOrder(amount: string, currency = "USD") {
  const { accessToken } = await generateAccessToken();

  const paypalOrderPayload = {
    intent: "CAPTURE", // CAPTURE - pay now || AUTHORIZE - pay later
    purchase_units: [
      {
        invoice_id: "1",
        amount: {
          currency_code: currency,
          value: amount, // Calculate total dynamically based on your DB prices
          breakdown: {
            // CRITICAL: This must match the sum of your item prices exactly!
            item_total: {
              currency_code: currency,
              value: amount,
            },
          },
        },
        items: [
          {
            name: "T-Shirt",
            description: "Super Fresh Shirt",
            unit_amount: {
              currency_code: "USD",
              value: "20.00",
            },
            quantity: "1",
            category: "PHYSICAL_GOODS",
            sku: "sku01",
            image_url:
              "https://example.com/static/images/items/1/tshirt_green.jpg",
            url: "https://example.com/url-to-the-item-being-purchased-1",
            upc: {
              type: "UPC-A",
              code: "123456789012",
            },
          },
        ],
      },
    ],
  };

  const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(paypalOrderPayload),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new PaypalCreateOrderError(
      `Create order failed\n: ${JSON.stringify(errorMessage)}`,
    );
  }

  const data = await res.json();

  return data;
}

export async function capturePaypalOrder(orderID: string) {
  const { accessToken } = await generateAccessToken();

  const res = await fetch(
    `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new PaypalCaptureOrderError(
      `Capture order failed\n: ${JSON.stringify(errorMessage)}`,
    );
  }

  const data = await res.json();

  return data;
}
