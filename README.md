# hirebuddha.com

The marketing website for **HireBuddha**, a product of Buddha Cognitive Lab Private Limited. Next.js 16 (App Router, Turbopack), React 19, every page statically generated except `/api/lead`.

> Next.js 16 differs from older versions. Check `node_modules/next/dist/docs/` before changing framework code (see `AGENTS.md`).

## Setup

```bash
npm ci
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and `tsc --noEmit` |
| `npm run smoke` | Checks a running build: every route at desktop and phone size, metadata, legal identity, placeholders, e-mail addresses, headers, the lead API and keyboard access. Set `BASE_URL` (default `http://localhost:3100`) and, if Playwright's Chromium isn't installed, `CHROMIUM_PATH` |
| `npm run sync:agent` | Copies the built Pragya SDK into `public/` (see below) |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, build and the smoke test on every push and pull request.

## Environment variables

All are listed in [`.env.example`](.env.example). `NEXT_PUBLIC_*` values are fixed at **build** time.

* **Pragya:** `NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS` (her backend), `NEXT_PUBLIC_FB_INTELLIGENCE`, `NEXT_PUBLIC_FB_DESIGN`. A production build without the backend shows "Pragya is offline" rather than connecting anywhere. Code defaults are `advance` / `level1`; `.env.example` uses `extreme` / `level3`.
* **Contact form:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `LEAD_TO` (default `contact@hirebuddha.com`), `LEAD_FROM`, `LEAD_ALLOWED_ORIGINS`. Without SMTP the form tells visitors to write to `contact@` instead of pretending to succeed.

## Where things live

| What | Where |
|---|---|
| Company identity (legal name, CIN, registered office, phone, mailboxes, Grievance Officer, app URLs) | `src/config/company.ts`, the single source. Also update `public/.well-known/security.txt` if the contact changes |
| Legal pages | Markdown in `src/content/legal/`, with `{{tokens}}` filled from the company config by `src/components/legal/LegalPage.tsx`. The sub-processor table is shared by `/privacy` and `/subprocessors`. Change `LEGAL_UPDATED` in the config when a text changes |
| Per-page metadata | `buildMetadata()` in `src/lib/metadata.ts` (title, description, canonical, Open Graph, Twitter). Every page must use it |
| Connections named on the site | `CONNECTIONS` in `src/lib/site.ts`. Name only what is built, and keep it in step with privacy section 6 |
| Copy and data | `src/lib/` (`site.ts`, `content.ts`, `icp.ts`, `arcs.ts`) |
| Security headers (CSP, HSTS, …) | `next.config.ts` |

## Pragya (the fluid-buddha SDK)

Pragya's runtime is the committed bundle `public/fluid-buddha.global.js`, and the few types the site uses are copied into `src/types/fluid-buddha.ts`, so the site builds without the sibling repo. Nothing loads until a visitor clicks "Talk to Pragya": they see an AI and voice disclosure, the backend's `/healthz` is checked, and only then is the SDK fetched.

To update the bundle: build `../fluid-buddha/fluid-buddha-sdk` (`npm run build` there), then run `npm run sync:agent` here. The script copies the bundle without its source map.

## Deploying

The site runs with `npm start` behind Apache on the production VM. After `npm ci && npm run build` with the production environment, restart the Node process. The Apache side, which isn't in this repo, needs:

- [ ] `ServerTokens Prod` and `ServerSignature Off` (hide the Apache version)
- [ ] Remove Apache's own `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` and `Permissions-Policy` headers, or make them match `next.config.ts`, so responses don't carry two different values
- [ ] Certificates for `www.hirebuddha.com`, redirecting to `https://hirebuddha.com`
- [ ] Forward `X-Forwarded-For` to Node (the lead form's rate limit keys on it)
- [ ] Mail (Microsoft 365): MX, SPF, DKIM and DMARC for hirebuddha.com; `contact@`, `rahul@`, `piyush@` and `support@` receive mail; Authenticated SMTP is on for `support@`, whose password goes in `SMTP_PASS`
- [ ] Re-run `npm run smoke` against the live site (`BASE_URL=https://hirebuddha.com`) after each deploy
