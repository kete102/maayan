# Maayan — AGENTS.md

## Stack

- **Next.js 16** App Router, React 19, TypeScript (strict)
- **pnpm** (has `pnpm-lock.yaml`; `pnpm-workspace.yaml` only allows `msw`/`sharp` builds)
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

No test runner or dedicated typecheck/format script. Prettier is installed; run `pnpm exec prettier` directly if needed.

## Architecture

- Single-package Next.js app under `/app` (Spanish-language e-commerce for premium Bibles)
- Static product data in `lib/products.ts`; Supabase stores captured orders
- PayPal checkout is handled by route handlers under `app/api/paypal/`; `lib/paypal.ts` contains the API integration
- Resend sends order confirmation email from `lib/email.tsx` after successful capture and order persistence
- `CartProvider` (context) wraps the root layout; `useCart()` throws if used outside it
- Server components by default; `'use client'` only on interactive components (cart, checkout)
- Path alias `@/*` → project root
- Vercel Analytics via `@vercel/analytics/next` (production only)

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
- `generateStaticParams` in `app/product/[slug]/page.tsx` — static generation for all products
