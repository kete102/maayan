# Stock lifecycle for Stripe checkout

This document records the next database and checkout steps after the orders and stock-reservation schema. The initial payment flow will use a normal automatic-capture payment to keep the integration simpler. Stock is reserved before payment, and the webhook remains the source of truth for order status.

## Current foundation

Already merged in PR #13:

- `products.stock` has a `CHECK (stock >= 0)` constraint.
- `stock_reservations` tracks `active`, `consumed`, and `released` reservations with an `expires_at` timestamp.
- `reserve_stock` is a server-only RPC. It checks available stock as physical stock minus unexpired active reservations and defaults to a 15-minute TTL. Checkout should pass a 20-minute TTL explicitly; calling it again renews an existing active reservation.
- Expired reservations stop counting toward available stock even if their status is still `active`.
- `stripe_events.id` is a primary key, ready to deduplicate Stripe webhook events.

The checkout is currently disabled. These tables and functions are not yet applied to the remote Supabase project; applying migrations remotely requires explicit approval.

## Payment decision

Start with Stripe's normal automatic-capture flow, not authorization with deferred capture. The customer is charged as part of payment confirmation. This is simpler for the first version, but it does not make the late-payment/stock race impossible.

Authorization with deferred capture is not the same as asking the customer to pay later. It places a temporary hold on the card, then the server captures or cancels that hold. It can reduce refund fees if stock cannot be fulfilled, but adds payment states and only works with supported payment methods. Reconsider it if the residual race or refund cost becomes material.

## Planned flow

1. Reprice the cart on the server; never trust client-supplied prices or totals.
2. Create a pending order and its order items from the server-validated cart.
3. Reserve stock with `reserve_stock` before creating/confirming the PaymentIntent. If reservation fails, do not charge; return an out-of-stock error to the customer.
4. Use a 20-minute reservation TTL. Before asking Stripe to confirm payment, renew the reservation by calling `reserve_stock` again for the same order and quantities; the RPC refreshes the expiry for an existing reservation.
5. Initially support card-based, promptly-confirmed payment methods. Do not enable asynchronous methods until their delayed-success behavior has an explicit stock and refund policy.
6. Handle payment completion only in the signed Stripe webhook. On `payment_intent.succeeded`, call the atomic consume RPC. Mark the order paid only if stock consumption succeeds.
7. If payment succeeds after the reservation expires, the consume RPC must re-check stock while holding database locks. If stock remains available, decrement it and consume the reservation. If not, do not mark the order paid and automatically refund the Stripe payment.
8. A retryable payment failure does not release stock. Call the release RPC for an explicit cancellation. Expiration itself already frees stock logically; a cleanup job is optional for tidying expired reservation and pending-order rows, not for preventing overselling.

Always send a stable Stripe `Idempotency-Key` when creating a PaymentIntent. Deduplicate webhook event IDs in `stripe_events`; make the database RPCs idempotent too because Stripe can retry webhooks.

## Consume and release reservations migration

Implemented in `20261102124719_consume_release_reservations.sql` on `feat/stock-consume-release`. The migration has been tested locally. Do not apply migrations to the remote Supabase project without explicit approval.

### Decisions

- Keep Stripe automatic capture for the first version.
- A successful Stripe payment is not enough to mark an order paid: stock consumption must also succeed.
- If a successful payment cannot consume stock, set the order to `pending_refund`. The webhook will issue a full refund, including shipping.
- Accept the Stripe processing fee as a rare cost when stock cannot be consumed; monitor how often orders enter `pending_refund`.
- If the reservation expired or was released before a successful payment arrives, treat it like an expired reservation: re-check stock and fulfill if stock is still available; otherwise set `pending_refund`.
- `pending_refund` is added to both the database order-status CHECK constraint and `lib/order-status.ts`.
- Shipping and delivery states remain a separate future lifecycle, not values in `orders.status`.
- A retryable `payment_intent.payment_failed` does not release stock. Release is for explicit cancellation; checkout can retry with the still-active reservation.
- Use a 20-minute reservation TTL from checkout. Keep `reserve_stock`'s database default at 15 minutes; the application must pass 20 minutes explicitly.
- Cancel or invalidate the PaymentIntent when its reservation expires to reduce stale-checkout attempts; the consume RPC and refund fallback remain necessary for races.

### Migration contents

- Replace the `orders.status` CHECK constraint to allow `pending_refund`.
- Add `consume_reservation(p_order_id uuid)`, restricted to `service_role`, with an empty `search_path` and explicit grants.
- Add `release_reservation(p_order_id uuid)` with the same security restrictions.
- Preserve the lock order: lock the order first, then products in deterministic `product_id` order. Operations for the same order serialize on its order row; reservations are updated only after taking that lock.

### `consume_reservation` behavior

1. Lock the order, then all relevant products in deterministic order.
2. Accept orders in `pending_payment`, `payment_failed`, or `cancelled`. If already `paid`, return an idempotent already-processed result without decrementing stock again.
3. For each reservation that is active and unexpired, consume its reserved quantity. For an expired or released reservation, re-check available stock while holding the product lock: physical stock minus other active, unexpired reservations must cover the quantity.
4. Make the whole order atomic. If every item is available, decrement product stock, mark reservations `consumed`, and mark the order `paid`.
5. If any item is unavailable, do not decrement stock or consume any reservation; mark the order `pending_refund` and return a clear insufficient-stock result. Do not raise an exception for this expected business outcome, or the transaction would roll back the `pending_refund` status. Unexpected database/programming errors should still fail normally.

### `release_reservation` behavior

- Transition active reservations to `released`; never change a consumed reservation.
- Be safe to retry.
- Update the order only when it is `pending_payment` or `payment_failed`, so explicit cancellation can release a reservation after a retryable card failure without overwriting `paid` or `pending_refund`.
- Release is for explicit cancellation, not `payment_intent.payment_failed`, which can represent a retryable card attempt.
- Only a `pending_payment` order is changed to `cancelled`; other states are returned unchanged. Active reservations are released, while consumed reservations are never changed.

### Database tests and generated types

pgTAP coverage includes:

- Successful consumption of one- and multi-item orders.
- Idempotent consume retry without a second stock decrement.
- Expired reservation with and without enough remaining stock.
- Released reservation followed by successful payment, with and without enough stock.
- Insufficient stock leaves all item stock/reservations unchanged and sets `pending_refund`.
- Explicit release and release retry; a retryable payment failure does not release stock, and release never changes a consumed reservation.

`lib/order-status.ts`, generated database types, and the Stripe/Supabase checklist in `TODOS.md` are updated. The migration and pgTAP tests pass locally; do not apply this migration remotely without explicit approval.

## Later application work

- Add a server-side checkout endpoint/action that reprices, creates the order, reserves stock, and creates the PaymentIntent with an idempotency key.
- Add a webhook route that verifies Stripe signatures, deduplicates events, calls the RPCs, and fully refunds successful payments whose order becomes `pending_refund`.
- Decide how to cancel or invalidate a PaymentIntent when its reservation expires. This reduces late-payment races but does not replace the stock check and refund fallback in the webhook.
- Show clear out-of-stock and last-units messaging in the storefront/cart.

Partial refunds, returns, name personalization, and shipping lifecycle decisions are recorded in `TODOS.md`; they are later work and are not part of this migration.

## Verification

```sh
pnpm exec supabase test db --local
pnpm db:types
pnpm lint
pnpm exec tsc --noEmit
```
