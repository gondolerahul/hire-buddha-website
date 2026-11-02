# HireBuddha Website: Full Audit

**Date:** 2 November 2026
**Scope:** The entire `hire-buddha-website` codebase (Next.js 16.2.7, commit `8d20834`) and the live deployment at `https://hirebuddha.com`. Covers all 59 routes plus the 404 route.
**Previous audit:** [website-quality-audit-2026-07-04.md](website-quality-audit-2026-07-04.md). This report re-checks every finding from that audit (§2) and adds new ones.

### How this audit was done

| Check | How |
|---|---|
| Clean install and build | `npm ci`, `tsc --noEmit`, `eslint`, `next build` on a fresh checkout |
| Runtime crawl | Built the site for production, ran `next start`, then had Playwright/Chromium follow every link on the site. Each of the 60 URLs was loaded at desktop (1440×900) and mobile (390×844) size, with a full scroll to trigger animations. Recorded per page: HTTP status, console errors, page errors, failed requests, every link, title, description and social-card tags, canonical tag, heading order, images missing alt text, buttons and links with no accessible name, duplicate ids, horizontal overflow, word count and em-dash count |
| Interaction tests | Nav wrapping at 1024 / 1100 / 1180 / 1280 px; skip link; keyboard access to the menus; mobile menu; 404 page; contact form; opening Pragya; the page with JavaScript turned off |
| Performance | Page weight, JS size and Largest Contentful Paint (LCP) on `/`, a blog post and an ICP sub-page |
| API probing | `POST /api/lead` sent bad, oversized, cross-origin and repeated requests |
| Live site (read-only) | Response headers, well-known URLs, 404 behaviour, Pragya backend health, DNS mail (MX) records. **No test leads were sent to production.** |
| Dependencies | `npm audit --omit=dev`, `npm outdated` |
| Source review | Every file in `src/` |

Evidence screenshots are in [audit-assets-2026-11-02/](audit-assets-2026-11-02/).

---

## 1. Executive summary

The design and engineering are still good. All 59 routes return 200. No internal link is broken. Every page has exactly one H1 and its own title. The crawl found no console errors and no failed requests.

**But none of the 25 launch blockers and fixes listed on 4 July have been made.** The site is already live on hirebuddha.com, so those problems are now in production. This audit also found several new problems that are more serious than anything in the July report:

1. **A clean checkout cannot be built for production.** The build depends on an unbuilt sibling repo (`../fluid-buddha`).
2. **Next.js 16.2.7 has published critical security advisories, including remote code execution (RCE).** The site is self-hosted on Apache/Ubuntu, which is the exposed setup.
3. **Pragya is down in production.** `api.fluidbuddha.com` returns 503 on every path, yet the chat panel still shows "online".
4. **hirebuddha.com has no mail (MX) records.** Every `hello@`, `enterprise@` and `privacy@` link bounces. The demo-request path does not work.
5. **The "Impact Stories" use real company names, including a regulated bank, with quotes captioned "Illustrative scenario".** The same names appear under "Trusted by".
6. **Every page shares the homepage's social-card title, description and URL.** Any link shared from the site previews as the homepage.

**Grade: A− for craft · D for launch readiness (down from C) · C+ for content.**

| Severity | Count | Themes |
|---|---|---|
| 🔴 Critical | 8 | Build broken on clean checkout · Next.js RCE advisories · Pragya down in prod · no MX records · leads discarded · placeholder legal pages · "illustrative" customer stories · broken 404 |
| 🟡 High | 9 | Social/SEO metadata · mobile overflow (2 pages) · keyboard accessibility · content hidden until JS runs · no real signup path · thin content and false read times · 187 MB orphaned assets in repo and on live · nav wraps at 1024 px · security headers |
| 🟠 Medium | 14 | Lint errors · heading order · text contrast · tap targets · SDK loaded on every page · dead persona and theme code · ROI and pricing logic · em-dashes · meta lengths · internal linking · mobile nav gaps · repo hygiene · font licensing · contact form UX |
| 🟢 Low | 9 | Status indicator, aria-hidden marquee, inconsistent time-to-value claims, CTA labels, About page, blog author/date, page length, etc. |

---

## 2. Status of the 4 July findings

| July finding | Status now | Evidence |
|---|---|---|
| 3.1 Legal pages are placeholders | ❌ **Open, now live** | `curl https://hirebuddha.com/privacy` contains "Template content for demonstration. Replace with your reviewed legal policy before launch." |
| 3.2 Lead capture discards leads | ❌ **Open** | [route.ts](../src/app/api/lead/route.ts) still only runs `console.log`. See C5 for new validation gaps |
| 3.3 Pragya hard-wired to localhost | ⚠️ **Partly** | The live bundle uses `wss://api.fluidbuddha.com`, so the environment variable is set in prod. The code fallback is still `ws://localhost:8080`, and the prod backend is now down (C3) |
| 3.4 Broken 404 / no `error.tsx` | ❌ **Open, now live** | Still white with near-invisible text and the homepage `<title>`, both locally and on hirebuddha.com ([screenshot](audit-assets-2026-11-02/404.png)) |
| 3.5 194 MB orphaned assets | ❌ **Open, worse** | `public/sequences` (187 MB, 2,596 files), `lens` (5.7 MB), `orbit` (1.9 MB) and 5 template SVGs have no references in `src/`. All are committed to git (pack is 189 MB) and served live (`/sequences/homepage/manifest.json` → 200) |
| 4.1 No sitemap / robots / OG image | ❌ **Open, worse** | Still 404 on live. New finding: social-card tags are identical on every page (H1) |
| 4.2 Copy deck never shipped | ❌ **Open, worse for blog** | Blog posts are now 134–195 words, against 6–9 min read labels (H6) |
| 4.3 Em-dash policy | ❌ **Open** | 268 rendered (was about 280), 289 in `src/` |
| 4.4 `/product/intelligence` mobile overflow | ❌ **Open** | Page width 420 px at a 390 px viewport (was 423). A second page now overflows (H2) |
| 4.5 No error boundary | ❌ **Open** | No `error.tsx` or `global-error.tsx` anywhere |
| 5.2 About page has no people | ❌ **Open** | No names, faces, address or company facts |
| 6.2 3 `set-state-in-effect` lint errors | ❌ **Open** | Same 3 errors: [Cursor.tsx:26](../src/components/foundation/Cursor.tsx:26), [Header.tsx:33](../src/components/layout/Header.tsx:33), [LiquidGoldGL.tsx:102](../src/components/visual/LiquidGoldGL.tsx:102) |
| 6.2 Lint `public/**` | ❌ **Open** | 1,127 of the 1,138 problems still come from `public/fluid-buddha.global.js` |
| 6.2 Dead light theme | ❌ **Open** | Bootstrap script in [layout.tsx:45](../src/app/layout.tsx:45), and nothing ever sets the theme |
| 6.5 Header and footer logo alt | ✅ **Not an issue** | The `<img alt="">` sits inside a link with `aria-label="HireBuddha — home"`, which is correct. No action needed |
| 6.6 SDK loaded on every page | ❌ **Open** | `fluid-buddha.global.js` (596 KB, 154 KB gzipped) still loads with `afterInteractive` on every route |
| 6.6 No security headers | ⚠️ **Partly** | Apache in prod adds nosniff, XFO, Referrer-Policy and Permissions-Policy. Still no CSP or HSTS, and these headers live outside the repo (H9) |
| Backlog: nav wrap at 1024 px | ❌ **Confirmed broken** | H8 |
| Backlog: CTA label drift, Article schema | ❌ **Open** | L4, L6 |

---

## 3. 🔴 Critical findings

### C1. A clean checkout cannot be built for production
- [FluidBuddha.tsx:9](../src/components/FluidBuddha.tsx:9) has `import type { … } from 'fluid-buddha'`. That package is installed from `"fluid-buddha": "file:../fluid-buddha/fluid-buddha-sdk"` ([package.json](../package.json)).
- The sibling repo's `dist/` is not built, so it has no `index.d.ts`. `npm ci && npm run build` fails:
  ```
  Running TypeScript ...  Failed to type check.
  ./src/components/FluidBuddha.tsx:9:61  Type error: Cannot find module 'fluid-buddha' or its corresponding type declarations.
  ```
  `tsc --noEmit` reports the same error, plus two implicit-`any` errors on lines 47–48.
- **Impact:** No CI system, new developer or fresh server can build the site unless it also has the sibling repo checked out and built by hand. The real runtime comes from the committed `public/fluid-buddha.global.js` anyway, so the dependency is used only for types.
- **Fix:** Copy the few needed types into `src/types/fluid-buddha.d.ts` and remove the `file:` dependency, or publish the SDK to a registry. Add a CI job that runs `npm ci && npm run build && npm run lint`.

### C2. Next.js 16.2.7 has critical security advisories
`npm audit --omit=dev` reports **6 vulnerabilities (1 critical, 4 high, 1 moderate)**. The `next` package alone has 20 advisories, fixed in **16.4.4**. The ones that matter most for this site:
- **Critical:** unauthenticated RCE in the Image Optimization API when SVG or AVIF files are used (GHSA-2464-fhr4-w9xw, GHSA-2xp9-vwfh-vxw4). The site serves SVGs through `next/image`.
- **Moderate:** cache poisoning of SSG/ISR pages in self-hosted apps (GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p). Every page here is SSG and self-hosted behind Apache.
- **High:** SSRF in Image Optimization (GHSA-cjq9-62q9-8jv4).
- **Also vulnerable:** postcss, sharp (libvips CVEs), nanoid, source-map-js and baseline-browser-mapping.
- **Fix:** `npm i next@16.4.4 eslint-config-next@16.4.4`, then `npm audit fix`, rebuild and redeploy. Do this first.

### C3. Pragya is down in production, and the UI says it is online
- `https://api.fluidbuddha.com/`, `/health` and `/ws/voice` all return **503 Service Unavailable**, including a proper WebSocket upgrade request with `Origin: https://hirebuddha.com`.
- "Talk to Pragya" appears in the header, footer, every page hero and every CTA band. The live chat panel opens with a green **"online"** dot whatever the connection state ([screenshot](audit-assets-2026-11-02/pragya-open.png)). Visitors type into a dead agent.
- A local build without the environment variable falls back to `ws://localhost:8080` and retries repeatedly, logging console errors each time.
- **Fix:**
  - Restore the backend and add uptime monitoring on `/health`.
  - In the SDK, tie the status dot to the real socket state, and show a graceful fallback such as "Pragya is offline. Email us or use the form" with a link to `/contact`.
  - Remove the `ws://localhost` fallback from production builds.
  - Note that `NEXT_PUBLIC_*` values are fixed at build time. Code defaults (`advance` / `level1`) differ from `.env.example` (`extreme` / `level3`), so a build without the env file silently changes Pragya's behaviour.

### C4. hirebuddha.com has no mail (MX) records, so every mailto link bounces
- `Resolve-DnsName hirebuddha.com -Type MX` returns only an SOA record against both 8.8.8.8 and 1.1.1.1. No server accepts mail for the domain.
- These addresses therefore cannot receive mail:
  - `hello@hirebuddha.com` ("Schedule a demo", [ContactAside.tsx:31](../src/components/contact/ContactAside.tsx:31))
  - `enterprise@hirebuddha.com` ("Enterprise & security", [ContactAside.tsx:35](../src/components/contact/ContactAside.tsx:35))
  - `privacy@hirebuddha.com` (the only data-request channel in the privacy policy)
- Combined with C3 and C5, **all three contact paths on `/contact` are currently dead ends.**
- **Fix:** Set up mail for the domain (Google Workspace, Zoho, or forwarding), with SPF, DKIM and DMARC. Send a test message to each address.

### C5. Lead capture throws leads away and accepts junk
Still true from July: [route.ts](../src/app/api/lead/route.ts) only logs, and the log omits `teamSize` and `message`, so even the log loses half of what the visitor typed. New in this audit:

| Request | Result |
|---|---|
| `email: "@"` or `"x@"` | `{"ok":true}`. The form shows "Thank you" for `x@` |
| `name: {"a":1}` (an object) | accepted |
| `Content-Type: text/plain` from `Origin: https://evil.example` | accepted, so any website can post forms to it |
| 2 MB `name` | accepted and written to the server log |
| 30 rapid requests | 30 × 200, no rate limit |

- The contact form uses `noValidate` and has no client-side checks.
- It has no consent wording and no link to the privacy policy.
- The success message says "Pragya is already reviewing your note", which is false.
- **Fix:**
  - Send leads somewhere durable: CRM, database, or at least an email or webhook with retry.
  - Validate with a schema: string types, length caps, a proper email regex.
  - Require `application/json` and cap the body size.
  - Add rate limiting and a honeypot field.
  - Add a privacy notice line under the form.
  - Make the success copy accurate.

### C6. The legal pages are placeholders, and they are live
Unchanged from July §3.1, but now in production. [privacy/page.tsx:29](../src/app/privacy/page.tsx:29) and [terms/page.tsx:29](../src/app/terms/page.tsx:29) display "Template content for demonstration…".

The pages also lack:
- a last-updated date
- a named legal entity or registered address
- governing law
- a cookie and local-storage disclosure. The site writes `hirebuddha_icp` to localStorage for 30 days ([ICPContext.tsx:49](../src/context/ICPContext.tsx:49)).
- a position on GDPR or India's DPDP Act, even though Indian customers are featured

### C7. Real company names presented as customers, with "illustrative" quotes
- The homepage marquee says **"Trusted by companies that refuse to scale the old way"** and lists 7 companies ([Proof.tsx:28](../src/components/home/Proof.tsx:28), [site.ts:144](../src/lib/site.ts:144)).
- All 7 story pages attribute their quote to **"<Company> · Illustrative scenario"** ([content.ts](../src/lib/content.ts)). The homepage quote "India's first AI-native legal firm runs on HireBuddha" is captioned "Illustrative deployment".
- **Saraswat Bank**, a real regulated co-operative bank, is listed as a customer. Its story says it only *"explored"* governed automation, and the quote is captioned illustrative.
- **Risks:**
  - A trademark or misrepresentation complaint from any named company that has not signed off.
  - Consumer-protection exposure for implied endorsements.
  - Visible self-contradiction ("Impact Stories" that are labelled made-up), which undermines trust.
- **Fix:** For each company, get written consent and a real quote with a named person. Otherwise remove the name, or rename the section to "Example scenarios" and drop the "Trusted by" claim.
- **Update (2 Nov 2026):** The owner confirms that all seven clients have approved their stories. What remains is to remove the contradicting "Illustrative" captions and keep the approvals on file. See [connector-approval-website-plan.md](connector-approval-website-plan.md) §3, item 2.1.

### C8. The 404 page is broken, and so is the live one
- An unknown URL renders the default Next.js 404 on a **white** body (`rgb(255,255,255)`) with almost invisible grey text inside the dark-site chrome ([screenshot](audit-assets-2026-11-02/404.png)).
- It also uses the homepage `<title>` and description. Live `https://hirebuddha.com/no-such-page` behaves the same.
- There is no `error.tsx` either.
- **Fix:** Add a branded `src/app/not-found.tsx` with its own metadata and recovery links, plus `src/app/error.tsx` and `src/app/global-error.tsx`.

---

## 4. 🟡 High-priority findings

### H1. Social-card and SEO metadata is wrong on every page
The crawl found:

| Signal | Result across 59 pages |
|---|---|
| `og:title` | **1 distinct value**: "HireBuddha — Stop Hiring. Start Deploying." |
| `og:description` | **1 distinct value** |
| `og:url` | **1 distinct value**: `https://hirebuddha.com` |
| `og:image` / `twitter:image` | missing, while `twitter:card` is `summary_large_image` |
| `<link rel="canonical">` | missing everywhere |
| `/robots.txt`, `/sitemap.xml` | 404 locally **and on live** |
| `/favicon.ico`, `/apple-touch-icon.png`, web manifest | 404 (only `icon.svg` exists) |

- **Cause:** [layout.tsx:28](../src/app/layout.tsx:28) defines `openGraph` and `twitter` once. Pages set only `title` and `description`, and Next.js does not deep-merge `openGraph`, so every page inherits the homepage's values.
- **Effect:** Sharing `/pricing` on LinkedIn, Slack or WhatsApp shows the homepage card. The `og:url` also tells platforms that every page *is* the homepage.
- **Fix:**
  - Add a shared `buildMetadata({ title, description, path })` helper that sets `openGraph`, `twitter` and `alternates.canonical` per page.
  - Add `src/app/sitemap.ts`, `src/app/robots.ts` and `src/app/opengraph-image.tsx` (generated per template if possible).
  - Add `apple-icon.png` and `favicon.ico`.
  - Add `Article` JSON-LD on blog posts.

### H2. Two pages scroll sideways on mobile
| Page | Page width at 390 px | What overflows |
|---|---|---|
| `/for/solopreneurs/your-day` (**new**) | **589 px** | `DaySchedule` chips, pick label and timeline bars. Captions are cut off at the right edge ([screenshot](audit-assets-2026-11-02/your-day-mobile.png)) |
| `/product/intelligence` (open since July) | 420 px | `.loopRing` reaches 400 px and the `.loopNode` buttons 420 px. The 560 px breakpoint (`--loop-r:130px`) is not enough |

- **Fix for `your-day`:** [DaySchedule.module.css](../src/components/persona/DaySchedule.module.css) needs `min-width:0` on grid children, plus a single-column layout under about 600 px for the "Your AI team handles" row.
- **Fix for the ring:** size it from the viewport width, for example `--loop-r: min(130px, calc(50vw - 70px))`.

### H3. Keyboard and screen-reader barriers
- **The Product and Solutions mega-menus cannot be reached by keyboard.** Each menu button opens its panel when it receives focus ([Header.tsx:69](../src/components/layout/Header.tsx:69)), and the panel links come after all the nav buttons in the DOM. Tabbing past "Product" focuses "Solutions", which swaps the panel. Test result after pressing Enter on Product: `Solutions > Who it's for > Pricing > Use Cases > Stories > Blog > Solopreneurs…`, so only the last panel opened is reachable.
- **The skip link does not move focus.** After activating "Skip to main content", the next Tab lands on the header logo. Cause: [SmoothScroll.tsx:36](../src/components/foundation/SmoothScroll.tsx:36) intercepts `#` links and scrolls with Lenis but never moves focus, and `<main>` has no `tabIndex={-1}`.
- **The mobile menu sheet is not a dialog.** It has no `role="dialog"` or `aria-modal`, no focus trap, and focus stays on the burger button. The burger has no `aria-expanded` or `aria-controls`.
- **The native cursor is hidden everywhere**, including text inputs (`html.has-cursor * { cursor:none !important }`, [globals.css:276](../src/app/globals.css:276)). There is no text-input I-beam in the contact form.
- **Fix:**
  - Use a disclosure pattern: open on click or Enter, render each panel directly after its button, close on blur outside.
  - In the skip-link handler, focus the target after scrolling.
  - Make the mobile sheet a proper modal.
  - Keep the native cursor on `input, textarea, [contenteditable]`.

### H4. Above-the-fold content is invisible until JavaScript runs
- In the server HTML, every hero H1 word is rendered with `transform: translateY(115%)` inside `overflow:hidden` ([primitives.tsx:65](../src/components/motion/primitives.tsx:65)).
- The homepage server HTML contains **59 elements with `opacity:0`** ([primitives.tsx:27](../src/components/motion/primitives.tsx:27)).
- With JS disabled, or before hydration on a slow phone, the headline and lead are blank. Homepage LCP was **2.4 s on localhost** (the LCP element is the hero sub-paragraph, held back by `Reveal`). On real mid-range mobile it will be several times higher.
- This also affects print, reader modes and some crawler screenshots (same issue as July §5.13, but site-wide).
- **Fix:** Render hero H1, lead and CTAs visible by default and animate only below-the-fold content. Or start reveals from `opacity:.001` and a small `y` offset, and skip the animation for anything already in view at load.

### H5. No real way to start free, and no login
- "Start Free", "Get Started Free", "Deploy this use case", "Activate this arc" and the Free plan's "Get Started" all link to `/contact`, a lead form.
- The copy promises "$5 in daily credits · No card required · Deploy in under 10 minutes" ([FinalCTA.tsx:35](../src/components/home/FinalCTA.tsx:35), [pricing/page.tsx:21](../src/app/pricing/page.tsx:21)).
- There is no signup, sign-in or app link anywhere, and no login for existing customers.
- **Fix:**
  - If the app exists, point the primary CTAs at the app's signup and add "Sign in" to the header.
  - If it doesn't yet, change the copy to "Request access" or "Join the waitlist" and remove the "$5 / no card / 10 minutes" promises until they are true.

### H6. Thin content, and read times that are 6–9× too high
| Template | Main-content words | Claimed |
|---|---|---|
| Blog posts (7) | **134–195** | "6–9 min read" (real: under 1 min) |
| Story pages (7) | 110–161 | — |
| Use-case pages (7) | 159–193 | — |
| ICP sub-pages (13) | 162–426 | — |

- The blog is thinner than in July. The `read` value is hard-coded in [content.ts](../src/lib/content.ts) rather than calculated.
- **Fix:** Calculate read time from word count (`Math.ceil(words/230)`), or ship the full articles from `docs/phase2/website-copies/` (29–37), which are each 1,000–1,900 words. Add author and date to posts.

### H7. 187 MB of orphaned assets in the repo and on the live server, plus a public source map
- `public/sequences`, `public/lens`, `public/orbit`, `next.svg`, `vercel.svg`, `globe.svg`, `file.svg` and `window.svg` have no references in `src/`. They are in the only commit (git pack 189 MB) and are served live.
- `public/fluid-buddha.global.js.map` (2.2 MB) is served in production (200 on hirebuddha.com), which publishes the full unminified SDK source.
- **Fix:**
  - Delete the folders and the template SVGs.
  - Remove the `.map` from `public/`, or stop copying it in the `sync:agent` script.
  - The repo has a single commit, so you can rewrite history cheaply (amend the initial commit, or use `git filter-repo`) to remove about 190 MB before more clones exist. Coordinate with anyone who has already pulled from `origin`.

### H8. The nav wraps onto three lines at 1024–1100 px
"Who it's for" and "Use Cases" break onto two or three lines, and the chevrons drop. The layout is: 1 row at 1280 px, 2 rows at 1180 px, 3 rows at 1100 px and 1024 px ([screenshot](audit-assets-2026-11-02/nav-1024.png)). Common laptop and tablet-landscape widths fall in this range.

**Fix:** Add `white-space:nowrap` to nav items. Then either collapse to the burger below about 1200 px, or drop "Talk to Pragya" from the header at that width.

### H9. Security headers are incomplete and live outside the repo
- Live responses include `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`. These come from Apache config that is not in this repo.
- **Missing:**
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
- **Leaking:**
  - `Server: Apache/2.4.58 (Ubuntu)`
  - `X-Powered-By: Next.js`
  - The deprecated `X-XSS-Protection` header is also sent.
- **Fix:**
  - In [next.config.ts](../next.config.ts), set `poweredByHeader: false` and an `async headers()` block with CSP (allowing `wss://api.fluidbuddha.com`), HSTS and `frame-ancestors 'none'`.
  - In Apache, set `ServerTokens Prod`.
  - Keeping the headers in the repo means they are reviewed and travel with the code.

---

## 5. 🟠 Medium findings

| # | Finding | Evidence | Fix |
|---|---|---|---|
| M1 | **Lint fails:** 11 errors (3 in `src`, 8 in the vendored bundle) and 1,127 warnings | `npx eslint`. Unused imports in [blog/[slug]/page.tsx:3](../src/app/blog/[slug]/page.tsx:3), [pragya/page.tsx:4](../src/app/pragya/page.tsx:4), [pricing/page.tsx:4](../src/app/pricing/page.tsx:4), [SheelLoop.tsx:6](../src/components/home/SheelLoop.tsx:6). Unused disable directive in [route.ts:10](../src/app/api/lead/route.ts:10) | Add `public/**` to `globalIgnores`. Fix the 3 `set-state-in-effect` errors (derive state, or key on `pathname`). Remove dead imports |
| M2 | **Heading levels skip from h1 to h3 on 21 pages:** all 7 blog posts, all 7 stories, privacy, terms, `/product/security`, and 4 ICP sub-pages | crawl `skips` | Use `<h2>` for section headings in [blog/[slug]/page.tsx:36](../src/app/blog/[slug]/page.tsx:36), [stories/[slug]/page.tsx:39](../src/app/stories/[slug]/page.tsx:39) and the legal pages. Style them to look the same |
| M3 | **Text contrast below WCAG AA** | `--fg-subtle #7c746b` on `#0a0908` = **4.33:1** (AA needs 4.5:1), used in 52 places, often small text. `--fg-faint #544d46` = **2.39:1**, used for form placeholders and mega-menu numerals | Raise `--fg-subtle` to about `#8a8278` (≥4.6:1). Don't use `--fg-faint` for any text |
| M4 | **Mobile tap targets under 24 px** | Footer links and mega-menu chips measure under 24 px tall at 390 px (WCAG 2.5.8) | Add `padding-block` so each target is at least 24 px (44 px preferred) |
| M5 | **About 460 KB of gzipped JS (1.55 MB unpacked) on every page** | `fluid-buddha.global.js` is the largest at 154 KB gzipped / 596 KB, loaded with `afterInteractive` on every route even though Pragya mounts only on request ([FluidBuddha.tsx:68](../src/components/FluidBuddha.tsx:68)). The homepage also runs 5 canvases | Inject the SDK script on the first `toggle-pragya` event, or use `lazyOnload`. Profile the canvas stack on a mid-range Android |
| M6 | **The persona (ICP) system is dead code** | `setICP` writes localStorage for 30 days and sets `<html data-icp>`, but no CSS or component reads either ([ICPContext.tsx:37](../src/context/ICPContext.tsx:37)). The SDK persona string is cast without validation ([FluidBuddha.tsx:48](../src/components/FluidBuddha.tsx:48)). The slug `medium-enterprise` differs from the route `growing-companies` | Use it (persona-aware CTAs or accents) or remove it. Validate SDK input against the slug list. Disclose the storage in the privacy policy |
| M7 | **Dead light-theme code** | The theme bootstrap in [layout.tsx:45](../src/app/layout.tsx:45) and `[data-theme="light"]` rules in tokens and globals are never triggered | Remove them |
| M8 | **The ROI calculator and plan grid don't hold up** | [ROICalculator.tsx:21](../src/components/pricing/ROICalculator.tsx:21) treats savings as the whole payroll minus task cost, with no link between headcount and tasks: 200 people × 50 tasks/day still shows almost full payroll as savings. The default shows **3,039% ROI**. In [pricing/page.tsx:20](../src/app/pricing/page.tsx:20), Starter and Growth are both "PAYG" with no price that sets them apart, and "Subscription credits… monthly plans" are mentioned but no plan has a monthly price | Model the share of work automated: `savings = heads × salary × automatable% − cost`. Cap or soften the headline ROI. Give each plan a clear price or a clear way to choose between them |
| M9 | **Em-dash policy still unresolved** | 268 rendered: `/` 23, `/product/ai-employees` 21, `/for/enterprise` 16, `/product/intelligence` 15 | Decide once (see July §4.3) and enforce with a lint rule |
| M10 | **Meta lengths** | 21 descriptions over 160 characters (`/solutions/fulfill` 224, `/product/tools` 218) and 14 ICP sub-page descriptions under 70 (`/for/startups/vs` is "Head-to-head comparisons.", 25 characters). 17 titles over 60 characters | Write 120–155 character descriptions per page, and titles of 60 characters or fewer |
| M11 | **Weak internal linking** | Each use-case and story detail page is linked from only one page (its index). Arc pages don't link to their use cases, and blog posts link to nothing | Add "Related use cases" to arc pages and "Read the story" links from use cases. End each blog post with 2–3 contextual links |
| M12 | **Nav differs between mobile and desktop** | The mobile menu omits all 13 ICP sub-pages. "Meet Pragya" (`/pragya`) is in the mobile menu but not the desktop nav, so on desktop it is reachable only from the footer | Make the two match. Add Pragya to the Product panel |
| M13 | **Repo hygiene** | No `README.md`. Turbopack warns that it inferred the workspace root from a stray `C:\Workspace\package-lock.json`. `sync:agent` uses `cp`, which fails in Windows `cmd`. `.env.example` contains a real GCP project ID and unused `GEMINI_API_KEY` / `GOOGLE_*` / `HIREBUDDHA_API_URL` variables. Its header says port 3001, but scripts use the default 3000 | Add a README covering setup, the SDK sync step and deploy. Set `turbopack.root` and `outputFileTracingRoot`. Use a Node copy script. Trim `.env.example` to the variables actually used |
| M14 | **"Roblox" fan font: licensing and weight** | 14 `Roblox*` TTF/OTF files (992 KB) in `public/fonts`, only 5 referenced ([tokens.css:9](../src/styles/tokens.css:9)), used for the wordmark. "Roblox" is a trademark, and these free-font-site files are often personal-use only | Check the licence or replace it. Better still, render the wordmark from the official SVG logo in `public/images`. Delete the unused files and serve WOFF2 if you keep a font |

---

## 6. 🟢 Low findings

- **L1:** The marquee is `aria-hidden` ([primitives.tsx:248](../src/components/motion/primitives.tsx:248)), so screen readers never hear the customer and integration names. Add a visually hidden list.
- **L2:** Time-to-value claims conflict across the site: "under 10 minutes" (CTAs), "15 minutes" (`/for/solopreneurs/start`), "an afternoon" (`/for/startups/launchpad`), "90 days" (enterprise). Frame them deliberately, for example "first employee in 10 minutes · full rollout in 90 days".
- **L3:** "Works with Anthropic · OpenAI · Stripe · Plaid · DocuSign…" ([Proof.tsx:56](../src/components/home/Proof.tsx:56)): confirm each integration exists, and follow each brand's naming guidelines.
- **L4:** The primary action has several labels: "Get Started", "Get Started Free", "Start Free" and "Talk to Sales". This is unchanged from July.
- **L5:** The About page still has no founders, team, location, founding year or registered entity. Also, the "Premium, calm, precise… no theatrics" belief sits beside a custom cursor, magnetic buttons and page-wipe transitions. Either tone down the motion or reword the claim.
- **L6:** Blog posts have no author, date or `Article` JSON-LD.
- **L7:** The homepage is 13,872 px tall (about 15 desktop screens). Consider shortening the pinned ring film.
- **L8:** The footer year comes from `new Date()` in a client component ([Footer.tsx:45](../src/components/layout/Footer.tsx:45)), which can mismatch the server render on New Year's Eve. Compute it on the server.
- **L9:** [Header.tsx:11](../src/components/layout/Header.tsx:11) declares `ICP_ICONS` between import statements. Move it below the imports.

---

## 7. Broken links

| Type | Result |
|---|---|
| Internal links | **0 broken.** All links found across the 59 pages resolve to valid routes and return 200. No `href="#"` placeholders. All `target="_blank"` links have `rel="noopener"` |
| Orphan pages | None, but use-case and story detail pages each have only one linking page (M11) |
| External: `x.com/buddhalab` | 200. Unconfirmed, because x.com returns 200 for any handle. Check by hand while logged in |
| External: `linkedin.com/company/buddha-cognitive-lab` | 200 |
| `mailto:` (hello@, enterprise@, privacy@) | **Effectively broken.** No MX records (C4) |
| Pragya WebSocket `wss://api.fluidbuddha.com/ws/voice` | **Broken.** 503 (C3) |
| Unknown URLs | Return 404 correctly, but the page itself is broken (C8) |
| `robots.txt`, `sitemap.xml`, `favicon.ico` | 404 (H1) |

---

## 8. Prioritised action plan

**Now (production is affected):**
1. Upgrade `next` to 16.4.4 and run `npm audit fix`, then redeploy. (C2)
2. Bring `api.fluidbuddha.com` back up, make the status dot reflect the real connection, and add an offline fallback. (C3)
3. Create MX records and mailboxes for hello@, enterprise@ and privacy@. (C4)
4. Send `/api/lead` to a durable destination, and add validation and rate limiting. (C5)
5. Remove "Trusted by" and the real company names, or get written consent. (C7)
6. Replace the legal placeholders. (C6)
7. Add `not-found.tsx`, `error.tsx` and `global-error.tsx`. (C8)

**This week:**

8. Vendor the SDK types, remove the `file:` dependency and add CI build and lint. (C1)
9. Add per-page OG, Twitter and canonical tags, plus `sitemap.ts`, `robots.ts`, an OG image and a favicon. (H1)
10. Delete the 187 MB of orphaned assets and the public `.map`, then clean git history. (H7)
11. Fix the two mobile overflows and the 1024 px nav wrap. (H2, H8)
12. Fix keyboard access: menus, skip link, mobile dialog, cursor on inputs. (H3)
13. Make hero content visible without JS. (H4)
14. Decide the CTA target: real signup or "Request access". (H5)

**Next sprint:**

15. Calculate read times, or ship the full deck articles. Add author, date and Article schema. (H6, L6)
16. Move security headers into `next.config.ts` and add CSP and HSTS. (H9)
17. Fix lint and ignore `public/**`. Fix heading levels, contrast and tap targets. (M1–M4)
18. Lazy-load the SDK. (M5)
19. Remove the dead persona and light-theme code, or use them. (M6, M7)
20. Rework the ROI model and plan grid. (M8)
21. Write the README, clean up `.env.example` and set the Turbopack root. Settle the font licence. (M13, M14)

**Backlog:** em-dash decision (M9), meta lengths (M10), internal linking (M11), nav parity (M12), and the low items in §6.

---

## Appendix A: Measured data

- **Build:**
  - `next build` fails at type check on a clean install (C1).
  - With the missing types supplied by a temporary shim (removed afterwards), all 63 static pages build. 1 dynamic route (`/api/lead`).
- **Crawl:** 60 URLs (59 return 200, plus the 404 test), each loaded at desktop and mobile size.
  - 0 console errors, 0 page errors and 0 failed requests apart from the expected 404.
  - Exactly 1 H1 on every page. No duplicate ids, unlabelled inputs, unnamed buttons or links, or images missing `alt`.
- **Page weight** (production build, localhost):
  - About 51 requests and about 675 KB transferred on `/`.
  - JS: 462 KB gzipped / 1,554 KB unpacked. The largest file is `fluid-buddha.global.js` at 154 / 596 KB.
  - LCP: `/` 2,376 ms, `/blog/sheel-one-loop` 1,016 ms, `/for/solopreneurs/your-day` (mobile) 1,100 ms.
- **Em-dashes (rendered):** 268 in total. `/` 23 · `/product/ai-employees` 21 · `/for/enterprise` 16 · `/product/intelligence` 15 · `/use-cases` 10 · `/for/solopreneurs` 10 · `/about` 9 · `/pricing` 8.
- **Main-content words:**
  - Highest: `/` 1,016 · `/product/ai-employees` 884 · `/product/intelligence` 591 · `/for/enterprise` 544.
  - Lowest: `/contact` 70 · stories 110–161 · use cases 159–193 · blog posts 134–195 (body).
- **Nav rows:** 1 at 1280 px · 2 at 1180 px · 3 at 1100 px and 1024 px.
- **Text contrast on `#0a0908`:** fg 17.7 · fg-muted 8.69 · accent 9.97 · **fg-subtle 4.33** · **fg-faint 2.39**.
- **Live response headers:**
  - Present: `Server: Apache/2.4.58 (Ubuntu)`, `X-Powered-By: Next.js`, nosniff, XFO SAMEORIGIN, Referrer-Policy, Permissions-Policy (`microphone=(self)`).
  - Missing: CSP and HSTS.
- **DNS:** `hirebuddha.com` MX query returns SOA only (checked on 8.8.8.8 and 1.1.1.1).
- **npm audit (prod):** next (critical, 20 advisories, fix 16.4.4), postcss (high), sharp (high), nanoid (high), source-map-js (high), baseline-browser-mapping (moderate).
- **Toolchain:** Node 23.7, npm, Next 16.2.7 (Turbopack), Playwright 1.61 with Chromium, ESLint 9, TypeScript 5.9.

## Appendix B: What is working well

- Unique `<title>` and `description` on every route.
- One H1 per page.
- `lang="en"` and a visible `:focus-visible` style.
- `prefers-reduced-motion` respected throughout.
- `next/font` with `display:swap`.
- All internal links valid.
- Clean static generation of every content route.
- Organization JSON-LD.
- Pricing is consistently in USD.
- Pricing figures are labelled illustrative.
- Comparisons name categories, not competitors.
- A distinctive, consistent black-and-gold design system across 59 pages.
