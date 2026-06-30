# Maayan — AGENTS.md

## Stack

- **Next.js 16** App Router, React 19, TypeScript (strict)
- **pnpm** (has `pnpm-lock.yaml`; `pnpm-workspace.yaml` only allows `msw`/`sharp` builds)
- **Tailwind CSS 4** — uses `@import 'tailwindcss'` + `@theme inline` + `@custom-variant dark` (no old `@tailwind` directives)
- **shadcn/ui** `base-nova` style — uses `@base-ui/react` (not `@radix-ui/react`)
- **pnpm** for all package management

## Commands

| Command | Notes |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | **Ignores TS errors** (`next.config.mjs: typescript.ignoreBuildErrors: true`) |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint (no config file found; may be inherited) |

No test runner, no formatter, no dedicated typecheck script.

## Architecture

- Single-package Next.js app under `/app` (Spanish-language e-commerce for premium Bibles)
- Static product data in `lib/products.ts` (no database)
- `CartProvider` (context) wraps the root layout; `useCart()` throws if used outside it
- Server components by default; `'use client'` only on interactive components (cart, checkout)
- Path alias `@/*` → project root
- Vercel Analytics via `@vercel/analytics/next` (production only)

## Key conventions

- **CSS**: shadcn CSS variables in `globals.css` with `@theme inline`; custom `--gold`, `--ocean`, `--sand` tokens; `cn()` from `lib/utils.ts` for class merging
- **Fonts**: Cormorant Garamond (serif/heading), Jost (sans), Geist Mono (mono) via CSS variables
- **Language**: Spanish (`es`) in `<html lang="es">`; prices formatted with `es-ES` locale
- **Dark mode**: `.dark` class strategy
- **Icons**: `lucide-react`
- **Button variants**: standard shadcn + custom `"solid"` and `"glass"` variants

## Gotchas

- `typescript.ignoreBuildErrors: true` — build will not catch type errors; run `tsc --noEmit` manually if type-checking is needed
- No test infrastructure exists; verification is manual or lint-only
- Cart drawer scroll lock uses `document.body.style.overflow` directly
- `generateStaticParams` in `app/product/[slug]/page.tsx` — static generation for all products
