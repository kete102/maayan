# TODOs

- User can add/remove items to the cart
  - User can update items inside the cart
  - Check stock availability before adding it to the cart
  - Display stock count for items?? or just if it's
    available or not

## PayPal Checkout — Full REST Implementation (Path B)

- [x] Remove `@paypal/react-paypal-js` SDK dependency from `package.json`
- [ ] `lib/paypal.ts` — update `createPaypalOrder()`:
  - [x] Accept cart items as a parameter (replace hardcoded T-shirt)
  - [x] Generate unique `invoice_id` with `crypto.randomUUID()` (replace hardcoded `"1"`)
  - [x] Add `application_context` with `return_url` and `cancel_url`
  - [x] Return the approval URL from PayPal's `links` array (`rel: "approve"`)
  - [x] Remove unused `readline` import
- [x] `app/api/paypal/create-order/route.ts` — accept `items` in request body, forward to `createPaypalOrder()`, return approval URL to frontend
- [x] `components/paypal/paypal-checkout.tsx` — replace entire component:
  - [x] Remove all `@paypal/react-paypal-js` imports
  - [x] Add a custom styled button
  - On click: POST to `/api/paypal/create-order` with amount + items, then `window.location.href = approvalUrl`
  - Add loading state while order is being created
  - Add error state if API call fails
- [ ] `components/cart/checkout-client.tsx`:
  - Pass real computed `total` to `<PaypalCheckout>` (replace hardcoded `"20.00"`)
  - Pass cart items from `useCart()` as a prop
- [ ] `app/checkout/success/page.tsx` — new page (client component):
  - Read `token` (orderID) and `PayerID` from query params
  - POST to `/api/paypal/capture-order` with the orderID
  - Call `clearCart()` on success
  - Show order confirmation UI
- [ ] `app/checkout/cancel/page.tsx` — new page:
  - Show cancellation message
  - Provide link back to cart
- [ ] `app/api/paypal/webhook/route.ts` — implement webhook handler:
  - Verify PayPal signature from request headers
  - Handle `PAYMENT.CAPTURE.COMPLETED` event
  - Handle `PAYMENT.CAPTURE.DENIED` event
  - Return `200` quickly
  - Add `PAYPAL_WEBHOOK_ID` env var (from PayPal developer dashboard)
