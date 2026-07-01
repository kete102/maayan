// 2. Define the PayPal error shape
interface PaypalErrorDetail {
  field?: string;
  location?: string;
  issue: string;
  description: string;
}

export interface PaypalErrorResponse {
  name: string;
  message: string;
  debug_id: string;
  details?: PaypalErrorDetail[];
  links?: { href: string; rel: string }[];
}

// 3. Richer error class
export class PaypalCreateOrderError extends Error {
  public readonly statusCode: number;
  public readonly paypalCode: string;
  public readonly debugId: string;
  public readonly details: PaypalErrorDetail[];

  constructor(
    message: string,
    statusCode?: number,
    body?: PaypalErrorResponse,
  ) {
    const detailLines =
      body?.details?.map(
        (d) =>
          `  - [${d.issue}] ${d.field ?? "unknown field"}: ${d.description}`,
      ) ?? [];

    const fullMessage = [
      message,
      statusCode != null ? `Status: ${statusCode}` : null,
      body ? `PayPal error: ${body.name} — ${body.message}` : null,
      body ? `Debug ID: ${body.debug_id}` : null,
      detailLines.length ? `Details:\n${detailLines.join("\n")}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    super(fullMessage);
    this.name = "PAYPAL_CREATE_ORDER_ERROR";
    this.statusCode = statusCode ?? 0;
    this.paypalCode = body?.name ?? "UNKNOWN";
    this.debugId = body?.debug_id ?? "";
    this.details = body?.details ?? [];
    Object.setPrototypeOf(this, PaypalCreateOrderError.prototype);
  }
}
