import { Resend } from "resend";
import type { Order } from "./supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

function OrderConfirmationEmail({ order }: { order: Order }) {
  const orderUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order.id}`;

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          backgroundColor: "#faf9f7",
          fontFamily: "Georgia, serif",
          margin: 0,
          padding: 0,
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#faf9f7", padding: "48px 0" }}
        >
          <tr>
            <td align="center">
              <table
                width="560"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#1a1a1a",
                      padding: "32px 40px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#c9a96e",
                        fontSize: "11px",
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        margin: "0 0 8px",
                      }}
                    >
                      Maayan
                    </p>
                    <h1
                      style={{
                        color: "#ffffff",
                        fontSize: "24px",
                        fontWeight: "normal",
                        margin: 0,
                      }}
                    >
                      Gracias por tu pedido
                    </h1>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "40px" }}>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "15px",
                        lineHeight: "1.7",
                        margin: "0 0 32px",
                      }}
                    >
                      Hola {order.payer_name}, tu pedido ha sido recibido y
                      confirmado. Que estas Escrituras sean un manantial de
                      gracia en tu hogar.
                    </p>

                    {/* Order summary */}
                    <table
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        borderTop: "1px solid #e8e2d9",
                        marginBottom: "32px",
                      }}
                    >
                      {order.items.map((item) => (
                        <tr key={item.productId}>
                          <td
                            style={{
                              padding: "16px 0",
                              borderBottom: "1px solid #e8e2d9",
                              color: "#1a1a1a",
                              fontSize: "14px",
                            }}
                          >
                            {item.name}{" "}
                            <span style={{ color: "#999" }}>
                              × {item.quantity}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "16px 0",
                              borderBottom: "1px solid #e8e2d9",
                              color: "#1a1a1a",
                              fontSize: "14px",
                              textAlign: "right",
                            }}
                          >
                            {(item.price * item.quantity).toLocaleString(
                              "es-ES",
                              { style: "currency", currency: item.currency },
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          style={{
                            padding: "16px 0 0",
                            color: "#1a1a1a",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            padding: "16px 0 0",
                            color: "#1a1a1a",
                            fontSize: "15px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          {order.amount.toLocaleString("es-ES", {
                            style: "currency",
                            currency: order.currency,
                          })}
                        </td>
                      </tr>
                    </table>

                    {/* Order details */}
                    <table
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        backgroundColor: "#faf9f7",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "32px",
                      }}
                    >
                      <tr>
                        <td
                          style={{ color: "#999", fontSize: "13px", paddingBottom: "8px" }}
                        >
                          Número de pedido
                        </td>
                        <td
                          style={{
                            color: "#1a1a1a",
                            fontSize: "13px",
                            fontFamily: "monospace",
                            textAlign: "right",
                            paddingBottom: "8px",
                          }}
                        >
                          {order.id}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "#999", fontSize: "13px", paddingBottom: "8px" }}>
                          Transacción PayPal
                        </td>
                        <td
                          style={{
                            color: "#1a1a1a",
                            fontSize: "13px",
                            fontFamily: "monospace",
                            textAlign: "right",
                            paddingBottom: "8px",
                          }}
                        >
                          {order.paypal_transaction_id}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "#999", fontSize: "13px" }}>
                          Dirección de envío
                        </td>
                        <td
                          style={{
                            color: "#1a1a1a",
                            fontSize: "13px",
                            textAlign: "right",
                          }}
                        >
                          {order.shipping_city}, {order.shipping_postal}
                        </td>
                      </tr>
                    </table>

                    {/* CTA */}
                    <table width="100%" cellPadding={0} cellSpacing={0}>
                      <tr>
                        <td align="center">
                          <a
                            href={orderUrl}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#1a1a1a",
                              color: "#ffffff",
                              fontSize: "13px",
                              letterSpacing: "2px",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              padding: "14px 32px",
                              borderRadius: "999px",
                            }}
                          >
                            Ver mi pedido
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      padding: "24px 40px",
                      borderTop: "1px solid #e8e2d9",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#aaa",
                        fontSize: "12px",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      Maayan · Biblias de calidad premium
                      <br />
                      Si tienes alguna pregunta responde a este correo o
                      visita{" "}
                      <a
                        href={process.env.NEXT_PUBLIC_BASE_URL}
                        style={{ color: "#aaa" }}
                      >
                        maayan.shop
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

export async function sendOrderConfirmationEmail(order: Order) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: order.payer_email,
    subject: `Tu pedido ha sido confirmado — ${order.id.slice(0, 8).toUpperCase()}`,
    react: <OrderConfirmationEmail order={order} />,
  });

  if (error) {
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
}
