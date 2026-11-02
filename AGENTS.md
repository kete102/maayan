# Maayan — AGENTS.md

## Stack

- **Next.js 16** App Router, React 19, TypeScript (strict)
- **pnpm** (has `pnpm-lock.yaml`; `pnpm-workspace.yaml` only allows `sharp` builds)
- **Tailwind CSS 4** — uses `@import 'tailwindcss'` + `@theme inline` + `@custom-variant dark` (no old `@tailwind` directives)
- **pnpm** for all package management
- **Motion** for scroll-aware header behavior and reduced-motion-aware section reveals

## Commands

| Command      | Notes                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| `pnpm dev`   | Next.js dev server                                                            |
| `pnpm build` | **Ignores TS errors** (`next.config.mjs: typescript.ignoreBuildErrors: true`) |
| `pnpm start` | Production server                                                             |
| `pnpm lint`  | ESLint                                                                        |

No JavaScript test runner or dedicated typecheck script. Prettier is installed; run `pnpm exec prettier` directly if needed.

## Architecture

- Single-package Next.js app under `/app` (Spanish-language e-commerce for premium Bibles)
- Products live in the Supabase `products` table, read with the publishable key via `lib/db/public.ts` + `lib/products.ts` (server-only); prices are EUR cents, formatted with `lib/money.ts`
- Cart is client-side: `CartProvider` (context) wraps the root layout, persists to localStorage key `maayan_cart_v2`, and holds the DB `Product` shape; `useCart()` throws if used outside it
- Checkout/payment is intentionally disabled (Stripe planned, not implemented); cart buttons show "Pago próximamente". There is no payment, order, or email code
- Server components by default; `'use client'` only on interactive components: `site-header`, `cart/cart-provider`, `cart/cart-drawer`, `cart/cart-page-client`, `cart/add-to-cart-button`, `home/product-showcase`, `motion/reveal`
- Path alias `@/*` → project root
- Vercel Analytics via `@vercel/analytics/next` (production only)

## Supabase

- Env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (legacy fallback `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Never commit key values
- Local stack: `pnpm exec supabase start`; migrations in `supabase/migrations`, seed in `supabase/seed.sql`
- Regenerate DB types: `pnpm db:types` (always generate from local migrations; do not hand-edit `lib/database.types.ts`)
- Database integration tests use pgTAP in `supabase/tests`; run with `pnpm exec supabase test db --local`
- Order and stock-reservation statuses are runtime constants/types in `lib/order-status.ts`, mirrored by PostgreSQL CHECK constraints; update both when statuses change, and verify database behavior with pgTAP
- Local env override goes in gitignored `.env.development.local`; it is not loaded by `pnpm build` (the client is created lazily at request time)
- The remote project is linked: never run `db reset --linked` or `db push` without explicit approval

## Key conventions

- **CSS**: Tailwind 4 theme tokens in `globals.css`; canyon palette and `glass` utility; `cn()` from `lib/utils.ts` for class merging
- **Fonts**: Cormorant Garamond (serif/heading), Jost (sans), Geist Mono (mono) via CSS variables
- **Language**: Spanish (`es`) in `<html lang="es">`; prices formatted with `es-ES` locale
- **Theme**: fixed dark canyon palette; no light/dark toggle
- **Icons**: `lucide-react`
- **Button variants**: local `Button` component with `default`, `outline`, `solid`, and `glass` variants

## Gotchas

- `typescript.ignoreBuildErrors: true` — build will not catch type errors; run `tsc --noEmit` manually if type-checking is needed
- No test infrastructure exists; use lint and `pnpm exec tsc --noEmit` for available automated checks
- Cart drawer scroll lock uses `document.body.style.overflow` directly
