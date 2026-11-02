# Plan: get hirebuddha.com and buddhalab.in ready for connector approvals

**Date:** 2 November 2026 · **Status:** Plan only. Nothing is built yet. Q1–Q4 are answered (§2). D1–D13 use the defaults shown unless you change them.

**This plan combines four sources:**
1. The approval requirements in `hire-buddha-app/docs/phase15/14_connector_approvals/`, mainly `00_shared_prerequisites.md` (SH-xx), `08_website_readiness.md` (WEB-xx) and `11_website_content/`.
2. My audit, [website-audit-2026-11-02.md](website-audit-2026-11-02.md) (C-, H-, M- and L-numbered items).
3. Your four requests (R1–R4 below).
4. The current state of the company site in `buddha-cognitive-lab-website` (commit `94af820`).

### Your requests

| # | Request | How it is applied |
|---|---|---|
| R1 | Use one HQ address everywhere | `52, Gharkul Society, Indrayani Nagar, Beltarodi Road, Nagpur, Maharashtra, India - 440037` replaces every `[REGISTERED OFFICE ADDRESS…]` placeholder, on both sites and in the approval drafts. The company site already uses it. |
| R2 | Use only these six e-mail addresses | `rahul@`, `piyush@` and `contact@` on buddhalab.in and on hirebuddha.com. Every other address (`privacy@`, `support@`, `security@`, `grievance@`, `legal@`, `billing@`, `admin@`, `hello@`, `enterprise@`) is mapped onto these six. The proposed mapping is in §2 Q1. |
| R3 | Link the other product websites | hirebuddha.com, fluidbuddha.com and chantingbuddha.com are linked from both sites' footers and product pages. fluidbuddha.com returns 404 today, so it shows "launching soon" without a link until it loads, as the company site already does. |
| R4 | Company website | `https://buddhalab.in`, code in `buddha-cognitive-lab-website`. hirebuddha.com's footer says "HireBuddha is a product of Buddha Cognitive Lab Private Limited" and links to it. |

---

## 1. Where things stand today

| Area | State |
|---|---|
| **buddhalab.in code** | **Mostly done.** Commit `94af820` has the company config (legal name, CIN `U62099MH2024PTC417114`, Gharkul HQ, phone, three @buddhalab.in mailboxes, Grievance Officer Rahul Gondole), the legal pages, removed fake claims, prerendering, sitemap, `security.txt`, CI and tests. **It is not deployed:** live buddhalab.in still serves the old empty Lovable SPA (`<div id="root"></div>`). |
| **hirebuddha.com code (this repo)** | **Not started.** It fails WEB-03…WEB-13 and every critical item in the audit: template legal pages, no `/data-deletion`, no legal identity, fake customer names, integrations that don't exist, no sign-in, broken 404, Next.js RCE advisories, and the build fails on a clean checkout. |
| **Approval drafts** (`11_website_content/`) | Written, still with `[CIN]`, `[REGISTERED OFFICE ADDRESS]`, `[NAME]`, `[grievance@…]`, `[CONFIRM: …]` placeholders, and with nine role addresses that R2 rules out. |
| **Mail** | hirebuddha.com has **no MX record**. None of `rahul@`, `piyush@` or `contact@hirebuddha.com` can receive mail until it is added to Google Workspace (WEB-02). **This blocks publishing any hirebuddha.com page that shows those addresses.** |
| **Pragya backend** | `api.fluidbuddha.com` returns 503 on every path. The widget still says "online". |
| **`app.hirebuddha.com`** | Still a Vite **development server** on the old Google Cloud VM, publishing frontend source (WEB-01). Production is at `app.azprod.hirebuddha.com` (`infra/k8s/env/prod/hb-platform.yaml`, `FRONTEND_URL`). |

---

## 2. Decisions I need from you

**Answered on 2 Nov 2026:**

| # | Question | Your answer | What it means for the work |
|---|---|---|---|
| Q1 | E-mail mapping | **Use contact@ for every role** | `contact@hirebuddha.com` replaces privacy@, support@, security@, billing@, legal@, hello@ and enterprise@. `rahul@hirebuddha.com` is the Grievance Officer and the primary provider-account contact. `piyush@hirebuddha.com` is the second admin (SH-04). buddhalab.in follows the same pattern with `@buddhalab.in`. |
| Q2 | Sign-in hostname (SH-12) | **app.hirebuddha.com** | You repoint `app.hirebuddha.com` DNS from the old dev VM to Azure production (this also closes WEB-01). Engineering sets `FRONTEND_URL` and `CONNECTIONS_PUBLIC_URL` to match. "Sign in" and "Start free" link to `https://app.hirebuddha.com`. The provider redirect URIs then use `gateway.hirebuddha.com`, repointed the same way. |
| Q3 | Named customer stories | **All seven clients have approved them** | Keep the companies and the "Trusted by" marquee. **Remove the contradicting "Illustrative scenario" / "Illustrative deployment" captions** and attribute each quote to the company, or to a named person and title if they agreed. Keep each written approval on file, because reviewers and consumer law can ask for it. Check that each page's wording is what the client approved, especially Saraswat Bank's "explored governed automation". |
| Q4 | Lead destination | **E-mail to contact@** | Each lead is e-mailed to `contact@hirebuddha.com`, with Reply-To set to the visitor, through a transactional mail service. **You choose the service and give me an API key** (Resend, Brevo or Amazon SES; 11 §2.1 and MAIL-E5 want the same for the platform's own mail, so one service can serve both). The service's domain records (SPF/DKIM) go on hirebuddha.com. |

**Non-blocking.** I'll use these defaults unless you say otherwise:

| # | Decision | Default I'll use |
|---|---|---|
| D1 | Is the Gharkul HQ also the **registered office** on the certificate of incorporation? Meta and LinkedIn compare it character for character. | Yes. It's used as the registered office in every legal page, as on buddhalab.in. **Please confirm against the certificate.** |
| D2 | Grievance Officer on hirebuddha.com | Rahul Gondole, Founder & CEO, `rahul@hirebuddha.com`, +91 93102 31302 |
| D3 | Phone shown on hirebuddha.com | +91 93102 31302 and Mon–Fri 10:00–18:00 IST, as on buddhalab.in |
| D4 | Sub-processors (privacy §9 and `/subprocessors`) | From prod config: **Microsoft Azure** (Central India) and **Google Cloud Vertex AI** (Gemini and Claude; `ANTHROPIC_PROVIDER: vertex`). Also Razorpay and Google Workspace. **I need you to confirm** the telephony provider (Twilio / Tata Tele / Plivo), the transactional e-mail service, whether direct OpenAI, Azure OpenAI or Anthropic keys are used in prod, and the Vertex region. Unconfirmed rows stay out rather than guessed. |
| D5 | Pragya on the website while its backend is down | Keep it, but load it only when the backend's `/health` answers. Otherwise the button opens "Pragya is offline. Write to contact@hirebuddha.com". Add an AI and voice disclosure before the panel or microphone opens (11 §4.5). The "online" dot itself is in the fluid-buddha SDK, so I'll note it for that repo. |
| D6 | Pragya transcript retention (privacy §3) | Needs your answer: does `api.fluidbuddha.com` store transcripts or audio, and for how long? Until then the page says "not stored after the conversation ends" **only if true**. Otherwise I leave a visible TODO and don't publish. |
| D7 | Unbuilt integrations (Stripe, Plaid, Wise, DocuSign, Gusto, Salesforce, Slack, Teams, Jira, Linear, Apollo, Clearbit, SharePoint, Notion) | Remove the names. Where it fits, say "the Meta Agent can build a tool for systems you use" (WEB-09). Show only real connectors: Gmail, Google Drive, YouTube, Google Ads, Facebook Pages, Instagram, WhatsApp, LinkedIn Pages, Outlook, X, GitHub, HubSpot, IMAP mailbox, MCP. |
| D8 | "Learning" and BabyBuddha copy | Rewrite per WEB-10: learning stays inside each business, and connected-account data never trains BabyBuddha or any shared model. **You confirm the BabyBuddha sentence** (12 §2) before it goes live. |
| D9 | Pricing currency | Keep USD on the site, and add "prices exclude GST; billed in the currency shown at checkout" to match Terms §8. Say if you want INR. |
| D10 | Counsel review | I build every legal page from the drafts with all values filled. Publishing waits for counsel's sign-off and for mail (WEB-02). |
| D11 | 187 MB of orphaned assets already in git history | Delete them in a normal commit. **No history rewrite or force-push** unless you ask. |
| D12 | Em-dash rule | Out of scope. The legal pages follow the drafts as written. |
| D13 | Deployment | I commit to a branch and open a PR. You deploy to the VM, which I don't have access to. The Apache-side items (HSTS, `ServerTokens`, `www` certificate) go in a checklist for you. |

---

## 3. Work plan for hirebuddha.com (this repo)

Phases are in dependency order. Each item names the requirement or audit ID it closes. Effort: S ≤ ½ day, M ≤ 2 days, L > 2 days.

### Phase 0: Make the repo safe and buildable (do first)
| # | Change | Closes | Effort |
|---|---|---|---|
| 0.1 | Upgrade `next` and `eslint-config-next` to 16.4.4, run `npm audit fix`, and confirm the build | C2 | S |
| 0.2 | Put the fluid-buddha types in `src/types/fluid-buddha.d.ts` and drop the `file:../fluid-buddha` dependency, so a clean checkout builds | C1 | S |
| 0.3 | CI workflow: `npm ci`, lint, typecheck, build, and a Playwright smoke test (§6) | C1 | M |
| 0.4 | Delete `public/sequences`, `lens`, `orbit`, the template SVGs, the `.map` file and 9 unused font files. Fix `sync:agent` so it doesn't copy the `.map` | H7, M14 | S |
| 0.5 | ESLint: ignore `public/**`, fix the 3 `set-state-in-effect` errors and dead imports. Set `turbopack.root` and `outputFileTracingRoot` | M1, M13 | S |
| 0.6 | README covering setup, environment variables, SDK sync and deploy. Trim `.env.example` to the variables actually used (removing the GCP project ID and unused keys) | M13 | S |

### Phase 1: Company identity and legal pages (approval-critical)
| # | Change | Closes | Effort |
|---|---|---|---|
| 1.1 | **`src/config/company.ts`**, the single source, mirroring buddhalab.in's config: legal name, CIN, HQ (R1), phone, hours, the three @hirebuddha.com addresses (R2), Grievance Officer, product URLs (R3), company URL (R4), LinkedIn. Every page reads from it | SH-01, WEB-03 | S |
| 1.2 | **Footer on every page**: "© 2026 Buddha Cognitive Lab Private Limited · CIN …", the registered office, `contact@`, phone. Links to Privacy, Terms, Data deletion, Sub-processors, Refund policy and Grievance Officer. "HireBuddha is a product of Buddha Cognitive Lab Private Limited" linking to buddhalab.in. "Other products: fluIDBuddha (launching soon), ChantingBuddha". Year rendered on the server | SH-06, WEB-03, R3, R4, L8 | S |
| 1.3 | **`/contact`**: an HQ card with address, map link, phone, IST hours, `contact@` and the Grievance Officer. Replace the `hello@` and `enterprise@` mailtos per Q1. Add a privacy notice under the form | WEB-03, 11 §3.9, C4 | S |
| 1.4 | **Legal page component**: markdown rendered with `react-markdown` + `remark-gfm` (as on buddhalab.in), with `h2` sections, a "Last updated" line and its own metadata | WEB-04, M2 | S |
| 1.5 | **`/privacy`** from `11_website_content/hirebuddha.com/privacy.md`, all placeholders filled (R1, R2, D1–D4, D6), covering Pragya, voice and the lead form | SH-07, WEB-04, C6 | M |
| 1.6 | **`/terms`** from the terms draft. Courts and seat in Nagpur (if D1 holds). Billing and refund contact per Q1. Remove "binding contract provided during onboarding" | SH-08, WEB-04, C6 | S |
| 1.7 | **`/data-deletion`** from the draft. Confirm the in-app menu names (*Connections → Disconnect*, *Settings → Data & closing*, *Settings → Team*) against hire-buddha-app | SH-09, WEB-05 | S |
| 1.8 | **New pages:** `/subprocessors` (privacy §9 table), `/refund-policy` (Terms §8–9, for Razorpay), `/delivery` (online service, nothing shipped, for Razorpay) | SH-10, WEB-04, 11 §4.3 | S |
| 1.9 | **`/product/security`**: how to report a vulnerability (to `contact@` per Q1), hosting region Azure Central India, a link to `/subprocessors`. Add `/.well-known/security.txt` | SH-10, WEB-12 | S |
| 1.10 | **Branded `not-found.tsx`, `error.tsx` and `global-error.tsx`** | C8 | S |

### Phase 2: Claims and copy reviewers read
| # | Change | Closes | Effort |
|---|---|---|---|
| 2.1 | Customer stories (Q3: all approved): remove the "Illustrative scenario" and "Illustrative deployment" captions from the 7 stories and the homepage quote, and attribute each to the company (or a named person, if agreed). Keep the marquee. Record in the approval tracker that written approvals exist (WEB-09 "source noted") | C7, WEB-09 | S |
| 2.2 | **Homepage "Connections" section**: each real connector and what it does ("reads and answers your Gmail", "publishes to your YouTube channel", "replies to WhatsApp customers", "posts to your LinkedIn Page"…), plus "a person approves every outbound action" (SH-E4) | SH-06, WEB-11 | M |
| 2.3 | **Sign in and the primary CTAs** per Q2. Header "Sign in" link. Replace the "$5 / no card / 10 minutes" promises if self-serve signup isn't live | WEB-11, H5 | S |
| 2.4 | Remove unbuilt integrations (D7) from `site.ts`, `icp.ts`, `ToolSuites.tsx`, `pragya/page.tsx`, `solutions/page.tsx`, `about/page.tsx` and `content.ts` | WEB-09, L3 | M |
| 2.5 | Learning and BabyBuddha copy (D8) in `Lifecycle.tsx`, `about`, `product/intelligence`, `product/ai-employees` and the old privacy wording | WEB-10 | S |
| 2.6 | Counters show their final values in the server HTML (no "0+ industries"). Hero H1, lead and CTAs visible without JS | WEB-09, H4 | M |
| 2.7 | Pricing matches Terms §8: daily credits expire the same day, top-ups last 365 days, GST excluded (D9). The plan grid gets a clear price or a clear way to choose (M8). The ROI model accounts for the share of work automated | 11 §4.8, M8 | M |
| 2.8 | Blog read times calculated from word count, and author and date added. Story and use-case thinness: out of scope unless you want the deck copy shipped | H6, L6 | S |

### Phase 3: Pragya
| # | Change | Closes | Effort |
|---|---|---|---|
| 3.1 | Load the SDK on demand (first "Talk to Pragya" click), not on every page. Remove the `ws://localhost` fallback from production builds | M5, C3 | S |
| 3.2 | Check backend health before opening, with an offline fallback to `contact@` and `/contact` (D5) | C3 | S |
| 3.3 | Disclosure before the panel or microphone opens: "You're talking to an AI; voice is converted to text to answer; see our Privacy Policy" | 11 §4.5, WEB-04 #11 | S |
| 3.4 | Note for the fluid-buddha repo: tie the status dot to the real socket state | C3 | (other repo) |

### Phase 4: SEO, headers and crawlers
| # | Change | Closes | Effort |
|---|---|---|---|
| 4.1 | A `buildMetadata()` helper that sets OG, Twitter and canonical per page. Generated `opengraph-image`. `apple-icon` and `favicon.ico`. `Organization` JSON-LD with legal name, address and the `sameAs` links to buddhalab.in, fluidbuddha.com and chantingbuddha.com | H1 | M |
| 4.2 | `sitemap.ts` and `robots.ts` | H1, WEB-12 | S |
| 4.3 | `next.config.ts`: `poweredByHeader: false`, CSP (allowing `wss://api.fluidbuddha.com`), HSTS and `frame-ancestors`. Apache checklist for you: `ServerTokens Prod`, `www` certificate and redirect | H9, WEB-13, WEB-06 | M |

### Phase 5: Accessibility and layout (from the audit)
| # | Change | Closes | Effort |
|---|---|---|---|
| 5.1 | Fix the mobile overflow on `/for/solopreneurs/your-day` and `/product/intelligence` | H2 | S |
| 5.2 | Nav: no wrapping between 1024 and 1280 px (`nowrap`, and the burger below about 1200 px) | H8 | S |
| 5.3 | Keyboard: menus that open on click, panels next to their buttons, the skip link moves focus, the mobile sheet is a modal dialog, `aria-expanded` on the burger, native cursor on inputs | H3 | M |
| 5.4 | Contrast (`--fg-subtle` raised to at least 4.5:1), heading levels (h2 not h3), tap targets of at least 24 px, a hidden list behind the aria-hidden marquee | M2–M4, L1 | S |
| 5.5 | Nav the same on mobile and desktop: ICP sub-pages in the mobile menu, Pragya in the desktop nav | M12 | S |

### Phase 6: Lead form
| # | Change | Closes | Effort |
|---|---|---|---|
| 6.1 | E-mail each lead to `contact@hirebuddha.com` through the transactional mail service (Q4), with Reply-To set to the visitor, keeping `teamSize` and `message`. Key from an environment variable. If sending fails, the form shows an error with the contact@ address, never a false "Thank you" | C5 | M |
| 6.2 | Schema validation (types, lengths, real e-mail), JSON only, a body size limit, rate limit, honeypot, honest success copy | C5 | S |

### Out of scope here (noted only)
- Dead persona and light-theme code (M6, M7). Low risk, so I'll remove it only if time allows.
- Em-dashes (M9), meta lengths (M10), internal linking (M11), the ICP content depth and the "calm" belief copy (L5).

---

## 4. buddhalab.in (`buddha-cognitive-lab-website`)

The code is already approval-ready. Remaining work:

| # | Change | Who |
|---|---|---|
| B1 | Product page and footer: link fluidbuddha.com once it loads (`live: true` in `company.ts`). Make the HireBuddha product copy match the connectors list of 2.2, so both sites describe the same product | Me (S) |
| B2 | Check there are no leftover placeholder addresses or other e-mails (its tests already enforce this) | Me (S) |
| B3 | Fix the timeline order ("Feb 2024: HireBuddha launched" sits after Nov 2024) once you confirm the right date | Me, after your answer |
| B4 | **Deploy it.** Live buddhalab.in is still the old SPA with the San Francisco legal pages | You (or me, with the deploy secrets) |
| B5 | Rotate the old SMTP password (it's in git history), create `buddhalab-mail-config.php` on the server, DKIM for buddhalab.in, `www` certificate | You |

---

## 5. Approval documents (`hire-buddha-app/docs/phase15/14_connector_approvals`)

| # | Change |
|---|---|
| A1 | `11_website_content/*/*.md` (6 drafts): fill `[CIN]`, `[REGISTERED OFFICE ADDRESS…]` (R1), `[CITY…]` (Nagpur), `[NAME]`/`[DESIGNATION]`/`[PHONE]` (D2), `[grievance@…]` and every role address per Q1 (R2), and the confirmed sub-processors (D4). Leave dates and the D6 retention as explicit TODOs until known |
| A2 | `11_website_content/README.md` §2.1 and §2.3: replace the placeholder table and the mailbox list with the decided values |
| A3 | `00_shared_prerequisites.md` SH-01, SH-02 and SH-12: record the identity values, the six-mailbox decision and the hostname decision. Status Open → In progress |
| A4 | `08_website_readiness.md`: keep the 28 Oct findings as history, add a "Status 2 Nov" column, mark what each repo fixes, and replace "use `@buddhalab.in` until WEB-02" advice to match Q1 |
| A5 | `README.md` "What would fail today" item 1: update to the new state. Add my audit's findings that the 28 Oct check didn't have: Next.js advisories, Pragya 503, identical OG tags on all pages, broken build on a clean checkout |

I'll keep the placeholder *findings* that describe the old sites ("123 AI Boulevard", `buddhacognitive.com`), because they're evidence of what was wrong. Every placeholder *value* in the drafts gets replaced.

---

## 6. How I'll verify

- **Builds:** `npm ci && npm run build` from a clean clone, with no sibling repo present.
- **Playwright smoke test**, kept in the repo: every route returns 200; no console errors; no horizontal overflow at 390 px; one H1 per page; unique title and description per page.
- **Content checks:** every page has its own `og:title` and `og:url`. Every page contains the legal name, CIN and HQ (R1) in the server HTML (`curl` + `grep`, which also proves no-JS rendering).
- **Placeholder check:** grep on the built output finds no `[CIN]`, `[REGISTERED`, `[NAME]`, `[CONFIRM`, `buddhacognitive`, `AI Boulevard` or `Template content`.
- **E-mail check:** the only addresses in the built output are the six of R2, and only the @hirebuddha.com three appear on hirebuddha.com.
- **Keyboard script:** reaches every mega-menu link, and the skip link focuses `<main>`.
- **API checks:** `/api/lead` rejects bad e-mails, oversized bodies, non-JSON and bursts.
- **Re-run** the audit crawl and attach the results to the PR.

---

## 7. Things only you can do (they block approvals regardless of code)

| Priority | Task | ID |
|---|---|---|
| **Today** | Take `app.hirebuddha.com` (the Vite dev server) off the internet, and rotate any secrets on that VM | WEB-01 |
| **Today** | Add hirebuddha.com to Google Workspace, and create `rahul@`, `piyush@` and `contact@` there (users or aliases), with MX, SPF, DKIM and DMARC at GoDaddy. Test each address from outside | WEB-02, SH-02, C4 |
| This week | Bring `api.fluidbuddha.com` back up (it returns 503) | C3 |
| This week | Point `app.hirebuddha.com` and `gateway.hirebuddha.com` at Azure production (Q2), and get certificates for both there | SH-12, WEB-01 |
| This week | Choose the transactional mail service and send me its API key (Q4) | C5, MAIL-E5 |
| This week | Confirm the sub-processors (D4) and Pragya's transcript retention (D6) | SH-07 |
| This week | Deploy buddhalab.in (B4) | WEB-03/04 |
| This week | `www` certificates on both domains; TXT verification for Google Search Console, Meta and Microsoft | WEB-06, WEB-07 |
| Before publishing | Counsel review of the six legal pages; confirm D1 against the certificate | SH-07/08 |
| Anytime | Register `buddhacognitive.com`; make the LinkedIn page match the legal name and site | WEB-15, SH-05 |

---

## 8. Order and rough effort

1. **Day 1:** Phase 0, plus A1–A3 once Q1 is answered.
2. **Days 2–4:** Phase 1 (identity, legal pages, 404). Ready to publish as soon as mail works and counsel signs off.
3. **Days 4–6:** Phase 2 (claims, connections, sign-in) and Phase 3 (Pragya).
4. **Days 6–8:** Phases 4–6 (SEO, headers, accessibility, lead form). Then B1–B3 and A4–A5.
5. **Day 8:** verification (§6), then the PR for review. You deploy, then re-run the `08` checks against the live sites before any provider submission.

Total: about 8 working days of engineering. The calendar time is driven by mail setup, counsel and the provider reviews themselves.
