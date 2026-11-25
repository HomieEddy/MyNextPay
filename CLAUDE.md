# NextPay

NextPay is a self-hosted personal cash-flow PWA built around paydays instead of calendar months. It answers one question: **how much can I safely spend before my next payday?** One person uses it, from a phone and a computer. It runs on their homelab and keeps all data on that server.

- Product spec: `PRD.md`. Where this file and the PRD disagree, **this file wins** (see "Decisions that override the PRD").
- Approved design: `docs/design/mockup.html`. Open it in a browser. It is the visual source of truth for layout, color, copy tone and motion. Match it; don't redesign.

## Keep it simple (most important rule)

Clean, simple, boring code beats clever code. When in doubt, write less.

- **One job per unit.** A function, component, server action or file does one thing. If you need "and" to describe it, split it.
- **Small files.** Aim for under ~100 lines per file; treat 150 as a hard signal to split. One component per file, one server action per file.
- **Flat logic.** No more than two levels of nesting. Use early returns, guard clauses and small helper functions instead of nested `if`/`else`, nested ternaries or long `switch` blocks.
- **No over-engineering.** No abstractions, generics, factories, options objects or config layers until there are at least two real uses. No "just in case" parameters. Three similar lines are fine; a premature helper is not.
- **Dumb, reusable components.** Components in `components/ui/` and `components/features/` receive data and callbacks through props and render them. They don't fetch data, call server actions, read the database or hold business logic. Only route files (`page.tsx`, `layout.tsx`) and a thin container per screen fetch data and wire actions to components.
- **Logic lives in `domain/`,** as small pure functions. A component shows a number; it never calculates it.
- **Server actions are thin:** validate input, call one repo function (or one domain function plus one repo function), revalidate, return. If an action needs to do several things, the extra steps belong in a domain or repo function with its own test.
- **Clear names over comments.** `billsStillDue(cycle, items)` needs no comment; `calc(c, i)` needs a rename.

## Commands

```bash
pnpm dev            # dev server on http://localhost:3000
pnpm build          # production build (standalone output)
pnpm start          # run the production build
pnpm test           # Vitest, run once
pnpm test:watch     # Vitest, watch mode
pnpm e2e            # Playwright end-to-end tests (pass --trace off unless debugging)
pnpm check          # Biome lint + format check
pnpm fix            # Biome lint + format, write fixes
pnpm typecheck      # tsc --noEmit
pnpm db:generate    # Drizzle: create a migration from schema changes
pnpm db:migrate     # Drizzle: apply migrations (the app also migrates itself on start)
pnpm db:seed        # load the sample data set into DATABASE_PATH
docker compose up --build   # run the production image locally
```

Before saying a task is done, run: `pnpm typecheck && pnpm check && pnpm test`. Run `pnpm e2e` when you touched a user flow.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16, App Router, React 19, TypeScript in strict mode |
| Database | SQLite through `better-sqlite3`, with Drizzle ORM and drizzle-kit migrations |
| Validation | Zod 4, at every boundary (forms, server actions, backup import) |
| Auth | One password, hashed with `@node-rs/argon2`. Sessions are rows in SQLite behind an httpOnly cookie |
| Styling | Tailwind CSS 4, with design tokens defined once in `src/app/globals.css` under `@theme` |
| Motion | `motion` (Motion for React) for sheets, springs and number count-ups. Plain CSS for simple transitions |
| Charts | Hand-written SVG (donut) and HTML bars. No chart library |
| PWA | `app/manifest.ts` plus Serwist (`@serwist/next`) for the service worker |
| Dates | `date-fns`, operating on plain calendar dates (see "Money and dates") |
| Tests | Vitest for unit and integration tests, Playwright for end-to-end |
| Lint/format | Biome (one tool, no ESLint or Prettier) |
| Package manager | pnpm |
| Deploy | One Docker image (Next.js `output: "standalone"`), SQLite file on a mounted volume |

Don't add a dependency without a clear reason. Prefer a 30-line utility over a new package.

## Next.js 16 notes

- Read `AGENTS.md`: Next 16 differs from older versions, and its docs ship in `node_modules/next/dist/docs/`. Check them before using an API you're unsure about.
- `cacheComponents` is **off**. Every signed-in page is rendered per request, which is right for a one-person app and keeps things simple. Pages that touch the database without reading cookies need `export const dynamic = "force-dynamic"` (the route group layouts already set it).
- Middleware is called `proxy.ts` (in `src/`). It only does a quick cookie check; pages verify the session with `requireSession()`.

## Architecture

```
src/
  app/                    # Next.js routes only: pages, layouts, route handlers, server actions
    (auth)/login/
    (auth)/onboarding/
    (app)/                # everything behind the session check
      page.tsx            # Home (dashboard)
      cycles/  calendar/  recurring/  settings/
    api/health/route.ts   # Docker healthcheck
    manifest.ts
    sw.ts                 # Serwist service worker entry
  domain/                 # PURE business logic. No React, no DB, no Next imports.
    money.ts              # cents helpers, formatting
    dates.ts              # calendar-date helpers (ISO yyyy-mm-dd)
    cycles.ts             # pay cycles from anchor + frequency
    schedules.ts          # expand recurring schedules into occurrences
    safe-to-spend.ts      # the formulas for Simple and Ledger modes, daily allowance
    status.ts             # healthy / tight / deficit
    forecast.ts           # next N cycles (step 3)
  server/                 # server code. Auth and actions import "server-only"; db and repos don't, so scripts and tests can use them
    db/schema.ts  db/client.ts
    sample/               # the sample data set (same as the mockup) and its loader
    repos/                # one file per table group; the only code that touches Drizzle
    auth/                 # password hashing, sessions, requireSession()
    actions/              # server actions, one per file, grouped by feature (actions/bills/mark-paid.ts)
    backup/               # export and import (versioned JSON)
  components/
    ui/                   # design-system primitives: Sheet, Card, Chip, Segmented, Switch, AmountInput, Ring
    features/             # feature components: SafeToSpendHero, CardStack, BillsSheet, CalendarMonth...
  lib/                    # small shared client/server utilities (cn(), useReducedMotion wrapper)
tests/
  e2e/                    # Playwright specs
```

**Rules for the layers:**

1. `domain/` is pure TypeScript. Functions take plain data and return plain data. It is the most important code in the app and is fully covered by unit tests. Both server and client may import it.
2. Only `server/repos/` talks to the database. Pages and actions call repos; they never write Drizzle queries inline.
3. Reads happen in **Server Components**. Mutations happen in **Server Actions** in `server/actions/`. Avoid API route handlers except `/api/health` and the backup download.
4. Every server action: (a) calls `requireSession()`, (b) parses input with a Zod schema, (c) calls repos, (d) calls `revalidatePath`, (e) returns `ActionResult<T>` = `{ ok: true, data } | { ok: false, error: string, fieldErrors? }`. Never throw to the client for expected failures.
5. Use `"use client"` only on components that need state, effects, gestures or animation. Keep them small and push data fetching up to a Server Component parent.
   Example of the split: `app/(app)/page.tsx` loads settings and items through repos, calls `domain/safe-to-spend.ts`, and passes plain numbers to `<SafeToSpendHero amount={…} status={…} daysLeft={…} />`. The hero only renders.
6. `proxy.ts` (Next 16's name for middleware) redirects to `/onboarding` when no user exists, to `/login` when there's no valid session, and away from both when signed in.

## Domain rules (do not break these)

- **A cycle runs from one payday to the day before the next.** It's derived from the anchor payday and the frequency (weekly, biweekly, monthly). Cycles are computed, not stored.
- **Cycles are self-contained.** A surplus or shortfall never carries into the next cycle. Every payday restarts the math.
- **Two tracking modes,** chosen in onboarding and switchable in Settings:
  - **Simple** (default): `safeToSpend = cycle income − cycle bills − unexpected expenses`. Recurring bills log themselves. The user logs only big one-off "unexpected expenses" (a car repair, not lunch). No bank balance. Daily budget = `safeToSpend / cycle length in days`.
  - **Ledger**: `balance = opening balance + every logged entry since (income +, spending and bill payments −)`, then `safeToSpend = balance + income still expected this cycle − bills still unpaid this cycle`. The user logs every transaction. Daily allowance = `safeToSpend / days left`.
- **Status:** `healthy` when safeToSpend ≥ floor, `tight` when 0 ≤ safeToSpend < floor, `deficit` when safeToSpend < 0. Always show the label text, never color alone.
- **Paying a bill doesn't change safe-to-spend.** The money was already reserved. Marking paid only changes its state (and in Ledger mode, records the payment).
- **Auto-pay bills** are marked paid automatically once their due date arrives (computed on read, not by a cron job).
- **Schedules:** a weekday every 1 to 4 weeks, a day of the month (1st to 31st; months without that day use their last day), or every N days from a start date.
- **Every figure is traceable.** Anything that shows a total must be able to show the items that make it up.

Each rule above needs at least one unit test in `domain/`. When you change a rule, change its test first.

## Money and dates

- **Money is integer cents** (`number`, always whole) everywhere: database, domain, props. Never store or add floats. Convert at the edges only: `parseAmount("12.50") → 1250` in input handling, `formatMoney(1250) → "$12.50"` in display. Currency is CAD, formatted with `Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" })`.
- **Dates are calendar dates**, stored as ISO `"yyyy-mm-dd"` strings with no time and no time zone. Paydays and due dates are days, not instants. Only `createdAt`/`updatedAt` audit columns use timestamps.
- "Today" comes from one place, `domain/dates.ts#today(tz)`, using the server's configured `TZ` (default `America/Toronto`). Domain functions take `today` as a parameter so tests can fix it.

## Database

- Schema in `src/server/db/schema.ts`; migrations in `drizzle/` at the repo root (copied into the Docker image). Tables (starting point): `user` (single row: password hash, name), `session`, `settings` (pay profile, mode, floor, warning on/off), `recurring_item` (bill or income stream, schedule, auto-pay), `bill_payment` (item id + occurrence date + paid at), `transaction` (one-off; kind: expense, income, unexpected), `meta` (schema version).
- Change the schema, then `pnpm db:generate --name <what-changed>`, then commit the generated migration. Never edit an applied migration.
- Tests use `createDb(":memory:")`, which applies all migrations to a fresh in-memory database.
- Migrations run automatically on server start.
- Database path comes from `DATABASE_PATH` (default `./data/nextpay.db`; `/data/nextpay.db` in Docker). Enable WAL mode.
- Backups: a versioned JSON export of every table (`{ version, exportedAt, data }`). Import validates with Zod and replaces everything in one transaction.

## Security

- Self-hosted but reachable from a phone, so treat it as internet-facing.
- Passwords hashed with argon2id. Never log passwords, hashes, session ids or amounts.
- Session cookie: `httpOnly`, `secure` in production, `sameSite: "lax"`, fixed 30-day expiry. Store only a hash of the session token in the database.
- Rate-limit login attempts (in-memory, per IP: 5 per 15 minutes).
- Server actions check the session themselves; never rely on the proxy alone.
- Session tokens are random and only their hash is stored, so no signing secret is needed. Config comes from env (see `.env.example`); never commit `.env`.

## UI and design system

Match `docs/design/mockup.html`. Key tokens (define in `@theme`, use by name, never hard-code hex in components):

| Token | Value | Use |
|---|---|---|
| `--color-screen` | `#F4F5F2` | App background (mist grey) |
| `--color-card` | `#FFFFFF` | Cards, lists, inputs |
| `--color-ink` | `#18201C` | Text |
| `--color-mute` | `#5A645E` | Secondary text |
| `--color-line` | `#DCE0DA` | Dividers, input borders |
| `--color-green` / `-soft` | `#2E6A4E` / `#DCEADF` | Healthy, primary actions, income |
| `--color-orange` / `-ink` / `-soft` | `#D9661F` / `#9A4510` / `#FBE6D6` | Bills, attention, add button, tight status |
| `--color-red-ink` / `-soft` | `#A3261A` / `#F8DDD9` | Deficit |
| `--color-char` | `#3B433F` | Spending card, secondary chart slice |

- **Light theme only** for now. Keep colors in tokens so dark mode can come later.
- Font: Inter (via `next/font`). All amounts use `tabular-nums` and never wrap.
- Mobile first: design at 390px wide, bottom tab bar on phones, sidebar layout at ≥1024px.
- Patterns from the mockup: big safe-to-spend hero; Wallet-style stacked cards that open bottom **sheets**; segmented controls; iOS-style grouped lists in Settings; switches.
- **Motion:** number count-up on change, ring fill, cards rising in, sheets springing up, bills ticking off with a small pop. Wrap the app in `<MotionConfig reducedMotion="user">` and make sure every animation is also off under `prefers-reduced-motion`. Animate only `transform` and `opacity`.
- **Accessibility:** real `<button>`, `<a>`, `<input>` and `<label>` elements; 44px minimum touch targets; visible focus rings; text contrast ≥ 4.5:1; sheets are dialogs that trap focus and close on Escape; icon-only buttons need `aria-label`. Status is never shown by color alone.
- Keyboard: `1`–`5` switch tabs, `?` opens help, `Esc` closes sheets.
- Copy: short, plain, sentence case, no exclamation marks, no emoji. Say "safe to spend", "floor", "cycle", "payday" consistently.

## Code style

- TypeScript strict. No `any`, no non-null `!` assertions, no `@ts-ignore`. Use `unknown` and narrow.
- Named exports only (except where Next requires a default export: pages, layouts, `manifest.ts`).
- Files: `kebab-case.ts` for modules, `PascalCase.tsx` for components. One component per file.
- Functions over classes. Small, pure functions in `domain/`; no hidden reads of the clock or the database there.
- Props: pass plain values and `onSomething` callbacks. Prefer several small props over one big object; avoid boolean props that switch a component between two different behaviours (make two components instead).
- Types: `type` for data shapes, inferred from Zod (`z.infer`) or Drizzle (`$inferSelect`) where possible. Don't hand-duplicate a shape that a schema already defines.
- Early returns over nested `if`s. No comments that restate the code; comment only the *why*.
- Errors: expected failures return `ActionResult` errors with a human message; unexpected ones throw and are caught by `error.tsx`.
- No `console.log` left in committed code. Use a tiny `logger` in `server/` if you need logs.

## Claude Code setup

Plugins this project uses (enabled in `.claude/settings.json`): **frontend-design**, **typescript-lsp**, **feature-dev**, **security-guidance**, **playwright**, plus **docker-skills** from the plugin directory. Built-in commands to use: `/code-review` before opening a PR, `/security-review` on anything touching auth, sessions or backups, `/simplify` when a file grows past the size limits, and `/run` to check a change in the real app.

## Testing

- `domain/`: unit tests next to the file (`cycles.test.ts`). Cover month ends (31st in February), leap years, a cycle that crosses a year boundary, weekly/biweekly/monthly anchors, Simple vs Ledger formulas, and each status threshold.
- `server/repos/` and `server/actions/`: integration tests against an in-memory SQLite database with migrations applied.
- `tests/e2e/`: Playwright builds the app, starts it on port 3100 with a fresh database in `data/e2e/`, and runs at an iPhone viewport. Set `CHROMIUM_PATH` to use an already-installed Chromium. It covers onboarding (both modes), logging an unexpected expense, marking a bill paid, editing a recurring item, login and logout, and backup round-trip. Run at a 390×844 viewport.
- Fix a bug by first writing a test that fails.

## Git workflow

- Branch per feature: `feat/…`, `fix/…`, `chore/…`. Open a PR into `main`; don't push to `main` directly.
- Conventional commits (`feat: add cycle navigator`). Small commits that each pass typecheck, lint and tests.
- Never commit `.env`, `data/`, or database files.

## Deployment (homelab)

- `Dockerfile`: multi-stage on `node:22-bookworm-slim` (needed for `better-sqlite3`'s native build), runs as a non-root user, exposes 3000, `HEALTHCHECK` on `/api/health`.
- `compose.yaml`: one service, volume `./data:/data`, env `TZ` and `TRUST_PROXY`, `restart: unless-stopped`.
- HTTPS is required for PWA install on a phone. Put a reverse proxy (Caddy, Traefik, Nginx Proxy Manager) or Tailscale in front. The app trusts `X-Forwarded-Proto` only when `TRUST_PROXY=true`.

## Decisions that override the PRD

1. **Self-hosted server with SQLite**, not browser-only storage, so phone and computer share the same data.
2. **Password login** (single user). The PRD's "no accounts" still holds: there's no sign-up and no multi-user support.
3. **Light theme only** for the first version. The PRD's light/dark/system setting comes later.
4. **Two tracking modes (Simple and Ledger).** The PRD describes only the ledger.
5. **Onboarding** on first run: welcome, password, pay, tracking mode, balance (Ledger only), bills, floor, then a reveal of the first safe-to-spend number.

## Out of scope (don't build)

Bank connections, transaction import, multiple users, sharing, investing or net-worth tracking, push notifications, gamification, dark mode (for now).
