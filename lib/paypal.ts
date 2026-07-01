import { CartItem } from "@/components/cart/cart-provider";
import { PaypalErrorResponse, PaypalCreateOrderError } from "./paypal-error";

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

interface PaypalItem {
  name: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
  quantity: string;
}

interface PaypalCreateOrderSuccess {
  id: string;
  status:
    | "CREATED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
  links: [
    {
      href: string;
      rel: string;
    },
  ];
}

export async function createPaypalOrder(
  cartItems: CartItem[],
  amount: string,
  shipping: string,
  tax: string,
  currency = "USD",
) {
  const { accessToken } = await generateAccessToken();

  const invoiceID = crypto.randomUUID();

  const parsedCardItems: PaypalItem[] = cartItems.map((item) => {
    return {
      name: item.product.name,
      unit_amount: {
        currency_code: item.product.currency,
        value: item.product.price.toFixed(2),
      },
      quantity: String(item.quantity),
    };
  });

  // item_total must equal the sum of (unit_amount * quantity) across all items
  const itemTotal = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  const paypalOrderPayload = {
    intent: "CAPTURE", // CAPTURE - pay now || AUTHORIZE - pay later
    purchase_units: [
      {
        invoice_id: invoiceID,
        amount: {
          currency_code: currency,
          value: amount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: itemTotal,
            },
            shipping: {
              currency_code: currency,
              value: shipping,
            },
            tax_total: {
              currency_code: currency,
              value: tax,
            },
          },
        },
        items: parsedCardItems,
      },
    ],
    application_context: {
      return_url: "http://localhost:3000/checkout/success",
      cancel_url: "http://localhost:3000/checkout/cancel",
    },
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
    let errorBody: PaypalErrorResponse;
    try {
      errorBody = await res.json();
    } catch (error) {
      const rawText = await res.text();
      throw new PaypalCreateOrderError(
        `Create order failed\n: ${rawText}`,
        res.status,
      );
    }

    throw new PaypalCreateOrderError(
      "Create order failed",
      res.status,
      errorBody,
    );
  }

  const data: PaypalCreateOrderSuccess = await res.json();

  const createOrderData = {
    returnURL: data.links.find((link) => link.rel === "approve")?.href,
  };

  return createOrderData;
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

  console.log(data);

  return data;
}
