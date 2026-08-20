<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# portfolio.dev — Agent Guide

Personal portfolio + blog for Issam Seghir. `CLAUDE.md` imports this file (`@AGENTS.md`). Prefer this guide over generic Next.js habits.

## Stack

| Piece | Version / notes |
| ----- | --------------- |
| Next.js | `16.3.1` (App Router, Turbopack) |
| React | `19.2.x` |
| Node | `>=24` — keep `@types/node` on **24.x**, not 26 |
| Package manager | **pnpm** `10.28.2` only (not npm/yarn; do not bump to pnpm 11 unless asked) |
| TypeScript | **5.9.x** — do not jump to TS 6/7 (breaks Next / ESLint / Knip) |
| Auth | better-auth + Drizzle |
| API | oRPC (`src/orpc`) |
| i18n | next-intl — locales `en` \| `ar` (RTL) |
| Content | Content Collections + MDX |
| UI | shadcn-style under `src/components/ui/` on **Base UI** (`@base-ui/react`), some Ark UI |
| DB | Drizzle ORM + Postgres |
| Email | `react-email` (import from `react-email`, not `@react-email/components`) |

Env loading: scripts use `pnpm with-env` → `dotenvx` + `.env.local`. Prefer those scripts over bare `drizzle-kit` / `vitest`.

## Layout (`src/`)

- `app/[locale]/` — App Router; groups `(main)`, `(admin)`, `(account)`, `(unsubscribe)`
- `components/` — features; `components/ui/` — primitives (knip-ignored)
- `i18n/` — routing, request config, messages
- `db/` — schemas, migrations (`src/db/migrations`), seed/reset
- `orpc/` — routers, schemas, client (`src/orpc/routers/index.ts` is the barrel)
- `lib/` — auth, env, integrations (R2, Resend, PostHog, …)
- `content/` — MDX for blog / projects / pages (`{locale}/{slug}.mdx`)
- `emails/` — React Email templates
- `tests/unit`, `tests/e2e` — Vitest / Playwright
- Root request proxy: `src/proxy.ts` (i18n + CSP) — not a classic `middleware.ts`

Path aliases: `@/*` → `src/*`, `content-collections` → generated output.

## Hard rules (ESLint-enforced)

1. **Links / navigation**
   - Do **not** default-import `next/link` → use `@/components/ui/link`
   - Do **not** import `usePathname`, `useRouter`, `redirect`, `permanentRedirect` from `next/navigation` → use `@/i18n/routing`
   - No Pages Router (`next/router`)

2. **i18n**
   - Messages live in `src/i18n/messages/en.json` and `ar.json` — keep keys in sync (`pnpm check:i18n`)
   - Project MDX must exist for **both** `en` and `ar` (`pnpm check:projects:parity`)
   - Routing: `localePrefix: 'as-needed'`, default `en`

3. **`src/i18n/request.ts`**
   - Use **`requestLocale`** (and optional locale overrides)
   - **Never** import `next/root-params` in this module — Next throws when it is pulled into the middleware / Edge graph
   - Do not “fix” the deprecation by switching to root-params without verifying middleware still boots

4. **UI**
   - Class merging: `@/utils/cn` (not `@/lib/utils`)
   - Prefer `@/components/ui/spinner` over raw Lucide `LoaderIcon` for loading states
   - Base UI uses `render` / `mergeProps`, not Radix `asChild`
   - Image `quality` must be in `images.qualities`: **`[75, 90, 100]`** (`next.config.ts`)

5. **Database**
   - `DATABASE_URL` must **not** include `?schema=public` (postgres.js mis-parses it)
   - Create the database first — `pnpm db:migrate` will not create it
   - Docker Compose default: `postgresql://postgres:postgres@localhost:5433/portfolio`
   - Schema changes → `pnpm db:generate` then `pnpm db:migrate` (do not hand-edit applied migrations lightly)
   - Better Auth accounts require `issuer` (see migration `0007_*`)

6. **Dev servers**
   - `pnpm dev` — Portless (global CLI); URL like `http://portfolio-dev.localhost:1355`
   - `pnpm dev:direct` — `http://localhost:3005` (required for Playwright E2E)
   - Keep `NEXT_PUBLIC_SITE_URL` aligned with how you actually open the app

## Commands

```bash
pnpm check          # lint + typecheck + format + knip + i18n + project parity + spell
pnpm typecheck
pnpm lint           # --max-warnings 0
pnpm test:unit
pnpm test:e2e       # uses dev:direct on :3005
pnpm db:migrate
pnpm db:studio
pnpm project:new    # scaffold bilingual project MDX
```

After substantive edits, run at least `pnpm typecheck` and `pnpm lint`. Prefer `pnpm check` before finishing a large task.

## Content & features

- Blog / projects / pages: Content Collections (`content-collections.ts` uses `content: [...]`, not deprecated `collections`)
- Unfinished surfaces (blog listing / store) may show `Soon` in **production** only
- RPC surface: github, view, like, comment, reply, message, admin, auth, settings, unsubscribe, r2 — register new routers in `src/orpc/routers/index.ts`

## Agent habits for this repo

- Use **pnpm**, never invent npm scripts that skip `with-env` when env is required
- Do not upgrade TypeScript to 6/7 or pnpm to 11 unless explicitly requested
- Do not commit secrets (`.env.local`); commit when the user asks
- Keep the `<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END:nextjs-agent-rules -->` block intact so `next dev` does not rewrite the file
- Leave `CLAUDE.md` as `@AGENTS.md` so Claude Code always loads this guide
- Skills under `.agents/skills/` (e.g. shadcn) apply when touching UI primitives
