# Copilot Review Guidance

- This project is a Spanish-language storefront; keep user-facing copy in Spanish.
- Prices are stored as integer EUR cents. Never trust client-provided prices.
- `lib/database.types.ts` is generated with `pnpm db:types`; do not edit it manually.
- Supabase public tables require RLS and least-privilege grants. Never expose a secret/service role key to the browser.
- Order and stock reservation status constants in `lib/order-status.ts` must match PostgreSQL CHECK constraints and pgTAP tests.
- Stock reservations must remain atomic under concurrent requests; review row locking and reservation expiry behavior carefully.
- Payment state must be driven by verified Stripe webhooks, not client redirects.
- Checkout is intentionally disabled until the Stripe flow is implemented.
