# TODOs

## Cart

- [ ] User can add/remove items to the cart
  - [ ] User can update items inside the cart
  - [ ] Check stock availability before adding it to the cart
  - [ ] Display stock count for items?? or just if it's available or not

## Stripe + Supabase migration

Checkout is intentionally disabled (cart buttons show "Pago próximamente"). It will be rebuilt from scratch on Stripe + Supabase.

- [x] Supabase tables: `orders`, `order_items`, `stock_reservations`, `stripe_events`
- [x] Add `pending_refund` order status for payments that succeed after stock is no longer available
- [x] On successful payment, atomically decrement product stock and consume its reservation; mark the order `pending_refund` if stock cannot be consumed
- [x] Release active reservations on explicit cancellation; retryable payment failures keep their reservation, and expired reservations stop counting toward available stock
- [ ] Server-side repricing: never trust prices coming from the client
- [ ] Stripe PaymentIntent + Payment Element
- [ ] Stripe webhook as the source of truth for payment state and automatic full refunds for `pending_refund` orders
- [ ] Pass a 20-minute TTL when reserving stock; cancel or invalidate the PaymentIntent when its reservation expires
- [ ] Order confirmation email via Resend (re-add the dependency at that point)
- [ ] Order page protected by an access token
- [ ] Admin CRUD for products and orders
- [ ] Real IVA and shipping rules for Spain
- [ ] Legal pages: terms, privacy, cookies, and returns/withdrawal policy
- [ ] Replace the provisional Origen image
- [ ] Add real video assets, or remove the `<video>` in `components/home/product-showcase.tsx`

## Post-payment lifecycle (after checkout is implemented)

Planned return and refund policy; validate it with a legal advisor before launch:

- If payment succeeds but stock cannot be consumed, automatically refund the full payment, including initial shipping.
- Before shipment, if the customer removes some units, refund only those units' product price. Do not refund shipping, and return the units to stock.
- For withdrawal of a non-personalized product within the applicable period, refund the product price and initial shipping. The customer pays return shipping.
- A Bible personalized by writing the customer's requested name on its first page is planned to be non-returnable. Collect the requested name for each personalized order item.
- Show the returns policy before payment. Keep the returns policy separate from the privacy policy.

Implementation tasks:

- [ ] Add a nullable personalization value to `order_items` and collect the requested name in the checkout form per item
- [ ] Add a return/refund record that tracks affected order items, quantities, amounts, and Stripe refund IDs; support idempotent partial refunds
- [ ] Add a refund operation that only allows pre-shipment item removals while the order is paid, refunds item value only, and restores stock atomically
- [ ] Add a return flow for eligible non-personalized products; restore stock after the returned item is received and inspected, and refund product price plus initial shipping
- [ ] Track shipping/fulfillment separately from payment status (for example, a `shipping_status` field or a `shipments` table)
- [ ] Publish the returns policy and clearly disclose customer-paid return shipping before payment
- [ ] Confirm the withdrawal period, refund obligations, and personalized-goods exception with a legal advisor

## UI/UX Improvements

### High — Material UX harm

- [ ] `cart-drawer.tsx` and `cart-page-client.tsx` — No undo/confirmation on item removal ($80–$200+ items)

### Medium — Accessibility

- [ ] `cart-drawer.tsx` — "Eliminar artículo" aria-label is generic, should include product name
- [ ] `not-found.tsx` — Decorative "404" `<p>` is not `aria-hidden`
- [ ] `site-shell.tsx` — No `id="main-content"` on `<main>` and no skip-to-main-content link
- [ ] `layout.tsx` — Page title uses `--` instead of `–` or `|`

### Medium — Consistency

- [ ] `globals.css` — Dark mode `.dark` class is never toggled; no `prefers-color-scheme` media query fallback; no UI toggle
- [ ] `globals.css` — Global heading/paragraph base styles largely overridden everywhere; clean up or remove dead CSS
- [ ] Eyebrow label sizes inconsistent across sections (`text-xs` vs `text-sm`)

### Low — Polish & Animations

- [ ] `hero.tsx` — No entrance animation on hero text
- [ ] Add `loading.tsx` root route segment for global page transition indicator

## Pre-launch

- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel env vars (production project)
