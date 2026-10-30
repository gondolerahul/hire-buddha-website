# HireBuddha Website — Full Quality Audit

**Date:** July 4, 2026
**Scope:** All 59 routes (15 static pages, 6 Solution arcs, 4 ICP pages, 13 ICP sub-pages, 7 use cases, 7 stories, 7 blog posts) plus the 404 route.
**Method:** Every route was loaded in a real browser (Chromium via Playwright) against the dev server on `:3100` at desktop (1440×900) and, for 14 representative templates, mobile (390×844). Each load auto-scrolled the full page to trigger reveal animations, then captured: HTTP status, console errors/warnings, uncaught page errors, failed network requests, all anchor hrefs, title/meta description, H1 structure, images without alt text, em-dash counts, leftover `{{tokens}}`/TODO/lorem text, horizontal overflow, and a full-page screenshot. Screenshots were reviewed visually (key pages in full-resolution slices). This was cross-checked with source review (`src/`), the copy deck (`docs/phase2/website-copies/`), ESLint, and `tsc`.
**Supersedes:** `docs/phase1/uiux_review_2026-06-17.md` for current-state findings (that audit predates the v4 "Liquid Gold" rebuild; §2 below re-verifies each of its criticals).

---

## 1. Executive summary

The site is in **very strong technical and visual health**. All 59 routes return 200, there are **zero broken internal links**, **zero console errors**, **zero uncaught page errors**, **zero failed asset requests**, exactly **one H1 per page**, and **unique title + meta description on every page**. TypeScript compiles clean. Every critical from the June 17 audit that concerned rendered behavior is fixed: the Solutions hydration error is gone, pricing currency is now consistently USD, mobile heroes lead with the headline, and the homepage mobile overlap no longer exists.

What remains is a different class of problem: **the site is not production-ready as a business asset.** The legal pages are self-declared placeholders, the lead form discards leads (logs to console only), the Pragya assistant points at `ws://localhost:8080`, the 404 page renders as an unreadable washed-out screen, there is no sitemap/robots/OG image, and 194 MB of orphaned assets sit in `public/`. On the content side, the long-form copy that exists in the copy deck was never fully implemented — blog posts ship ~13 % of their written copy while advertising "7 min read".

**Grade: A− for design/engineering craft · C for launch readiness · B for content completeness.**

| Severity | Count | Themes |
|---|---|---|
| 🔴 Critical (launch blockers) | 5 | Placeholder legal pages, lead capture goes nowhere, Pragya hardwired to localhost, broken 404 page, 194 MB orphaned assets |
| 🟡 High | 6 | No sitemap/robots, no OG image, blog/story/use-case content stubs vs copy deck, Intelligence mobile overflow, em-dash policy breach, missing error boundary |
| 🟠 Medium | 9 | Lint errors, logo alt text, security headers, 600 KB SDK on every page, dead light-theme code, CTA label drift, scroll-gated content invisible to print/no-JS, unverified social/mailto endpoints, About has no humans |
| 🟢 Minor | 6 | GPU-stall warnings, home page scroll length, numbered list markers, read-time labels, template SVG clutter, lint noise from `public/` |

---

## 2. Prior-audit criticals — re-verified today

| June 17 finding | Status on 2026-07-04 | Evidence |
|---|---|---|
| 🔴 Homepage mobile sections overlap | ✅ **Fixed** | v4 rebuild removed the ScrollFilm; mobile full-page capture shows clean stacked sections |
| 🔴 Mobile cinematic heroes show no headline | ✅ **Fixed** | `/`, `/product/ai-employees`, `/solutions`, `/pricing` mobile all lead with H1 + subhead above the visual |
| 🔴 Solutions hydration mismatch | ✅ **Fixed** | 0 console errors, 0 page errors across all 74 page loads |
| 🔴 Pricing currency mixed `$`/`₹`, malformed `$1,00,000/mo` | ✅ **Fixed** | Pricing is now uniformly USD; zero `₹` occurrences in `src/`; plans read Free $0 / Starter PAYG / Growth PAYG / Enterprise Custom |
| 🔴 Below-fold content fully reveal-gated (blank voids) | ✅ **Mostly fixed** | Pricing and Contact render fully; residual scroll-linked gating on `/use-cases` index (see §5.13) |
| 🟡 Nav wraps at 1024px | Not re-measured at 1024 this pass — worth a spot check | — |
| 🟡 Per-page SEO metadata | ✅ **Fixed** | All 59 pages have unique titles + descriptions via `generateMetadata` |
| 🟡 About has no humans | ❌ **Still open** | No founders, names, or photos anywhere on `/about` |
| 🟡 Em-dashes pervasive | ❌ **Still open** | ~280 rendered em-dashes across desktop pages (see §4.3) |

---

## 3. Critical findings (launch blockers)

### 3.1 Legal pages are placeholders 🔴
[privacy/page.tsx:29](src/app/privacy/page.tsx:29) and [terms/page.tsx:29](src/app/terms/page.tsx:29) both end with visible body text: *"Template content for demonstration. Replace with your reviewed legal policy/terms before launch."* The privacy page also self-describes as "a template summary and not a substitute for the binding agreement." There is no last-updated date, no cookie policy, no GDPR/DPDP position, no governing law in Terms. Shipping this is a legal exposure and an instant trust-killer for the enterprise ICP the site courts.

### 3.2 Lead capture silently discards leads 🔴
[api/lead/route.ts](src/app/api/lead/route.ts) validates the payload and then only `console.log`s it. Every "Get Started" form submission on `/contact` — the single conversion point of the entire site — vanishes when the server restarts. The comment in the file acknowledges this ("In production this would forward to a CRM"). Nothing is wired. **Before any traffic is sent to this site, this endpoint must persist to a CRM, database, or at minimum an email/webhook.**

### 3.3 Pragya assistant is hardwired to localhost 🔴
[FluidBuddha.tsx:39](src/components/FluidBuddha.tsx:39): `backend: process.env.NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS || 'ws://localhost:8080'`. In any deployment where that env var is unset, the flagship "Talk to Pragya" experience — which appears as a CTA on all 59 pages (60 occurrences) — will fail to connect. The fallback is also insecure `ws://`, which browsers block from an `https://` page. The env var must be set per environment and the fallback should fail gracefully with a visible message, not a dead widget.

### 3.4 The 404 page is broken 🔴
There is no `src/app/not-found.tsx`. An unknown URL renders Next's default 404 inside the site chrome, and the result (verified by screenshot of `/this-page-does-not-exist`) is a **washed-out near-white page with almost invisible text** — the polar opposite of the site's black-and-gold identity, and barely readable. It also inherits the homepage's `<title>` and meta description (confirmed duplicate in crawl). There is likewise no `error.tsx`, so any runtime error in production will show an unbranded crash screen. Both files need to exist, on-brand, with recovery links.

### 3.5 194 MB of orphaned assets in `public/` 🔴
`public/sequences/` (186 MB — the old homepage/anatomy film frames), `public/lens/` (5.7 MB — the retired StillLens stills), and `public/orbit/` (1.9 MB — the retired Orrery cores) have **zero references anywhere in `src/`** after the v4 rebuild. They will be uploaded on every deploy, bloat the build artifact ~40×, and on some hosts count against bandwidth/storage. Also present: unused Next.js template files (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`). Delete or move to `backups/`.

---

## 4. High-priority findings (site-wide)

### 4.1 SEO plumbing is missing 🟡
- **No `sitemap.ts` and no `robots.ts`** anywhere in `src/app/`. For a 59-page site whose deeper pages (13 ICP sub-pages, 7 use cases) are only reachable through JS-rendered menus and in-page links, a sitemap materially affects indexation.
- **No Open Graph / Twitter image.** [layout.tsx:34](src/app/layout.tsx:34) declares `twitter.card: 'summary_large_image'` but no `images` property is set and no `opengraph-image` file exists. Every social share of every page will render as a bare text card. One branded 1200×630 image at minimum; per-template images ideally.
- Only `icon.svg` exists — no `apple-icon`, no PNG fallback favicon.
- JSON-LD: Organization schema is present (good). No `Article` schema on blog posts, no `FAQPage`/`Product` anywhere — easy wins later.

### 4.2 The written copy was never fully shipped — content depth gap 🟡
The copy deck in `docs/phase2/website-copies/` contains full-length pages; the live site implements condensed stubs:

| Content | Copy deck | Live page (body text) | Gap |
|---|---|---|---|
| Blog: "Sheel: one loop" | 1,895 words | ~250 words (4 short sections) | **~87 % of copy unshipped** |
| Story: GoChillao | 792 words | ~150 words | ~80 % unshipped |
| Use case: Outbound sales | 745 words | ~250 words | ~65 % unshipped |

Consequences:
- Blog cards advertise **"6–9 MIN READ"** ([content.ts:152](src/lib/content.ts:152) `read: 7` etc.) for articles that take under 90 seconds to read. This is a visible credibility break for exactly the audience blog content is meant to persuade.
- Story pages (~1,400 chars total text including nav/footer) read as teasers: one quote, three bullet outcomes, no narrative arc, no named humans, no numbers. Fine as an index; thin as a destination page.
- Thin pages also undercut SEO: 150-word pages will struggle to rank for anything.

**Recommendation:** either implement the deck copy (it exists and is good), or re-label honestly (drop read times, call stories "snapshots").

### 4.3 Em-dash policy is being violated — or the policy is dead; decide which 🟡
The brand/copy rule of record ("no em-dashes in production copy", also the #1 banned tell in the prior audit's taste guidance) is broken everywhere: **~280 rendered em-dashes** across the 59 desktop pages. Worst offenders: `/` (23), `/product/ai-employees` (21), `/for/enterprise` (16), `/product/intelligence` (15). Notably, the *current* copy deck itself contains 1,159 em-dashes, and the original `00-`brand-foundation file referenced by earlier docs no longer exists in `website-copies/` (files start at `01-`). So the site is consistent with the deck but not with the stated rule. **Decide once:** if the ban stands, sweep both deck and site (mostly mechanical: em-dash → period or comma); if it doesn't, retire the rule so future audits stop flagging it.

### 4.4 `/product/intelligence` overflows horizontally on mobile 🟡
The only layout defect found on any page, but it's real: at 390 px the page's scroll width is **423 px**. Culprit (measured in-browser): the 8-stage cognitive-loop ring — `Intelligence-module__loopRing` (right edge 400 px) and its `loopNode` buttons, worst node right edge **423 px**. The "Perceive" label is visibly clipped at the right edge and the whole page can be wiggled sideways. Fix: scale the ring to `min(100vw - 48px, 380px)` or reduce node label offsets at the mobile breakpoint.

### 4.5 No error boundary 🟡
Covered in 3.4 but worth its own line: no `error.tsx` at any level of the app tree. One thrown error in any client component takes down the page with an unbranded screen.

---

## 5. Page-by-page findings

Legend: ✅ = no page-specific defects found beyond site-wide items · 📱 = mobile-specific note. Every page below returned HTTP 200, produced zero console/page errors, had exactly one H1, and had unique title + meta description unless stated otherwise.

### 5.1 Homepage `/`
- **Renders:** hero "Stop Hiring. Start Deploying." over the liquid-gold ring → headcount-vs-loop comparison cards → "Three ideas" ledger → "Three steps. Ten minutes." → pinned "One loop runs your whole company" gold-ring film → Meet Pragya (with live ask-chips) → stat band (7+ industries / 6 arcs / 0 attrition) → client marquee + story teaser → use-case grid → final CTA. Coherent narrative, strong close.
- **Content:** on-message with the copy deck spine; claims are hedged where needed ("no sick days", "0 attrition" are defensible as product characteristics).
- 🟡 Highest em-dash count on the site (23).
- 🟢 Very long: 13,872 px (~15 desktop viewports). Two of those are the pinned ring runway (blank in print/full-page capture; fine in real scrolling). Consider whether the pinned film runway can be shortened ~30 %.
- 🟢 WebGL performance warnings in console (GPU stall due to ReadPixels, repeated) — from the gold canvas pipeline. No user-visible jank observed, but worth profiling on integrated GPUs.
- 📱 Mobile: clean. Headline-first hero, sections stack without overlap. Prior criticals confirmed gone.

### 5.2 `/about`
- **Renders:** "Towards digital enlightenment." hero → Why we exist → What we believe (4 tenets) → final CTA. Copy is genuinely good — the Pragya/Sheel/Karuna naming section is memorable.
- 🟠 **Still no humans.** No founder names, faces, bios, location, or company facts (founded when, team size). For a company asking enterprises to hand over operations, the About page is the trust page; it currently proves nothing a landing page doesn't. This was flagged June 17 and is unchanged.
- 🟢 Shortest top-level page (3,788 px) — appropriate.

### 5.3 `/contact`
- **Renders fully** (form + three path cards visible immediately after hero — the old reveal-gating void is gone). Fields: name, work email, company, team size, "What would you automate first?". Good B2B qualifying shape. Error and sending states are implemented in `ContactForm.tsx`.
- 🔴 Submits into the void — see §3.2.
- 🟠 `mailto:hello@hirebuddha.com` and `mailto:enterprise@hirebuddha.com` (plus `privacy@hirebuddha.com` on the privacy page) — confirm these mailboxes actually exist before launch.
- 📱 Mobile: form fields full-width, tap targets fine. ✅

### 5.4 `/pragya`
- **Renders:** "Meet Pragya. Your single point of contact." → capability cards (Route/Explain/Consult/Generate/Build·Preview/Select your fit) → **"Ask her anything. Right here."** live-prompt section → "Inside the product" ledger → closing CTA. The ask-chips section is the site's best conversion device.
- 🔴 Entirely dependent on the localhost-defaulted WSS backend (§3.3). On production without env config, the page's core promise fails.
- ✅ Otherwise clean; good depth (3,193 chars).

### 5.5 `/pricing`
- **Renders:** "Pay for outcomes. Not salaries." → three funding mechanisms (Daily Credits / PAYG Wallet / Subscription Credits) → ROI slider ("$532K estimated annual savings / 3,039 % ROI" at default inputs) → AI-vs-human per-task table → four plans → SKU floor prices ($0.50 Process / $0.05 Agent / $0.02 Skill / $0.01 Action) → CTA.
- ✅ Currency is now uniformly USD; the malformed `$1,00,000/mo` is gone; plans/table/calculator all agree. Prior critical fully resolved.
- 🟢 The savings table's "99 %+" rows and the ROI calculator's "3,039 % ROI" are aggressive but consistently labeled "illustrative" in three places on the page. Keep those labels adjacent to the numbers if the page is ever restructured.
- 🟢 Strategic note (not a defect): pricing is USD-only while the flagship stories are Indian companies (Saraswat Bank, Salasar Techno). If India is a primary market, consider a currency toggle — but the prior inconsistency was worse than either single choice.
- 📱 Mobile: plans stack cleanly; table scrolls within its container. ✅

### 5.6 `/privacy` · 5.7 `/terms`
- 🔴 Placeholder content — see §3.1. Both are 6-section skeletons with a visible "replace before launch" disclaimer. `/terms` is the only page besides `/contact` with zero em-dashes, for whatever that's worth.

### 5.8 Product: `/product/ai-employees`
- **Renders:** "Not chatbots. Cognitive workers." → five-tier hierarchy explorer (Loop→Process→Agent→Skill→Action, interactive) → Meta Agent "Describe the employee" section → identity/config anatomy (Identity, Personality Matrix, Login Suite, Tool Bindings, Knowledge Base, Memory, UC Contract, Governance) → three reasoning modes (ReAct / Chain-of-Thought / Details|Work-Path) → "Build it without code" → closing CTA. The strongest product page; dense and specific.
- 🟡 Second-highest em-dash count (21).
- 📱 Mobile: headline-first, anatomy cards stack correctly. ✅

### 5.9 `/product/intelligence`
- **Renders:** "AI that thinks, remembers, and gets better." → Intelligence Engine + router (with the live "Extract line items from a PDF" routing demo — excellent) → 4-tier memory → 8-stage cognitive loop ring → Learning System week-1→12 timeline.
- 🟡 **Mobile horizontal overflow** — the only layout bug on the site; see §4.4.
- ✅ Desktop clean.

### 5.10 `/product/tools`
- **Renders:** "20+ built-in tools. Infinite possibilities." → six tool-family cards (Web Intelligence, Email Ops, Document & Data Factory, Creative Studio, Precision & Dev, Enterprise Integration) with per-tool chips → "Don't see what you need? Describe it." Meta-Agent section → CTA. ✅
- 🟢 Verify the "20+" count stays true as chips change; it's a falsifiable number in an H1.

### 5.11 `/product/security`
- **Renders:** "Enterprise-grade security. By design, not afterthought." → multi-tenant isolation diagram → six governance cards (Encryption/Key Vault, Stateless Auth, HITL Governance, Model & Data Governance, Credit Circuit Breakers, Full Audit Trail) → "Autonomy you can prove and control" CTA. Claims are specific (AES-256-GCM, company-scoped queries) and match the privacy page. ✅
- 🟢 No compliance badges (SOC 2, ISO). If certifications exist, show them; if not, the page wisely doesn't fake them — leave as is.

### 5.12 Solutions: `/solutions` + 6 arcs
- **`/solutions`** — "From departments to one loop. From silos to Sheel." → department→arc mapping ledger (Market research→Perceive … Finance/Legal→Sustain) → loop film → CTA "Deploy into Sheel". No hydration error (prior critical fixed). ✅
- **`/solutions/perceive`** ✅ — clean arc template: hero → "What runs in this arc" (4 capabilities) → "How it executes inside the loop" (4 steps) → handoff banner "Continue to Arc II: Engage" → activation CTA. The arc-to-arc chaining is excellent information architecture.
- **`/solutions/engage`** ✅ — adds the channel row (Voice/Email/WhatsApp/Chat/Social/Phone). 📱 mobile clean.
- **`/solutions/orchestrate`** ✅ · **`/solutions/fulfill`** ✅ · **`/solutions/sustain`** ✅ · **`/solutions/evolve`** ✅ — same template, consistent depth (~2,100 chars each), all verified 200/error-free with correct next-arc chaining.
- 🟢 Template note: the six arc pages are structurally identical. That's defensible for a systematic concept like Sheel, but one bespoke visual element per arc (even a recolored motif) would stop them from feeling generated.

### 5.13 `/use-cases` (index)
- **Renders (when scrolling):** "Deploy in minutes. Impact in hours." → 7 use-case cards → closing CTA.
- 🟠 **The card grid is scroll-linked (kit `useScroll` reveal), not merely `whileInView once:true`** — in a full-page render (print, PDF export, some crawler screenshots, JS-disabled reader modes) the entire card section is blank black. Verified live scrolling shows it correctly, so users are unaffected, but this page is the strongest remaining example of the "reveal animations must enhance an already-visible default" rule being broken. Consider a non-zero initial opacity.

### 5.14 Use-case detail pages (7)
Template: hero (headline + one-line promise + "Deploy this use case") → "The problem." → "From trigger to outcome." 4-step flow → "What you get." checklist → "Deploy this in under 10 minutes." CTA.
- **`/use-cases/outbound-sales`** ✅ — reviewed in full; specific, honest flow (Source & enrich → Reach out → Qualify & book → Propose & close).
- **`/use-cases/customer-support`** ✅ · **`/financial-ops`** ✅ · **`/voice-screening`** ✅ · **`/contract-review`** ✅ · **`/executive-briefings`** ✅ · **`/meta-agent-build`** ✅ — all verified 200, clean, single H1, unique metadata.
- 🟡 All seven are thin versus their deck copy (~65 % unshipped; §4.2). The "What you get" bullets would be the natural place to add the deck's proof/objection-handling copy.

### 5.15 `/stories` (index)
- **Renders:** "Built by the platform. Run by the loop." → 7 story cards with industry tags → "Write your own story." CTA. ✅ (Now 7 stories; the deck's AU Bank story was replaced by Fortune Series + Eva World Tours + Salasar — index and detail pages agree.)

### 5.16 Story detail pages (7)
Template: hero (company, industry, one-line summary) → before/after or deployment blocks → pull quote → "The outcome." (3 bullets) → "Could this be your company?" CTA.
- **`/stories/gochillao`** — reviewed in full: multilingual voice agents story, quote "Our customers get answered instantly, in their language, at any hour." ✅ 📱 mobile clean.
- **`/stories/durwankur-ai-labs`** ✅ (the "India's first AI-native legal firm" claim is quoted on the homepage too — it's a strong claim attributed to a real client; ensure the client signed off) · **`/dnr-studios`** ✅ · **`/salasar-techno`** ✅ · **`/eva-world-tours`** ✅ · **`/fortune-series`** ✅ · **`/saraswat-bank`** ✅.
- 🟡 All seven are teaser-depth (~130–160 words of body; §4.2): no named humans behind the quotes, no quantified outcomes ("measured in hours" is the closest). Qualitative outcomes are the right call if real numbers don't exist (the copy rule bans fabricated metrics — correctly followed here), but at least attributing quotes to a name + title would add a lot of credibility.

### 5.17 `/blog` (index)
- **Renders:** "Notes from an AI-native company." → 7 post cards with category + read-time chips → CTA band. ✅
- 🟡 Read-time labels overstate by 5–8× (§4.2).

### 5.18 Blog posts (7)
Template: article hero (category · read time · title) → 3–4 short sections → CTA band.
- **`/blog/sheel-one-loop`** — reviewed in full: well-written but 4 paragraphs against a 1,895-word deck article marked "7 min read". 📱 mobile clean.
- **`/true-cost-of-employee`** · **`/cortex-memory`** · **`/one-router-many-brains`** · **`/self-improving-company`** · **`/pragya-meta-agent`** · **`/ai-native-organization`** — all verified 200, clean render, unique metadata; all share the same stub-depth issue.
- 🟢 No author, no date on any post. For a blog that wants organic traffic, both matter (E-E-A-T); they also feed `Article` structured data (§4.1).

### 5.19 ICP pages `/for/*` (4)
Template per family (persona kit + per-family accent): manifesto hero → narrative sections → interactive instruments (PhaseRail/LiveConsole/TiltCard) → team/economics blocks → sub-page directory → closing CTA.
- **`/for/solopreneurs`** ("You're not alone anymore.") ✅ — the invoice/inbox vignette cards and named-team teaser are the persona system at its best.
- **`/for/startups`** ("Your Unfair Advantage") ✅ 📱 mobile clean.
- **`/for/growing-companies`** ✅.
- **`/for/enterprise`** ("Don't rip and replace. Deploy and transform.") ✅ — appropriately denser (4,301 chars); governance table and pilot→platform path are well judged. 🟡 16 em-dashes, most of any non-home page.

### 5.20 ICP sub-pages (13)
All 13 verified 200, error-free, single H1, unique metadata, correct eyebrow lineage ("For X · Section").
- **Solopreneurs** — `/team` (named AI employees: Sarah, Raj, Maya + Strategy Analyst — distinctive and memorable) ✅ · `/your-day` ✅ · `/start` ✅.
- **Startups** — `/day-in-the-life` ✅ · `/vs` ✅ (battle cards vs hiring/outsourcing/point tools — comparisons are against categories, not named competitors; legally safe and still persuasive. 📱 tables stack cleanly on mobile) · `/launchpad` ✅.
- **Growing companies** — `/ops-playbook` ✅ · `/control` ✅ · `/roi` ✅ (interactive ROI builder present).
- **Enterprise** — `/architecture` ✅ (genuinely technical: reverse proxy, gateway, voice-server, Postgres+pgvector topology; "This isn't a wrapper." section is a strong differentiator) · `/integrations` ✅ · `/deployment` ✅ · `/business-case` ✅.
- 🟢 The shortest sub-pages (`/roi` 1,626 chars, `/your-day` 1,698) are near the "is this a page or a section?" line; they earn their URL only because the nav promises them. Watch that future sub-pages don't get thinner than this.

### 5.21 404 route
- 🔴 Broken — see §3.4.

---

## 6. Site-wide quality audit by category

### 6.1 Broken links: **none**
All 258 collected anchor hrefs resolve to exactly the 59 known routes (all HTTP 200), 2 external links, and 2 mailtos. No `href="#"` placeholders, no dead anchors, no orphan pages (every route is reachable from nav/footer/in-page links — full graph coverage both directions).
- External: `https://x.com/buddhalab`, `https://linkedin.com/company/buddha-cognitive-lab` — **could not be verified from this environment**; confirm both handles are live and owned before launch.
- Mailtos: `hello@`, `enterprise@`, `privacy@hirebuddha.com` — confirm mailboxes exist.

### 6.2 Technical health
- ✅ `tsc --noEmit`: clean.
- ✅ 0 console errors, 0 uncaught exceptions, 0 failed requests across 74 page loads (the only console noise: WebGL ReadPixels performance warnings on `/`).
- 🟠 ESLint: 3 real errors — `react-hooks/set-state-in-effect` in [Cursor.tsx:26](src/components/foundation/Cursor.tsx:26), [Header.tsx:33](src/components/layout/Header.tsx:33), [LiquidGoldGL.tsx:102](src/components/visual/LiquidGoldGL.tsx:102) — plus ~10 unused-var warnings in app code.
- 🟢 Lint noise: 1,116 of the 1,138 reported problems come from linting the minified `public/fluid-buddha.global.js`. Add `public/**` to the ESLint ignore list so real signal isn't buried.
- 🟢 Dead code: a light theme exists in CSS (`[data-theme="light"]` rules, localStorage bootstrap script in `layout.tsx`) but nothing in the UI ever writes `theme` — remove or finish it.

### 6.3 Design quality
- **Identity is strong and consistent**: black/gold system, Space Grotesk/Hanken/JetBrains type stack, bespoke canvas hero per page family, the gilded micro-interaction layer (cursor spotlight, gold veil, footer pour). Desktop reads premium page after page.
- **Template fatigue is under control** post-v4: home, product, solutions, personas, and content pages now use genuinely different instruments (ring film, hierarchy explorer, routing demo, orrery-descended ledgers, persona kit). The six arc pages are the one family that still reads as a single template (§5.12).
- **Mobile is now good** — the prior audit's worst surface is fixed. One overflow bug remains (§4.4). Heroes lead with copy; nothing overlaps; tap targets are adequate.
- 🟢 Numbered markers ("01/02/03") persist as list indices on home/product pages. As row indices in ledgers they read as intentional; keep them out of section eyebrows (currently they are — eyebrow discipline is good, ~2 per page).
- 🟢 CTA label drift: "Get Started" (header), "Get Started Free" (sections), "Start Free" (heroes) are three names for one action. Unify or deliberately tier them.

### 6.4 Content quality
- **Voice**: confident, concrete, consistent with the "Stop Hiring. Start Deploying." spine across all 59 pages. No lorem, no `{{tokens}}`, no TODOs anywhere in rendered text (verified programmatically).
- **Claims discipline is good**: aggressive numbers are labeled illustrative (pricing), story outcomes are qualitative rather than invented (correct per the no-fabricated-metrics rule), and comparisons name categories, not competitors.
- **Depth is the weakness**: blog/stories/use-cases ship a fraction of their written copy (§4.2); read-time labels are false as shipped.
- **Em-dash rule** unresolved (§4.3).
- 🟢 Blog posts lack author + date (§5.18).

### 6.5 Accessibility
- ✅ Skip-link present, `lang="en"`, visible `:focus-visible` ring, one H1 per page, `prefers-reduced-motion` respected across 10+ components, `aria-label`s on icon-only controls (17 uses), footer socials labeled.
- 🟠 **The header and footer logo images (`logo-mark-gold.svg`) have empty/missing alt on all 59 pages** — the only systematic alt gap (2 images/page, same two every time). The header logo is the home link; it needs `alt="HireBuddha home"`.
- 🟢 Not covered this pass (recommend a dedicated a11y pass): full keyboard walkthrough of the mega-menu and interactive instruments (hierarchy explorer, ROI sliders, reasoning-mode toggle), contrast spot-checks on gold-on-black small mono text, screen-reader behavior of canvas heroes (should be `aria-hidden` with text alternatives — the text alternatives do exist as real DOM).

### 6.6 Performance
Measured on the dev server (absolute numbers inflated; structure is what matters):
- 🟠 **`fluid-buddha.global.js` (600 KB) loads on every page** via `<Script strategy="afterInteractive">` even though Pragya only mounts on demand. Switch to `lazyOnload`, or inject the script the first time the user invokes Pragya.
- 🟠 Animation stack is heavy by design: framer-motion + GSAP/ScrollTrigger + Lenis + per-page WebGL/canvas. Acceptable for a cinematic site, but run a Lighthouse pass on a production build (couldn't be done here without disturbing the running dev server) and set a budget — especially for the `/` WebGL pipeline that's already logging GPU-stall warnings.
- ✅ Fonts are subset via `next/font` with `display: swap` and preloaded. Logo preloaded.
- ✅ No render-blocking failed requests; no oversized images in the shipped set (`public/images` is 804 KB of SVGs) — *after* the §3.5 cleanup.
- 🟢 No security headers configured (`next.config.ts` is empty): add CSP, HSTS, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy` before production (or set at the edge/host).

---

## 7. Prioritized action list

**Before any launch (blockers):**
1. Wire `/api/lead` to a real destination (CRM/DB/email). — §3.2
2. Set `NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS` per environment; make Pragya fail visibly-but-gracefully without it; use `wss://`. — §3.3
3. Replace privacy/terms placeholders with reviewed legal copy. — §3.1
4. Add branded `not-found.tsx` + `error.tsx`. — §3.4
5. Delete `public/sequences`, `public/lens`, `public/orbit`, template SVGs (~194 MB). — §3.5
6. Verify social handles and mailboxes exist. — §6.1

**Launch week (high):**
7. Add `sitemap.ts`, `robots.ts`, and an OG image (fix the `summary_large_image` promise). — §4.1
8. Fix the Intelligence loop-ring mobile overflow. — §4.4
9. Fix blog read-time labels (compute from actual word count), or ship the full deck articles. — §4.2
10. Decide the em-dash policy and enforce it one way or the other. — §4.3

**Fast follows (medium):**
11. Implement full deck copy for stories and use cases; add quote attributions to stories. — §4.2, §5.16
12. Add `alt` to header/footer logos. — §6.5
13. Fix the 3 `set-state-in-effect` lint errors; ignore `public/**` in ESLint. — §6.2
14. Lazy-load the FluidBuddha SDK. — §6.6
15. Add security headers. — §6.6
16. Put humans on the About page. — §5.2
17. Give `/use-cases` cards a visible non-JS/initial state. — §5.13
18. Add author/date + Article JSON-LD to blog posts. — §5.18
19. Remove or finish the vestigial light theme. — §6.2

**Backlog (minor):** production Lighthouse pass + WebGL profiling on integrated GPUs; keyboard/screen-reader audit of interactive instruments; per-arc visual differentiation on Solutions; CTA label unification; 1024 px nav-wrap re-check; consider trimming the home pinned-film runway.

---

## Appendix A — Measured data

**Routes crawled (59 + 404):** all HTTP 200 except `/this-page-does-not-exist` (404, as expected — but see §3.4 for its rendering).

**Em-dash counts per page (desktop, rendered text; top 15 of ~280 total):** `/` 23 · `/product/ai-employees` 21 · `/for/enterprise` 16 · `/product/intelligence` 15 · `/use-cases` 10 · `/for/solopreneurs` 10 · `/about` 9 · `/pragya` 8 · `/pricing` 8 · `/for/solopreneurs/team` 8 · `/for/startups/vs` 8 · `/product/security` 7 · `/stories` 6 · `/for/enterprise/architecture` 6 · `/blog` 5. Zero on `/contact` and `/terms`.

**Page text volume (chars, incl. ~800 of nav/footer chrome):** home 6,829 · ai-employees 6,432 · intelligence 4,543 · enterprise 4,301 · pricing 3,418 · arc pages ~2,000–2,300 · use-case details 1,636–1,826 · stories 1,363–1,645 · blog posts 1,706–2,046.

**Full-page heights at 1440 px:** home 13,872 px · ai-employees 8,657 · pricing 6,069 · startups ICP 6,333 · intelligence 7,469 · pragya 5,525 · solutions 5,492 · engage arc 4,478 · outbound-sales 4,224 · about 3,788 · gochillao 3,441 · blog post 2,880 · contact 1,696.

**Mobile pass (390×844):** `/`, `/pricing`, `/product/ai-employees`, `/product/intelligence` (⚠ overflow 423 px), `/solutions`, `/solutions/engage`, `/for/startups`, `/for/startups/vs`, `/use-cases/outbound-sales`, `/stories/gochillao`, `/blog/sheel-one-loop`, `/contact`, `/about`, `/pragya` — all clean except the flagged overflow.

**Toolchain:** Playwright 1.61 (Chromium), Next 16.2.7 dev server on :3100, ESLint 9, TypeScript 5.

## Appendix B — What was explicitly verified as fixed
Solutions hydration error · pricing currency & malformed lakh figure · mobile image-only heroes · homepage mobile overlap · pricing/contact reveal-gating voids · per-page metadata · footer completeness · contact form error states · single-H1 discipline · no failed asset requests.
