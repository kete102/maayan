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

## UI/UX Improvements

### Critical — Broken or Misleading

- [ ] `hero.tsx` — Both CTA buttons ("Conócenos", "Nuestras Biblias") have no href, they do nothing on click
- [ ] `hero.tsx` — Trailing space in video `src` URL breaks loading in some browsers
- [ ] `product-detail.tsx` — Fake gallery images (water stock photos) shown as product images 2 and 3
- [ ] `product-reviews.tsx` — All product pages show the same 3 hardcoded reviews regardless of product
- [ ] `site-footer.tsx` — Support links ("Contacto", "FAQ", "Envíos") all route to `/about` (brand story page)
- [ ] `product-card.tsx` — Interactive button nested inside a `<Link>` (invalid HTML, breaks assistive tech)

### High — Material UX harm

- [ ] `cart-drawer.tsx` — Prices use raw `${}` template literals instead of `formatPrice()` (lines 115, 127)
- [ ] `product-detail.tsx` and `product-card.tsx` — Raw price formatting instead of `formatPrice()`
- [ ] `cart-drawer.tsx` and `cart-page-client.tsx` — No undo/confirmation on item removal ($80–$200+ items)
- [ ] `shop-client.tsx` — Filter and search state not reflected in URL (not shareable or bookmarkable)
- [ ] `site-header.tsx` — Search icon routes to `/shop` instead of opening a search UI; label says "Buscar" which is misleading
- [ ] `product-card.tsx` — "Add to cart" button uses hover-only visibility, completely hidden on touch/mobile devices
- [ ] `success-content.tsx` — Payment capture loading state is a bare text line with no spinner and no "don't close this page" warning
- [ ] `checkout/cancel/page.tsx` — Cart restore failure is silent; "items restored" copy shows unconditionally even if restore failed
- [ ] `order/[id]/page.tsx` — No `SiteShell` wrapper, page has no site header, footer or navigation
- [ ] `checkout-client.tsx` — Country and state are free-text inputs, should use a dropdown or `<datalist>`

### Medium — Accessibility

- [ ] `shop-client.tsx` — Custom filter checkboxes have no `focus-visible` ring for keyboard users
- [ ] `cart-drawer.tsx` and `shop-client.tsx` — Drawers are not `role="dialog"` with `aria-modal`, AT can reach background content
- [ ] `cart-drawer.tsx` — No `Escape` key handler to close the drawer
- [ ] `product-detail.tsx` — Product tabs have no ARIA semantics (`role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`)
- [ ] `site-header.tsx` — Mobile menu toggle missing `aria-expanded` and `aria-controls`
- [ ] `site-header.tsx` — Cart button `aria-label` doesn't include item count (e.g. "Abrir carrito, 3 artículos")
- [ ] `checkout-client.tsx` — Error message has no `role="alert"`, not announced to screen readers
- [ ] `cart-drawer.tsx` — "Eliminar artículo" aria-label is generic, should include product name
- [ ] `not-found.tsx` — Decorative "404" `<p>` is not `aria-hidden`
- [ ] `about/page.tsx` — Decorative pillar numbers ("01"–"05") not `aria-hidden`
- [ ] `newsletter.tsx` — On success, focus not moved to the success message; keyboard users are stranded
- [ ] `featured-collections.tsx` — `ArrowUpRight` icons not `aria-hidden`
- [ ] `site-shell.tsx` — No `id="main-content"` on `<main>` and no skip-to-main-content link
- [ ] `layout.tsx` — Page title uses `--` instead of `–` or `|`

### Medium — Consistency

- [ ] `globals.css` — Dark mode `.dark` class is never toggled; no `prefers-color-scheme` media query fallback; no UI toggle
- [ ] `globals.css` — Global heading/paragraph base styles largely overridden everywhere; clean up or remove dead CSS
- [ ] `hero.tsx` — Subtitle paragraph uses `font-bold`, every other body text in the codebase uses `font-light`
- [ ] Eyebrow label sizes inconsistent across sections (`text-xs` vs `text-sm`)
- [ ] `cart-page-client.tsx` order summary card is square-cornered; `checkout-client.tsx` order summary is `rounded-2xl` — should match

### Low — Polish & Animations

- [ ] `hero.tsx` — No entrance animation on hero text; no `poster` image on `<video>` (blank before video loads)
- [ ] `testimonials.tsx` — No scroll-triggered reveal animation; no reviewer avatars
- [ ] `newsletter.tsx` — Form → success state transition is instant with no animation
- [ ] `shop-client.tsx` — Filter results change with no transition; mobile filter drawer transition is 150ms vs cart drawer's 300ms
- [ ] `featured-products.tsx` and `product/[slug]/page.tsx` — `grid-cols-2` at 320–375px produces very narrow product cards
- [ ] `checkout/success/page.tsx` — Suspense fallback is a plain `<p>Cargando...</p>`, needs a spinner
- [ ] `brand-story.tsx` — About image has no hover effect; missing `priority` prop (above fold on large screens)
- [ ] `product-detail.tsx` — No transition when switching gallery images (instant swap)
- [ ] `product-detail.tsx` — No max quantity limit on the quantity stepper
- [ ] Add `loading.tsx` root route segment for global page transition indicator


- [ ] Set `NEXT_PUBLIC_BASE_URL` to production domain in Vercel env vars
- [ ] Swap `PAYPAL_BASE_URL` to `https://api-m.paypal.com` (remove sandbox)
- [ ] Replace sandbox `NEXT_PUBLIC_PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` with production credentials
