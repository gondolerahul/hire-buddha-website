# HireBuddha — UI/UX Design Review (Rendered-Experience Audit)

**Date:** June 17, 2026
**Reviewer:** Senior UI/UX designer (visual + code audit)
**Method:** Every route was *rendered in a real browser* (Chromium via Playwright) at desktop (1440 / 1366 / 1280 / 1024) and mobile (390px), with scroll-stepped captures on the cinematic and scroll-revealed pages. Findings are grounded in what the pages actually look like on screen, cross-checked against the source and against the project's own skills (`impeccable`, `taste-skill`, `bold`, `perspective`, `scroll-experience`, `framer-motion`, `antigravity`). Supplementary data (eyebrow counts, em-dash counts, console errors, failed requests, scroll heights, nav heights) was extracted from the live DOM.
**Scope:** All 36 page routes + dynamic detail templates. No code was changed.
**Supersedes:** `docs/uiux_review_report.md` (a code-only audit). Several of its "critical" items have since been fixed; this document corrects them (see §1).

---

## 0. Table of Contents

1. [What changed since the last audit (already fixed)](#1-what-changed-since-the-last-audit-already-fixed)
2. [Executive summary & grade](#2-executive-summary--grade)
3. [Top issues, ranked](#3-top-issues-ranked)
4. [Mobile experience (the weakest surface)](#4-mobile-experience-the-weakest-surface)
5. [Homepage](#5-homepage)
6. [Product pages (AI Employees, Intelligence, Tools, Security)](#6-product-pages)
7. [Solutions (Orrery)](#7-solutions-orrery)
8. [Pricing](#8-pricing)
9. [Contact](#9-contact)
10. [About](#10-about)
11. [Stories, Use Cases, Blog](#11-stories-use-cases-blog)
12. [ICP pages (/for/*)](#12-icp-pages-for)
13. [Legal & Security pages](#13-legal--security-pages)
14. [Navigation & header](#14-navigation--header)
15. [Footer](#15-footer)
16. [Design system, tokens & typography](#16-design-system-tokens--typography)
17. [Motion & scroll architecture](#17-motion--scroll-architecture)
18. [Copy & content](#18-copy--content)
19. [Accessibility](#19-accessibility)
20. [SEO & performance](#20-seo--performance)
21. [Skill-by-skill compliance](#21-skill-by-skill-compliance)
22. [Prioritized action list](#22-prioritized-action-list)
23. [Appendix: measured data](#appendix-measured-data)

---

## 1. What changed since the last audit (already fixed)

A real-browser pass shows the team has already resolved most of the prior report's "critical" and several "major" items. Crediting them so effort isn't wasted re-fixing solved problems:

| Prior finding | Status now | Evidence |
|---|---|---|
| `--fg-faint` fails WCAG AA (#847c73) | ✅ Fixed | now `#a09790` ≈ **6.9:1** on the canvas; `--fg-subtle` `#a69d94` also passes |
| Upper type scale is fixed px (non-responsive) | ✅ Fixed | `--text-3xl…6xl` now use `clamp()` |
| Contact form silently succeeds on API failure | ✅ Fixed | `else { setError(…) }` + `catch { setError(…) }`, inline error UI, `Sending…` state |
| Mobile menu: no focus trap / no scroll lock | ✅ Fixed | `document.body.style.overflow='hidden'` + a focus-trap `useEffect` in `Header.tsx` |
| Skip-to-content link missing | ✅ Fixed | `<a href="#main-content" class="skip-link">` + `<main id="main-content">` in `layout.tsx`; `lang="en"` set |
| Contact LinkedIn → generic homepage | ✅ Fixed | now `linkedin.com/company/buddha-cognitive-lab` |
| Contact "Email Node" jargon header | ✅ Fixed | now "Email Address" |
| Contact textarea hardcoded 80px | ✅ Fixed | `min-height:120px; resize:vertical` |
| Use Cases Pragya uses `detail.message` | ✅ Fixed | now `detail:{ prompt: … }` |
| Footer missing 2 loops / no social / missing Stories+Use Cases | ✅ Fixed | footer now lists all 7 loops, has Twitter/X + LinkedIn, and Stories/Use Cases in Company |
| Blog posts link to product pages | ✅ Fixed | links go to real `/blog/[slug]` routes that render (verified 200, ~54 KB each) |
| Homepage "eyebrow on every section" | ✅ Largely fixed | homepage now uses only **2** eyebrows across 10 sections (well within the 1-per-3 rule) |
| Stories has only 3 / lists fewer than referenced | ✅ Fixed | now **5** stories (Durwankur, GoChillao, AU Bank, Saraswat, DnR) |
| Frame-sequence 404s / no fallback | ✅ Not reproducing | **zero failed requests** across the site; all WebP sequences load |

The remainder of this document is **new** findings from rendering, plus the prior items that genuinely still stand.

---

## 2. Executive summary & grade

HireBuddha is, visually, in the top percentile of B2B sites I review. The "ink in water" sumi-e homepage film, the traveling glass **lens** on the product pages, and the **Orrery** on Solutions are genuinely original instruments executed with real craft. The gold-on-warm-black system is distinctive and disciplined. On a large desktop, page after page lands as "expensive."

The problems are not taste — they are **consistency under real conditions**. The site is built and judged on desktop; **mobile is materially worse**, and on the flagship homepage it is partially broken. The signature lens pattern, repeated across ~12 pages, tips from "signature" into "template." And a layer of small craft defects (a hydration error, mixed currency on the pricing page, em-dashes everywhere, numbered-eyebrow scaffolding) chips at the premium positioning the design works so hard to earn.

| Severity | Count | Themes |
|---|---|---|
| 🔴 Critical | 5 | Mobile section overlap (home), mobile cinematic heroes show no headline, Solutions hydration error, pricing currency, scroll-reveal gating hides content |
| 🟡 Major | 11 | Pattern monotony (lens), em-dash pervasiveness, numbered/poetic eyebrows, nav wraps at 1024, /for templating, form affordance, per-page SEO metadata, scroll-length cost, two art-direction palettes, About has no humans, tiny type |
| 🟢 Minor | 9 | token-ramp collapse, repeated CTA labels, cutesy labels, legal TOC, en-dash ranges, hero first-frame ambiguity, mixed `$`/`₹` in copy, missing JSON-LD, `proof:Durwankur` typo |

**Grade: A‑ on desktop, C+ on mobile. Blended B+.** The ceiling here is genuinely "awards" tier; the gap is mobile parity + a pass to break the template feel and clean the craft tells.

---

## 3. Top issues, ranked

1. **🔴 Homepage mobile — sections overlap into unreadable text-over-text.** At a stable mid-scroll position (390px), the "Pay Per Outcome / Building your AI workforce takes three steps" beat renders *on top of* the Design/Deploy/Employ cards. This is the flagship page on the majority device. (§4, §5)
2. **🔴 Cinematic heroes have no value proposition above the fold on mobile.** On AI Employees, Solutions, Intelligence, Tools and Security, the first mobile viewport is the *specimen/instrument alone* (a glass orb labeled "01 — GENESIS", the Orrery labeled "THE COMPANY", a gem labeled "01 — THE VAULT"). The headline is pushed to the bottom edge — where its last line is clipped and overlapped by the floating gold Pragya button. (§4, §6)
3. **🔴 Solutions throws a React hydration mismatch.** The Next dev overlay shows "1 Issue"; the console logs *"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."* Almost certainly the `Orrery` reading `window.matchMedia` during initial render to choose mobile vs desktop geometry. Causes a flash/shift and is a real correctness bug. (§7)
4. **🔴 Pricing currency is inconsistent and partly malformed.** Plans are quoted in USD (`$0` / `$100/mo` / `$500/mo`) and then **`$1,00,000/mo`** for Enterprise — a dollar sign with Indian lakh digit-grouping, and a 200× jump from the $500 tier. Meanwhile every value/savings number on the same page is in **₹** (₹1,92,000 → ~₹280; ROI calculator in ₹). On the single most-scrutinized page, this reads as a bug. (§8)
5. **🔴 Below-the-fold content is gated entirely on scroll reveals.** Pricing and Contact render the hero and then a blank black void until the user scrolls; the plan cards, ROI calculator, comparison table, and contact form/paths are all `whileInView`-gated. In a real browser they appear on scroll, but: nothing is visible to no-JS/crawlers, the initial paint looks empty, and it violates the `impeccable` rule "reveal animations must enhance an already-visible default." (§8, §9, §17)
6. **🟡 The lens pattern has become the site template.** The "traveling lens + counter-positioned text beats" drives Intelligence, Tools, Security, About, the Pricing hero, all four /for pages, and the Stories/Use-Cases/Blog heroes. It's beautiful once; by the fifth page it reads as a template. (§6, §12, §21)
7. **🟡 Em-dashes everywhere.** 150+ visible em/en-dashes site-wide (Solutions **28**, About **13**, product pages 9-12 each, /for pages 7-12). The `taste-skill` calls this its #1 banned tell with zero tolerance. (§18)
8. **🟡 Numbered + poetic eyebrow scaffolding.** "03 — Your Day", "03 — The Iceberg", "02 — Our Story", "03 · Operational Fulfillment" appear across /for, About and Solutions (the `impeccable` "numbered section markers as default scaffolding" ban), plus a formulaic poetic set: "Ideas · in ink", "Proof · in light", "Value · in balance", "Capability · in formation". (§18)
9. **🟡 Nav wraps to two lines at 1024px** (89.6px tall vs 73.8px at ≥1280). Eight top-level items + two CTAs is too dense to hold the `lg` breakpoint. (§14)
10. **🟡 Scroll-length cost.** /for pages are ~**1268vh** (≈12.7 screens) each; the homepage is 1188vh; product pages 800-1030vh. That's a large scroll commitment per page, and several beats feel sparse. (§17, Appendix)

---

## 4. Mobile experience (the weakest surface)

Mobile is where the gap between intent and result is widest. Three systemic problems:

- **🔴 Pinned-beat overlap (homepage).** At stable scroll positions (captured after a 1.1s settle, not mid-transition), two film beats are simultaneously fully opaque and stacked, e.g. "Pay Per Outcome…" text laid over the "Design/Deploy/Employ" cards, with the step rail (1·2·3) and the ink blob also colliding. Result: unreadable. This points to the beat opacity/stacking math not being mutually exclusive on the shorter mobile `heightVh`. **Action:** audit the ScrollFilm beat transitions on mobile so only one beat is visible at a time; increase per-beat scroll spacing or crossfade with hard enter/exit thresholds.

- **🔴 Cinematic heroes are "image-only" on mobile.** Because the lens/specimen stacks *above* the copy on narrow screens, the first viewport is an abstract visual with a small label and no headline. A visitor landing on `/product/ai-employees` sees a black screen with a glass orb and "01 — GENESIS"; on `/solutions`, the Orrery and "THE COMPANY". The value proposition only appears after a scroll, and even then (Intelligence/Tools/Security) the headline sits at the very bottom with its last line clipped and **overlapped by the floating Pragya button**. **Action:** on mobile, lead the hero with the headline + subhead, then the specimen; shrink the specimen to ~40vh; and add bottom padding / hide the floating Pragya orb in the hero zone so it never covers copy.

- **🟡 The floating Pragya button overlaps content on mobile.** The gold orb (bottom-right) sits on top of hero headlines on the product pages. Give it a safe-area offset and ensure it never overlaps primary text or CTAs. (The bottom-left "N" badge in screenshots is the Next.js dev overlay, not site UI — ignore it.)

Positives: the **homepage mobile hero card** itself is well-composed (eyebrow, gold-accented headline, 4-line subhead, single CTA), the loop beats on Solutions mobile and the ReAct/Chain-of-Thought toggle on AI Employees mobile render cleanly, and no page showed horizontal overflow.

---

## 5. Homepage

**Rendered narrative (10 sections):** Hero "Stop Hiring. Start Deploying." → "Connect to the tools you already run" (integration chips) → cost beats ("₹35 Lakh / 2.3 Years / 24/7/365" over a dripping-ink visual) → build steps "Design / Deploy / Employ" → "7 Autonomous Business Loops" selector → "Meet Pragya." (ink figure + try-asking chips) → "Real companies. Real loops. Real results." (7+/7/20+/2 stat band) → final CTA "Your AI workforce is ready. Are you?" over an ink splash with water ripples.

**Strengths.** The ink-in-water film is a real signature — the dripping strands, the figure forming from ink for Pragya, and the ripple-ring finale are memorable and on-brand. Eyebrow restraint is now correct (2 across 10 sections). Concrete, India-relevant numbers (₹35 Lakh, 2.3 years) beat generic claims. The "Meet Pragya" section that actually invokes the assistant is a strong conversion device.

**Issues.**
- 🔴 Mobile section overlap (see §4) — highest priority on the site.
- 🟢 **Hero first frame is ambiguous.** Frame 0 is a small indeterminate white cloud on a large black field with the value-prop card tucked bottom-left. For ~1s the page reads as "mostly empty + a blob." Consider starting the film a few frames in, or weighting the headline card more in the initial composition so the value prop commands before the ink resolves.
- 🟢 "Learn more" appears 3× as a CTA label; the loop selector could use destination-specific labels ("See the Growth Loop").
- 🟢 5 em-dashes / 2 en-dashes in copy ("three steps — not three quarters").

---

## 6. Product pages

All four (`/product/ai-employees`, `/intelligence`, `/tools`, `/security`) share one hero template: eyebrow top-left, two-line headline with the second line in gold, lens specimen card top-right. On desktop this is excellent — clear, premium, well-balanced. AI Employees is the strongest single page on the site: the lens travels right↔left across beats (glass orb → chrome DNA → ink-face → crowd), and the ReAct/Chain-of-Thought toggle and tier stepper are premium, *motivated* interactions.

**Issues.**
- 🔴 Mobile heroes are image-only / clipped (see §4).
- 🟡 **Two art directions.** AI Employees uses *monochrome chrome/ink* specimens; Intelligence/Tools/Security use *warm gold* specimens (brain, mandala, gem). Both are "on brand," but side-by-side the four sibling pages don't share a palette, and the DNA motif even appears in two different colorways (chrome on AI Employees, gold on Intelligence). Pick one specimen art-direction language for the product family, or make the split intentional and legible.
- 🟡 **Density inside beats.** The "Fully configurable" 2×2 item grid and the longer tool/layer lists run at ~12px in two columns inside a glass card inside a moving beat. Readable on desktop, cramped on mobile. Prefer single-column at small sizes and bump to ≥13px.
- 🟡 **Sparse scroll.** Intelligence ≈ 808vh / Tools ≈ 968vh / Security ≈ 858vh / AI Employees ≈ 1028vh for 6-7 beats means ~130-150vh of scrolling per beat — a lot of travel between payloads. Tighten toward ~110-120vh/beat.
- 🟢 Each page carries 9-12 em-dashes in body copy and lens labels ("01 — THE VAULT", "think fast or think deeply —").

---

## 7. Solutions (Orrery)

The Orrery is the most ambitious instrument on the site: a glowing concentric-ring system with a liquid-gold maki-e core that rotates each loop to a fixed reading position, with a nice "Listen" audio affordance. The closing "One loop is powerful. Seven loops is transformational." recap (how loops feed each other) and the before→after department/loop reframe are genuinely persuasive content.

**Issues.**
- 🔴 **Hydration mismatch** (the "1 Issue" badge). Console: server/client HTML attribute divergence — initialize the Orrery's mobile/desktop branch from a stable SSR default and switch in `useEffect`, rather than reading `window.matchMedia` during render.
- 🔴 Mobile hero shows the Orrery + "THE COMPANY" only — no headline above the fold (see §4).
- 🟡 **Seven identical loop beats.** Every loop is `LOOP 0X / 07` → title → tagline → "Replaces" → agent bullets → "View Loop Blueprint" + customer chip. "View Loop Blueprint" repeats **7×**. It's an instrument, so consistency is partly defensible, but consider varying 2-3 beats (lead one with a customer metric, one with an expanded agent detail) to break the rhythm — exactly the `taste-skill` section-repetition concern.
- 🟡 15 eyebrow-style labels on the page (incl. "03 · Operational Fulfillment", "Before — Departments & Roles", "Pillar 1/2/3"). The numbered + "Pillar N" scaffolding is the banned default-marker pattern.
- 🟡 **28 em-dashes** — the highest on the site.
- 🟢 `proof:Durwankur` is missing a space after the colon in the recap panel.

---

## 8. Pricing

Content-rich and, on desktop with scrolling, genuinely compelling: four plan cards (Free / Starter / Growth / Enterprise), a "Calculate Your Annual Savings" ROI slider tool, a clean "Same task. Same quality. 99% lower cost." human-vs-AI comparison table, and three real customer-spend cards (GoChillao, Fortune Series, Durwankur).

**Issues.**
- 🔴 **Currency.** Plans in `$` (`$0`/`$100/mo`/`$500/mo`) → Enterprise **`$1,00,000/mo`** (dollar glyph + lakh grouping; 200× the Growth tier). All value framing on the page is in `₹`. Task-cost examples are in `$` with en-dashes ("~$0.03 – $0.10") while the comparison table is in `₹`. **Action:** choose one currency for prices (or show both with a toggle), fix the Enterprise card to "Custom" or a correctly-grouped figure, and standardize so price and savings are comparable at a glance.
- 🔴 **Scroll-reveal gating.** The entire page below the hero is invisible until scrolled. The hero's "See the Plans" presumably scrolls, but the initial paint is hero-then-void; for a pricing page especially, ensure content has a visible default (animate from a visible state, or trigger reveals on load for above-the-fold-plus-one).
- 🟢 En-dashes in every range; em-dashes in card copy ("…intelligence — fully automated").
- 🟢 The previously-noted `plans-grid` `minmax(250px,1fr)` now has a 769-1024px override block, which mitigates the cramped-tablet concern.

---

## 9. Contact

The "two paths" design (Pragya chat vs. human form) is the right pattern for an AI-first company, with smart pre-filled prompts and (now) proper error handling and a real LinkedIn link.

**Issues.**
- 🟡 **Weak form-field affordance.** Inputs use `--surface-2` (#1c1916) with an **8%-alpha** border on a translucent glass panel, so the fields are nearly invisible at rest (the focus state — gold border + ring — is good). Bump the resting border to `--border-strong` (16%) or add a subtle inner fill so users can see where to type. This is the `taste-skill` form-contrast check.
- 🔴/🟡 Scroll-reveal gating (Scroll3DContainer) leaves the page hero-then-void on initial paint (see §5/§17).
- 🟢 Cutesy section labels ("Social Matrix", "Office Hub", "Path 1/Path 2") — "Social", "Office", "Talk to Pragya / Email us" would read straighter.
- 🟢 Anthropomorphizing ("She knows everything about HireBuddha — …") plus an em-dash.

---

## 10. About

Uses the StillLens beats with gold specimens (spiral, lotus) and strong manifesto copy ("Towards digital enlightenment.", "Intelligence should be accessible. Not expensive.").

**Issues.**
- 🟡 **No humans anywhere.** The About page is entirely abstract gold specimens — no founder, no team, no faces, no place. For the page whose job is trust and "who's behind this," the absence of any human element is a missed opportunity and makes About feel like another product page. Add at least a founder/team presence.
- 🟡 13 em-dashes; numbered eyebrow "02 — Our Story" and "HIREBUDDHA — OUR FIRST PRODUCT" (em-dash in the eyebrow).
- 🟢 Structurally identical to the product pages (lens + beats), reinforcing the template feel (§6, §21).

---

## 11. Stories, Use Cases, Blog

These render fully and cleanly (no scroll-reveal void), and are among the more "normal" pages.

- **Stories** (5 cards: Durwankur, GoChillao, AU Bank, Saraswat, DnR) — good category badges, quote, "Read Case Analysis →". Detail pages (`/stories/[slug]`) render with company eyebrow, CTAs, gold specimen, then The Company / The Challenge.
- **Use Cases** (6 cards) — loop-tagged, "Read Blueprint →". Detail pages render the same way.
- **Blog** — hero + 1 featured post + 2 cards, all linking to real, rendering `/blog/[slug]` pages.

**Issues.**
- 🟡 **Card-grid uniformity** (Stories, Use Cases): identical same-size cards (icon/badge + title + text + link), the `impeccable` "identical card grids" caution. With 5-6 items, a bento/featured-first layout (one large lead card + smaller followers, a metric on 1-2 cards) would add hierarchy and life.
- 🟢 **Tiny type:** blog category tags render at **9px**, dates/metas at 10-11px — below comfortable reading and a11y minimums for incidental text. Raise to ≥11-12px.
- 🟢 Poetic eyebrows again ("Proof · in light", "Ideas · in ink", "Capability · in formation").
- 🟢 Blog at ~227vh with only 3 posts; fine for launch, but the section will need real volume to justify a top-nav slot.

---

## 12. ICP pages (/for/*)

Four persona tracks (startups=lime, growing=teal, solopreneurs=rose, enterprise=indigo), each with three sub-pages. The ICP accent theming is architecturally elegant — the accent flows to the nav, buttons, *and* the lens specimen glow — and the copy is sharp and persona-specific ("They have headcount. You have HireBuddha. You win.").

**Issues.**
- 🟡 **Template clones.** The four landing pages are near-identical skeletons: hero → "problem" → "imagine / day-in-life" → "reframe / economics" → "case studies" → final CTA, each with a "03 —" numbered eyebrow and "Approach 1/Approach 2" or "Pillar 1/2/3" scaffolding, each ~**1268vh** tall, each driven by the same traveling lens. Recoloring is not differentiation. Give each persona at least one distinct section *type* (e.g. a comparison for startups, an org-iceberg diagram for growing, a cost-of-one calculator for solopreneurs, a security/architecture block for enterprise).
- 🟡 Length: ~12.7 screens per page × 4 + 12 sub-pages is a very large, very repetitive surface to maintain and to scroll.
- 🟡 Numbered eyebrows + 7-12 em-dashes each.
- 🟢 ICP accent change is instant on selection — add a transition on `--accent`/`--border-gold`/`--shadow-gold` so the recolor feels designed, not snapped.

---

## 13. Legal & Security pages

`/privacy`, `/terms` and `/security` use the narrow glass-card layout and are readable, well-formatted, and appropriately restrained. Numbered sections here are *legitimate* (legal documents are ordered) — not a tell. "Last updated: June 9, 2026" is present.

**Issues.**
- 🟢 No in-page table of contents / anchor nav for 5+ section legal docs — add a sticky mini-TOC.
- 🟢 `/security` renders an H1 but no semantic H2s (section titles are styled `div`s), so the heading outline is flat — use real headings for structure and SEO.
- 🟢 Add a version/changelog line for compliance traceability.

---

## 14. Navigation & header

The glass sticky header, ICP-aware dropdown, mobile scroll-lock and focus-trap are all solid. But:

- 🟡 **Wraps at 1024px.** Eight top-level items (Product, Solutions, For You, Pricing, Use Cases, Stories, Blog, About) + "Talk to Pragya" + "Get Started" don't fit the `lg` line: at 1024 the bar becomes **two lines / 89.6px** (over the 80px cap). Switch to the hamburger below ~1100px, or thin the desktop set (e.g. fold Stories/Use Cases/Blog under a "Resources" menu) so it holds one line down to 1024.
- 🟢 Two persistent CTAs ("Talk to Pragya" + "Get Started") plus "Talk to Pragya" repeated in page bodies creates banner-blindness for the chat intent; the header instance is enough.

---

## 15. Footer

Now complete and good: 5 columns (brand + Product + Solutions(all 7 loops) + For You + Company(About/Stories/Use Cases/Blog/Contact)), Twitter/X + LinkedIn, and a trust badge bar (AES-256-GCM, JWT Auth, HITL Governance, Multi-Tenant Isolation). No issues beyond the shared eyebrow/dash tells. The prior report's footer findings are resolved.

---

## 16. Design system, tokens & typography

**Strong foundation.** A real logo-sampled gold ramp, a complete liquid-glass token family (tints, blur, gold edge, sheen), a working light theme, ICP accent overrides, a 4px spacing grid, and a `clamp()` upper type scale. This is a more complete token system than most production sites have.

**Issues.**
- 🟢 **Ramp collapse:** fixing contrast pushed `--fg-subtle` (#a69d94) and `--fg-faint` (#a09790) to near-identical values — the tertiary/faint hierarchy step is now visually meaningless. Re-separate them (keep faint ≥4.5:1 but visibly lighter than subtle) or merge to one token.
- 🟢 **Tiny type in practice:** tokens are fine, but components hardcode 9-11px for tags/captions/metas (blog 9px, several captions 10px). Set a floor (~11-12px) for any text meant to be read.
- 🟢 Three utility classes (`.text-gold`, `.text-metal`, `.gold`) still resolve to the same `color:var(--accent)`; `.text-metal` implies a metallic treatment it doesn't apply. Consolidate.
- 🟢 Logotype face still served as raw TTF; ship WOFF2 for the wordmark (display/body/mono already go through `next/font`).

---

## 17. Motion & scroll architecture

Four bespoke instruments (ScrollFilm, AnatomyFilm, StillLens, Orrery), `prefers-reduced-motion` honored in CSS and via `useReducedMotion`, snappy spring values, no banned `window.addEventListener('scroll')` — the motion engineering is real and largely correct.

**Issues.**
- 🔴 **Reveal-gated visibility.** Pricing, Contact, and other non-cinematic pages keep below-fold content at opacity 0 until `whileInView` fires. The `impeccable` rule is explicit: reveals must *enhance an already-visible default*, because transitions don't fire for crawlers / no-JS / hidden tabs, and the initial paint reads as empty. Make content visible by default and let motion add to it.
- 🔴 **Mobile beat overlap** on the homepage film (§4/§5).
- 🟡 **Cost of length.** ScrollFilm/StillLens pages run 800-1268vh. Each page is a multi-screen scroll commitment; combined with the repeated lens pattern, engagement risks fatigue. Tighten per-beat travel and consider a "skip"/section-jump affordance on the longest pages.
- 🟢 Verify the magnetic-button physics actually run (or drop the wrapper); on capture the CTAs read as standard buttons.

---

## 18. Copy & content

The voice is a genuine asset — confident, specific, India-aware, with strong headlines ("Pay for outcomes. Not salaries.", "Don't rip and replace. Deploy and transform.").

**Issues.**
- 🟡 **Em-dash saturation.** 150+ em/en-dashes site-wide (Solutions 28, About 13, products 9-12, /for 7-12). The `taste-skill` bans the em-dash outright as its #1 tell. Replace with periods, commas, or colons; use hyphens for ranges (₹640-1,200, not ₹640–1,200).
- 🟡 **Numbered eyebrows** ("03 — Your Day", "02 — Our Story", "03 · Operational Fulfillment") — the banned default-marker scaffolding. Drop them; the section's place on the page already categorizes it.
- 🟢 **Poetic eyebrow formula** ("Ideas · in ink", "Proof · in light", "Value · in balance", "Capability · in formation") is clever but mechanical across pages, and leans on the rationed middle-dot. Vary or simplify.
- 🟢 Mild brand-name drift: "HireBuddha" (product) vs "Buddha Cognitive Lab" (company) appear in different chrome (header wordmark vs footer/legal). It's mostly consistent now; keep a one-line usage rule documented.
- 🟢 `proof:Durwankur` missing space (Solutions recap).

---

## 19. Accessibility

Now decent at the structural level: skip link, `lang`, mobile focus-trap + scroll-lock, labeled form inputs with focus rings, ARIA on dropdowns/tabs, reduced-motion support, and AA-passing body text tokens.

**Remaining gaps.**
- 🟡 **Scroll-narrative content for keyboard/SR users.** ScrollFilm/AnatomyFilm/StillLens/Orrery reveal content on scroll; ensure all text is in the DOM in reading order regardless of scroll position (the reveal-gating in §17 directly threatens this) and that tab-panels carry `role="tabpanel"`/`aria-labelledby`.
- 🟡 **Form-field contrast** at rest (§9).
- 🟢 **Tiny text** (9-11px tags/metas) — raise to ≥11-12px.
- 🟢 **Touch targets:** verify the chat suggestion chips and 9px tags meet 44px targets on mobile.
- 🟢 ICP state is communicated by color alone — add a small persistent text/icon badge for color-blind users.

---

## 20. SEO & performance

- 🟡 **Per-page metadata missing.** Only `layout.tsx` exports `metadata`; **24 of 36 pages are client components**, so they inherit one global title/description (Contact sets `document.title` client-side only). Add server wrappers (or split server `page.tsx` + client view) so every route has a unique `<title>` + description + OG card. This is the biggest SEO lever here.
- 🟡 **Reveal-gating + client rendering** means crawlers see thin initial HTML on Pricing/Contact (and others). Tie to §17's fix.
- 🟢 No structured data (JSON-LD) for Organization / Product / FAQ / BreadcrumbList.
- 🟢 Performance: zero failed requests is good, but the WebP frame sequences are heavy; confirm LCP on mobile (the hero specimen) and lazy-load below-fold sequences. Run Lighthouse on mobile for the film pages specifically.

---

## 21. Skill-by-skill compliance

**`impeccable`**
| Rule | Status | Note |
|---|---|---|
| Contrast (body ≥4.5:1) | ✅ | tokens fixed; check text-over-imagery |
| Eyebrow restraint | 🟡 | home now ✅(2/10); Solutions(15)/pricing(9)/for(8-9) over |
| Numbered section markers ban | 🔴 | "03 —"/"02 —" across /for, About, Solutions |
| Identical card grids ban | 🟡 | Stories/Use Cases uniform cards |
| Glass-as-default ban | 🟡 | pervasive, but motivated brand identity |
| Reveal must enhance visible default | 🔴 | Pricing/Contact gate visibility on scroll |
| Side-stripe / gradient-text bans | ✅ | none found |

**`taste-skill`**
| Rule | Status | Note |
|---|---|---|
| Hero fits viewport (desktop) | ✅ | all desktop heroes land |
| Hero value prop visible (mobile) | 🔴 | cinematic mobile heroes show image only |
| Zero em-dashes | 🔴 | 150+ site-wide |
| Nav one line ≤80px desktop | 🟡 | wraps to 89.6px at 1024 |
| Section-layout-repetition (≥4 families/8 sections) | 🟡 | lens pattern dominates site-wide |
| No duplicate CTA intent | 🟡 | "View Loop Blueprint" ×7; "Talk to Pragya" repeated |
| Form contrast | 🟡 | resting input border too faint |
| Real images not placeholders | ✅ | rich WebP specimens/films |

**`bold` / `perspective` / `antigravity` / `scroll-experience`** — ✅ strong: signature visual language, real z-depth and glass, motivated scroll storytelling, reduced-motion respected. The one caution all four share: *less is more* / *graceful mobile degradation* — which is exactly where the site currently underperforms (§4).

---

## 22. Prioritized action list

### 🔴 Fix first (correctness + flagship/mobile + pricing)
| # | Action | Where | Effort |
|---|---|---|---|
| 1 | Stop homepage film beats overlapping on mobile (one beat visible at a time) | ScrollFilm / home | M-L |
| 2 | Mobile cinematic heroes: lead with headline+subhead, shrink specimen, keep Pragya button off the copy | AnatomyFilm/StillLens/Orrery heroes | M |
| 3 | Fix Solutions hydration mismatch (SSR-stable Orrery breakpoint, switch in `useEffect`) | Orrery | S |
| 4 | Fix pricing currency: one currency for prices, repair `$1,00,000/mo`, align with ₹ value framing | pricing | S |
| 5 | Make below-fold content visible by default; reveals enhance, not gate | Pricing/Contact + Reveal/Scroll3DContainer | M |

### 🟡 Next (premium-feel + reach)
| # | Action | Where | Effort |
|---|---|---|---|
| 6 | Break the lens-template monotony: give product/ICP families a second layout type | product, /for, about | L |
| 7 | Purge em-dashes (and en-dash ranges) site-wide | all copy | M |
| 8 | Remove numbered "0X —" eyebrows; thin poetic eyebrows | all | S |
| 9 | Collapse nav to hamburger below ~1100px (or thin items) | Header | S |
| 10 | Strengthen form-field resting affordance | globals.css `.pragya-text-input` | S |
| 11 | Add per-page metadata (server wrappers for client pages) + JSON-LD | all routes | M |
| 12 | Reduce scroll heights (~110-120vh/beat; trim /for length) | film/lens pages | M |
| 13 | Unify product-page specimen art direction (chrome vs gold) | product pages | M |
| 14 | Add a human/team/founder presence to About | about | M |
| 15 | Add transition to `--accent` on ICP switch | tokens/ICP | S |

### 🟢 Polish
| # | Action | Where |
|---|---|---|
| 16 | Re-separate or merge `--fg-subtle`/`--fg-faint` | tokens |
| 17 | Raise incidental type floor to ~11-12px | blog/cards/captions |
| 18 | Diversify Stories/Use-Cases card grid (featured-first/bento) | stories, use-cases |
| 19 | Consolidate `.text-gold`/`.text-metal`/`.gold` | globals |
| 20 | Legal pages: add sticky TOC + real H2s on `/security` | legal |
| 21 | `proof:Durwankur` spacing; vary "Learn more" labels | solutions, home |
| 22 | WOFF2 for the logotype face | fonts |
| 23 | Plain-language section labels ("Social Matrix"→"Social") | contact |

---

## Appendix: measured data

Captured from the live DOM at 1440px (scroll height, eyebrow/dash counts) and via responsive probes.

| Route | scroll height | eyebrow-ish labels | em-dash | en-dash | console err | failed req |
|---|---|---|---|---|---|---|
| / | 1188vh | 2 | 5 | 2 | 0 | 0 |
| /product/ai-employees | 1028vh | 3 | 12 | 0 | 0 | 0 |
| /product/intelligence | 808vh | 5 | 11 | 0 | 0 | 0 |
| /product/tools | 968vh | 4 | 10 | 0 | 0 | 0 |
| /product/security | 858vh | 6 | 9 | 0 | 0 | 0 |
| /solutions | 1131vh | 15 | **28** | 2 | **1 (hydration)** | 0 |
| /pricing | 630vh | 9 | 8 | 10 | 0 | 0 |
| /contact | 492vh | 7 | 1 | 0 | 0 | 0 |
| /about | 1128vh | 5 | 13 | 0 | 0 | 0 |
| /blog | 227vh | 3 | 0 | 0 | 0 | 0 |
| /stories | 264vh | 6 | 2 | 0 | 0 | 0 |
| /use-cases | 252vh | 7 | 0 | 0 | 0 | 0 |
| /security | 556vh | 1 | 0 | 0 | 0 | 0 |
| /for/startups | 1268vh | 9 | 7 | 1 | 0 | 0 |
| /for/growing-companies | 1268vh | 9 | 11 | 5 | 0 | 0 |
| /for/solopreneurs | 1128vh | 8 | 12 | 0 | 0 | 0 |
| /for/enterprise | 1268vh | 9 | 3 | 4 | 0 | 0 |

Nav height: 1024px → **89.6px (two lines)**; 1280/1366/1440 → 73.8px (one line). No horizontal page overflow at any tested width. Eyebrow counts are a heuristic (uppercase + letter-spacing labels) and include loop/section markers, so they over-count slightly; the relative density is what matters.

*Routes captured at desktop + mobile (with scroll-stepped frames on cinematic and scroll-gated pages); screenshots in `scratch/review-shots/`. No code modified.*
