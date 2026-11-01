# TODOs

## Cart

- [ ] User can add/remove items to the cart
  - [ ] User can update items inside the cart
  - [ ] Check stock availability before adding it to the cart
  - [ ] Display stock count for items?? or just if it's available or not

## Stripe + Supabase migration

Checkout is intentionally disabled (cart buttons show "Pago próximamente"). It will be rebuilt from scratch on Stripe + Supabase.

- [ ] Supabase tables: `orders`, `order_items`, `stock_reservations`, `stripe_events`
- [ ] Server-side repricing: never trust prices coming from the client
- [ ] Stripe PaymentIntent + Payment Element
- [ ] Stripe webhook as the source of truth for payment state
- [ ] Order confirmation email via Resend (re-add the dependency at that point)
- [ ] Order page protected by an access token
- [ ] Admin CRUD for products and orders
- [ ] Real IVA and shipping rules for Spain
- [ ] Legal pages: terms, privacy, cookies, 14-day withdrawal
- [ ] Replace the provisional Origen image
- [ ] Add real video assets, or remove the `<video>` in `components/home/product-showcase.tsx`

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
