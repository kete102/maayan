# TODOs

## Cart

- [ ] User can add/remove items to the cart
  - [ ] User can update items inside the cart
  - [ ] Check stock availability before adding it to the cart
  - [ ] Display stock count for items?? or just if it's available or not

## PayPal Checkout — Full REST Implementation (Path B)

- [x] Remove `@paypal/react-paypal-js` SDK dependency from `package.json`
- [x] `lib/paypal.ts` — update `createPaypalOrder()`:
  - [x] Accept cart items as a parameter (replace hardcoded T-shirt)
  - [x] Generate unique `invoice_id` with `crypto.randomUUID()` (replace hardcoded `"1"`)
  - [x] Add `application_context` with `return_url` and `cancel_url` from `NEXT_PUBLIC_BASE_URL`
  - [x] Return the approval URL from PayPal's `links` array (`rel: "approve"`)
  - [x] Remove unused `readline` import
  - [x] Proper `breakdown` with `item_total`, `shipping`, and `tax_total`
  - [x] Format item prices with `.toFixed(2)`
- [x] `app/api/paypal/create-order/route.ts` — accept `cart_items`, `shipping`, `tax` in request body, forward to `createPaypalOrder()`, return approval URL to frontend
- [x] `app/api/paypal/capture-order/route.ts` — return 422 if `capture.status !== "COMPLETED"`
- [x] `components/cart/checkout-client.tsx`:
  - [x] Fix `total` calculation (`subtotal + shipping + tax`)
  - [x] Send real `total`, `shipping`, `tax`, and `cart_items` to create-order API
  - [x] Save cart to `sessionStorage` before redirect to PayPal
  - [x] Add loading and error state on the submit button
- [x] `app/checkout/success/page.tsx`:
  - [x] Read `token` (orderID) from query params with `useSearchParams`
  - [x] POST to `/api/paypal/capture-order` with the orderID
  - [x] Guard against double capture with `useRef`
  - [x] Call `clearCart()` and clear `sessionStorage` backup on success
  - [x] Show order confirmation UI with transaction ID, amount, payer name and email
  - [x] Proper `Suspense` boundary wrapping the client content
- [x] `app/checkout/cancel/page.tsx`:
  - [x] Restore cart items from `sessionStorage` backup on mount
  - [x] Show cancellation message with links to retry or keep browsing
- [ ] `app/api/paypal/webhook/route.ts` — implement webhook handler (not urgent, needed for production):
  - [ ] Verify PayPal signature from request headers
  - [ ] Handle `PAYMENT.CAPTURE.COMPLETED` event
  - [ ] Handle `PAYMENT.CAPTURE.DENIED` event
  - [ ] Handle `PAYMENT.CAPTURE.REVERSED` event
  - [ ] Return `200` quickly
  - [ ] Add `PAYPAL_WEBHOOK_ID` env var (from PayPal developer dashboard)

## Before going live

- [ ] Set `NEXT_PUBLIC_BASE_URL` to production domain in Vercel env vars
- [ ] Swap `PAYPAL_BASE_URL` to `https://api-m.paypal.com` (remove sandbox)
- [ ] Replace sandbox `NEXT_PUBLIC_PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` with production credentials
