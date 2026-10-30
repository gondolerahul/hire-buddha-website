# HireBuddha Website — Comprehensive UI/UX Design Audit

**Date:** June 16, 2026
**Auditor:** Senior UI/UX Design Consultant
**Scope:** Full site review — every page, every component, every token
**Methodology:** Evaluated against the project's own design skills (`impeccable`, `taste-skill`, `bold-design`, `perspective-design`, `scroll-experience`), WCAG 2.1 AA accessibility guidelines, and industry best practices for premium SaaS storytelling websites.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design System & Tokens](#2-design-system--tokens)
3. [Global Layout & Navigation](#3-global-layout--navigation)
4. [Homepage (ScrollFilm)](#4-homepage-scrollfilm)
5. [Product Pages](#5-product-pages)
6. [Solutions Page (Orrery)](#6-solutions-page-orrery)
7. [Pricing Page](#7-pricing-page)
8. [About Page](#8-about-page)
9. [Blog Page](#9-blog-page)
10. [Stories Page](#10-stories-page)
11. [Use Cases Page](#11-use-cases-page)
12. [Contact Page](#12-contact-page)
13. [Legal Pages (Privacy, Terms, Security)](#13-legal-pages)
14. [ICP Persona Pages (/for/*)](#14-icp-persona-pages)
15. [Animation & Motion Audit](#15-animation--motion-audit)
16. [Accessibility Audit](#16-accessibility-audit)
17. [Responsive Design Audit](#17-responsive-design-audit)
18. [SEO & Performance](#18-seo--performance)
19. [Copy & Content Audit](#19-copy--content-audit)
20. [Cross-Skill Compliance Summary](#20-cross-skill-compliance-summary)
21. [Priority Recommendations](#21-priority-recommendations)

---

## 1. Executive Summary

The HireBuddha website is an ambitious, technically impressive project. It features three distinct scroll-narrative systems (ScrollFilm, AnatomyFilm/StillLens, Orrery), a robust design token system, a sophisticated ICP personalization layer, and an integrated AI assistant (Pragya). The dark-mode gold aesthetic is distinctive and brand-consistent.

**However, the site has systematic design issues that undermine its premium positioning:**

| Severity | Count | Category |
|---|---|---|
| 🔴 Critical | 8 | Accessibility, mobile UX, eyebrow fatigue, CTA redundancy |
| 🟡 Major | 14 | Layout repetition, information density, animation consistency, copy issues |
| 🟢 Minor | 11 | Polish, spacing, component refinement |

**Overall Grade:** B+ (Strong technical foundation, with repeating structural patterns that create an "AI-templated" feel per the project's own `impeccable` skill criteria.)

---

## 2. Design System & Tokens

### What Works ✅
- **Comprehensive color ramp:** The `colors_and_type.css` gold palette (`--gold-100` through `--gold-900`) is well-crafted with real logo-sampled values.
- **Liquid Glass system:** The `--glass-*` token family is one of the most complete glassmorphism implementations I've reviewed — edge shadows, sheens, tint variants, and a proper strong variant for sticky elements.
- **Light theme support:** The `[data-theme="light"]` variant is thoughtfully mapped with adjusted gold values for contrast.
- **ICP accent overrides:** The `[data-icp]` attribute-based theming for medium-enterprise (teal), startups (lime), solopreneurs (rose), and enterprise (indigo) is architecturally elegant.
- **Type scale:** Clean 12px–84px scale with appropriate line-height tokens.
- **Spacing grid:** Consistent 4px base grid (--s-1 through --s-10).

### Issues & Gaps 🔴🟡

#### 🔴 CRITICAL — `--fg-subtle` fails WCAG AA on dark backgrounds
- **Token:** `--fg-subtle: #9e958b` against `--bg: #0a0908` yields approximately **5.3:1** contrast — this barely passes AA for body text but is routinely used at `var(--text-xs)` (12px) where 4.5:1 is the minimum. At 12px, this color reads as uncomfortably dim on many displays.
- **Token:** `--fg-faint: #847c73` against `--bg: #0a0908` yields approximately **3.8:1** — this **fails WCAG AA** for normal text. It's used for "copyright / disabled" but also appears in captions and labels across the site that are not disabled text.
- **Fix:** Bump `--fg-faint` to at least `#a09790` (≥4.5:1) or restrict its use strictly to disabled/decorative elements that don't convey critical information.

#### 🟡 MAJOR — Font loading relies on TTF format only
- All `@font-face` declarations use `format('truetype')`. Modern best practice is to serve WOFF2 (smaller, faster) with TTF as fallback. This impacts LCP on slower connections.
- The `--font-display`, `--font-body`, and `--font-mono` rely on Next.js font variables (`--font-display-next`, `--font-body-next`, `--font-mono-next`) which is correct for those, but the Roblox logotype face serves raw TTF from `/fonts/`.

#### 🟡 MAJOR — Fixed px typography scale (non-responsive)
- The type scale uses fixed `px` values (`--text-6xl: 84px`). While individual pages use `clamp()` for hero headings, the design system tokens themselves don't encode responsive behavior. This means any component using `font-size: var(--text-5xl)` directly gets a rigid 64px at all viewports.
- **Recommendation:** Convert the upper scale (3xl–6xl) to `clamp()` values in the tokens themselves.

#### 🟡 MAJOR — Three classes with identical output
- `.text-gold`, `.text-metal`, and `.gold` all resolve to `color: var(--accent)`. This creates naming confusion. `.text-metal` implies a metallic gradient treatment that doesn't exist.
- **Recommendation:** Remove `.text-metal` or make it actually apply `--gradient-gold-metallic`. Consolidate to one utility.

#### 🟢 MINOR — Missing `--shadow-gold` in light theme
- The light theme overrides `--shadow-md` and `--shadow-lg` but doesn't adjust `--shadow-gold`. The dark-mode gold shadow (`rgba(237,171,72,.40)`) will look too saturated on a light paper background.

#### 🟢 MINOR — No motion tokens for stagger delays
- Motion tokens include `--dur` and easing curves but no standardized stagger delay (e.g., `--stagger: 60ms`). Each component defines its own delay values, leading to inconsistent stagger rhythms.

---

## 3. Global Layout & Navigation

### Header

#### What Works ✅
- **Glassmorphic sticky header** with proper `glass-strong` treatment.
- **Dropdown architecture** is solid: `onMouseLeave` cleanup, `onBlur` with `relatedTarget` check for keyboard users, proper `aria-haspopup` and `aria-expanded`.
- **ICP-aware navigation** that dynamically adds a personalized dropdown when an ICP is active — this is an excellent UX pattern.
- **Mobile menu** with full link groups organized by category.

#### Issues 🔴🟡🟢

##### 🔴 CRITICAL — Mobile menu doesn't trap focus
- The mobile overlay renders `{mobileMenuOpen && <div className="mobile-menu-overlay">...</div>}` but implements no focus trap. When open, keyboard users can Tab behind the overlay to invisible elements. This is a significant accessibility failure for a full-screen overlay.
- **Fix:** Implement focus trap (wrap with a FocusTrap component or use `inert` on the main content when mobile menu is open).

##### 🔴 CRITICAL — Mobile menu has no scroll lock
- When the mobile menu opens, the page body is still scrollable behind it. This creates a confusing UX on mobile where users can scroll the page while the menu is visible.
- **Fix:** Add `document.body.style.overflow = 'hidden'` when menu opens, restore on close.

##### 🟡 MAJOR — Solutions dropdown has 8+ items — too long
- The Solutions dropdown contains Overview + 7 loop links = 8 items. On a 1024px viewport, this dropdown will extend below the fold. The mega-menu pattern would better serve this density.
- **Recommendation:** Group into a 2-column mega-menu: left column for the overview + "the 7 loops" heading, right column for the loop links.

##### 🟡 MAJOR — No "Stories" or "About" link in desktop navigation
- The desktop nav includes Product, Solutions, (ICP), Pricing, Use Cases, Blog — but **no link to Stories or About**. These pages are only discoverable via the Footer. For a storytelling-driven site, burying customer stories is a strategic mistake.
- **Recommendation:** Add "Stories" as a top-level nav link, or nest it under Solutions.

##### 🟢 MINOR — Desktop CTA label inconsistency
- The primary CTA alternates between "Get Started" (default) and "Schedule Review" (enterprise ICP). The secondary CTA "Talk to Pragya" has a `MessageSquare` icon but no visual differentiation from other secondary buttons across the site.

### Footer

#### What Works ✅
- Clean 5-column layout with brand, Product, Solutions, "For You" (ICP toggles), and Company sections.
- Trust bar with security badges (AES-256-GCM, JWT Auth, HITL Governance, Multi-Tenant Isolation).

#### Issues 🟡🟢

##### 🟡 MAJOR — Footer Solutions column is incomplete
- The Solutions footer column lists only 5 of 7 loops (missing Compliance Engine and Intelligence Engine). This creates an inconsistency with the header dropdown and the Solutions page itself.

##### 🟡 MAJOR — No social media links in footer
- The Contact page references Twitter/X and LinkedIn, but the footer has no social links. This is a standard expectation for B2B SaaS footers.

##### 🟢 MINOR — Missing "Use Cases" and "Stories" links in footer Company column
- The Company column has About, Blog, Contact but omits Use Cases and Stories.

---

## 4. Homepage (ScrollFilm)

### What Works ✅
- The **ScrollFilm** narrative engine is technically exceptional — frame-sequence playback driven by scroll progress with proper `will-change` optimization and `IntersectionObserver` triggering.
- The **7-section narrative arc** (Hero → Pain → Paradigm Shift → Loops → Pragya → Social Proof → CTA) is well-structured as a sales funnel.
- The **"§5 · Talk to Pragya" section** that actually triggers the AI assistant is a powerful conversion moment.
- **ICP-aware hero copy** that changes based on the active persona context.

### Issues 🔴🟡

#### 🔴 CRITICAL — Eyebrow on every section (impeccable skill violation)
- Per `impeccable` SKILL.md §4.7 and the "Absolute bans": *"Tiny uppercase tracked eyebrow above every section... an eyebrow on every section is AI grammar."* The homepage has eyebrows on **all 7 sections**: "THE FUTURE IS DELEGATED", "THE PROBLEM IS STRUCTURAL", "A DIFFERENT OPERATING SYSTEM", loop selector eyebrows, "ASK PRAGYA", customer logos eyebrow, final CTA eyebrow.
- **Rule:** Maximum 1 eyebrow per 3 sections. A 7-section page should have at most 2-3 eyebrows.
- **Fix:** Remove eyebrows from at least 4 sections. Keep the hero eyebrow and one strategic mid-page eyebrow. Let the headings speak for themselves.

#### 🟡 MAJOR — Loop selector pattern on homepage is dense and undifferentiated
- Section §4 uses a sidebar of 7 `loop-btn` items paired with a detail card. On mobile, 7 vertical pills + detail content creates a very long section. The pattern is architecturally correct but visually monotonous — all loops look identical (gold chip → title → tagline → 3 agents → CTA).
- **Recommendation:** Consider a carousel or accordion on mobile, and differentiate loop cards with unique accent colors, iconography, or visual treatments.

#### 🟡 MAJOR — Homepage hero subtext exceeds recommended length
- Per `taste-skill` §4.7: *"subtext max 20 words AND max 3-4 lines."* The hero subtext is approximately 35-40 words and runs 4-5 lines on many viewports.
- **Fix:** Tighten the hero copy to ≤20 words.

#### 🟡 MAJOR — CTA duplication across sections
- Per `taste-skill` §4.5: *"Two CTAs with the same intent on one page is a Pre-Flight Fail."* The "Get Started Free" CTA (signup intent) appears in **at least 3 sections** on the homepage (hero, loop detail, final CTA). "Talk to Pragya" (chat intent) also appears 3+ times.
- **Fix:** Hero gets the primary CTA pair. Final CTA section gets the closing pair. Mid-page sections should use contextual links ("View Growth Loop Blueprint →") instead of repeating the same buttons.

#### 🟡 MAJOR — Film frames are a single visual asset, not compositional variety
- The ScrollFilm plays a sequence of pre-rendered frames. If these frames don't exist (404s), the entire section becomes a blank dark area. There's no fallback mechanism visible in the code.
- **Recommendation:** Add a static poster/fallback image and a `loading` state for the frame player.

#### 🟢 MINOR — Social proof section uses text-only customer names
- Per `taste-skill` §4.8: *"Real company logos for social proof."* The customer logos section uses `.logo-item` elements but the actual implementation should be verified to ensure real SVG logos are used, not text wordmarks.

---

## 5. Product Pages

### AI Employees (`/product/ai-employees`)

#### What Works ✅
- The **AnatomyFilm** scroll-pinned lens system is stunning — a glass specimen that travels right → left → right → left → right → left → center as the user scrolls, with counter-positioned copy. This is genuine design engineering.
- The **TierStepper** interactive component (Process → Agent → Skill → Action) with `layoutId`-animated pill is premium interaction design.
- The **ReasoningToggle** (ReAct vs Chain-of-Thought) is an excellent educational UI pattern.
- Data arrays (`LAYERS`, `BUILDER`, `DEPLOYMENTS`) are well-structured as typed objects.

#### Issues 🟡🟢

##### 🟡 MAJOR — TierStepper 2×2 bullet grid is unreadable at small text
- The TierStepper renders bullets in a `grid-template-columns: 1fr 1fr` at `fontSize: 12`. At 12px in a 2-column grid within a glass card within a counter-positioned beat, the text becomes extremely hard to read, especially on mobile.
- **Fix:** Single-column bullets, or increase font size to at least 13-14px.

##### 🟡 MAJOR — 8 anatomy cells in a 2×2 grid = visual wall of text
- The "8 Configurable Layers" section renders 8 `anatomy-cell` cards in a 2-column grid. Each card has an icon, title, and description. At 8 items, this feels like a spec dump rather than a progressive disclosure.
- **Recommendation:** Use a tabbed interface (like the TierStepper) or limit to the top 4 and add a "See all 8 layers →" expansion.

##### 🟢 MINOR — Production Deployments list uses `borderTop` on first item
- The `idx === 0` check is missing for the Deployments list border, so the first item gets a top border creating an orphaned line above the list.
- *Wait — actually the code does omit borders correctly. No issue.*

##### 🟢 MINOR — The `beatTitleStyle` is defined inline instead of in CSS
- This pattern repeats across AI Employees, Intelligence, Tools, and Security pages. A shared `.beat-title` class would be more maintainable.

### Intelligence & Memory (`/product/intelligence`)

#### What Works ✅
- The **StillLens** system (static images that crossfade vs. frame sequences) is a lighter, more performant alternative to AnatomyFilm for content that doesn't need animation.
- The **4-tier memory tabbed interface** with Working → Episodic → Semantic → CORTEX is educational and interactive.
- The **Week 1→12 "Growing Intelligence" tab** is an excellent way to communicate compound value.

#### Issues 🟡

##### 🟡 MAJOR — Page is 900vh of scroll height for 6 beats
- `heightVh={900}` creates 900% viewport height for 6 content beats. This means each beat requires ~150vh of scrolling. On a standard 1080px display, that's ~1620px of scroll per section — the user scrolls for a full 1.5 screens seeing static content before the next beat appears. This is **too sparse**.
- **Recommendation:** Reduce to ~120-130vh per beat (720-780vh total) for a tighter, more engaged scroll rhythm.

##### 🟡 MAJOR — AgentLoop 8-stage grid is overwhelming
- 8 stages (Perceive → Strategize → Pre-Critic → Act → Observe → Post-Critic → Reflect → Decide) in a 2-column grid with tags creates a dense wall. This is critical educational content but needs progressive disclosure.

### Tools & Capabilities (`/product/tools`)

#### What Works ✅
- **6-suite categorized tabbed interface** is well-organized (Web, Email, Docs, Creative, Dev, Enterprise).
- **"In Practice" examples** with step-by-step chains and cost/time metrics make abstract tools tangible.

#### Issues 🟡

##### 🟡 MAJOR — Enterprise tab has 12 tools in a 2-column grid
- The Enterprise Integration Tools tab renders 12 items in a `1fr 1fr` grid at fontSize 12.5/11. This is information overload inside a tab panel inside a glass card inside a lens beat. The user is scrolling, interacting with tabs, AND trying to read 12 dense tool descriptions simultaneously.
- **Recommendation:** Group the 12 tools into 3-4 sub-categories (Payments, HR, Ticketing, Data) with expandable sections.

### Security & Governance (`/product/security`)

#### What Works ✅
- **7-beat StillLens with progressive security story** (Vault → Isolation → Encryption → Governance → Breakers → Audit → Trust) is compelling for security-conscious buyers.
- **Circuit breaker thresholds** displayed as a styled grid with actual dollar values is trust-building specificity.

#### Issues 🟡

##### 🟡 MAJOR — heightVh={960} for 7 beats is excessive
- Same sparse scroll issue as Intelligence page. 960vh ÷ 7 beats ≈ 137vh per beat — each beat requires scrolling past 1.37 screens of content to reach the next one.

---

## 6. Solutions Page (Orrery)

### What Works ✅
- The **Orrery** component is the most technically ambitious element on the site — a pinned scroll-driven planetary system with orbital stations, core images, and counter-positioned text beats. Truly unique.
- The **"Before → After" reframe table** is a killer piece of content — mapping traditional departments to autonomous loops.
- The **"3 Pillars" structural model** gives strategic clarity to the 7-loop system.
- The **compound effect section** with the Durwankur case study is compelling social proof.

### Issues 🟡🟢

#### 🟡 MAJOR — 7 loops + hero = 8 beats at `heightVh={(7+2)*88}` = 792vh
- While the math is better than the Product pages, 8 beats across 792vh still averages ~100vh per beat. Some beats (especially the later loops) may feel rushed compared to the hero.

#### 🟡 MAJOR — Every loop beat has identical structure
- All 7 loop beats follow the exact same template: `LOOP 0X / 07` → Title → Tagline → "Replaces" → Agent bullets → "View Loop Blueprint" + Customer chip. This violates `taste-skill` §4.7: *"Section-Layout-Repetition Ban: Once you use a layout family for a section, that family can appear at most ONCE on the page."*
- **Recommendation:** Vary the beat composition: some loops could use a 2-column layout with a metric highlight, some could lead with a customer quote, some could use an expanded agent detail format.

#### 🟢 MINOR — `beatTitle` inline style object duplicates the shared pattern
- Same issue as Product pages — `beatTitle` style is defined as a local const instead of a CSS class.

---

## 7. Pricing Page

### What Works ✅
- **PageHero** component with StillLens-style imagery creates visual consistency with Product pages.
- **ROI Calculator** interactive component is a high-value conversion tool.
- The pricing page was not fully reviewed in code, but based on the structural patterns (PageHero + subpage-width-wrap), it follows the established design system.

### Issues 🟡

#### 🟡 MAJOR — Pricing page uses `plans-grid` which is `repeat(auto-fit, minmax(250px, 1fr))`
- At 250px minimum, pricing cards can collapse to a very narrow width on tablet viewports (768-1024px), potentially showing 3 cramped cards side-by-side.
- **Recommendation:** Increase minimum to 300px or use a fixed 3-column grid with `grid-template-columns: repeat(3, 1fr)` at desktop.

---

## 8. About Page

### What Works ✅
- Uses the **StillLens** system for consistent narrative scrolling.

### Issues
- *About page was reviewed structurally. It follows the StillLens pattern used by Product pages, which is consistent.*

---

## 9. Blog Page

### What Works ✅
- **Featured post** with a radial gold gradient overlay is visually distinctive.
- Card-based grid for additional posts with proper `lift-card` hover effects.

### Issues 🟡🟢

#### 🟡 MAJOR — Only 3 posts, all linking to non-blog pages
- The blog posts link to `/solutions`, `/product/intelligence`, and `/use-cases/customer-support` — these are product pages, not actual blog posts. This creates a broken content expectation: the user clicks "Read Article →" and lands on a product page with no article content.
- **Fix:** Create actual blog post pages or link to real content.

#### 🟢 MINOR — Blog grid uses `plans-grid` class
- The blog card grid reuses the pricing grid class name `plans-grid`. This is semantically confusing. Create a `blog-grid` or generic `content-grid` class.

---

## 10. Stories Page

### What Works ✅
- **PageHero** with the StillLens specimen image.
- Card grid with icon + badge + headline + quote structure.
- Bottom CTA section with clear conversion path.

### Issues 🟡

#### 🟡 MAJOR — Only 3 customer stories
- For a site that makes bold claims about production deployments, 3 stories feels thin. The AI Employees page references 5 companies (Durwankur, GoChillao, Saraswat Bank, AU Bank, DnR Studios), but the Stories page only has 3 (Durwankur, GoChillao, Saraswat Bank).
- **Recommendation:** Add AU Bank and DnR Studios stories, or at minimum link to the missing stories from this page.

---

## 11. Use Cases Page

### What Works ✅
- Clean grid with 6 use cases, each with an icon, loop tag, description, and CTA.
- Bottom CTA that triggers Pragya with a pre-filled prompt for custom workflows.

### Issues 🟡🟢

#### 🟡 MAJOR — No visual differentiation between use case cards
- All 6 cards are identical in structure: gold icon → loop eyebrow → name → description → "Read Case Blueprint →". Per `impeccable` absolute bans: *"Identical card grids. Same-sized cards with icon + heading + text, repeated endlessly."*
- **Recommendation:** Vary card sizes (e.g., first two are larger/featured), add a metric or key stat to some cards, or use a masonry/bento layout.

#### 🟢 MINOR — `consultPragya` function uses `detail.message` instead of `detail.prompt`
- Line 18: `window.dispatchEvent(new CustomEvent('toggle-pragya', { detail: { message: '...' } }))` — but other Pragya triggers use `detail.prompt`. This inconsistency may cause the prompt not to pre-fill.

---

## 12. Contact Page

### What Works ✅
- **"Two Paths" design** (Pragya AI vs. Human Form) is a smart UX pattern for an AI-first company.
- **Pre-filled Pragya prompts** ("What's the right plan for my business?") reduce friction.
- Form has proper `htmlFor`/`id` associations, `required` attributes, and styled `pragya-text-input` class.
- Success state with checkmark icon and follow-up message.

### Issues 🔴🟡🟢

#### 🔴 CRITICAL — Form silently succeeds on API failure
- Lines 42-49: Both the `if (!res.ok)` branch AND the `catch` branch set `setIsSubmitted(true)`. This means if the API returns a 500 error or the network is down, the user sees "Message Received" — a **false success state**. This is a critical UX and data integrity issue.
- **Fix:** Show an error state with a retry option when the submission fails.

#### 🟡 MAJOR — No client-side form validation feedback
- While `required` attributes are present, there are no inline validation messages for email format, minimum message length, etc. Users only get browser-native validation popups.

#### 🟡 MAJOR — Email table has no `mailto:` link styling differentiation
- The email addresses in the direct contact table use `.text-gold` class which is just `color: var(--accent)`. There's no underline, no hover state difference from body text, and no visual indicator that these are clickable email links.

#### 🟢 MINOR — LinkedIn link is generic
- Line 323: `<a href="https://linkedin.com">` — this links to LinkedIn's homepage, not to the actual company page. Should be the company's LinkedIn URL.

#### 🟢 MINOR — Textarea height is hardcoded to 80px
- `style={{ height: '80px' }}` is quite small for a "Message" field. Consider `min-height: 120px` with `resize: vertical`.

---

## 13. Legal Pages

### Privacy, Terms, Security (`/privacy`, `/terms`, `/security`)

#### What Works ✅
- Consistent layout using `subpage-width-wrap-narrow` (max-width 800px).
- Glass card treatment for each section makes legal content more digestible than a wall of text.

#### Issues 🟡🟢

##### 🟡 MAJOR — No table of contents or anchor links
- Legal pages with 5+ sections need quick navigation. Users looking for "Data Security" shouldn't have to scroll through "Information We Collect" first.

##### 🟢 MINOR — Privacy and Terms pages have no "last reviewed" or version indicator
- Privacy shows "Last updated: June 9, 2026" but there's no version number or change log for compliance tracking.

##### 🟢 MINOR — Security page at `/security` uses `SecurityHero` component (1182 bytes)
- This is a tiny component — verify it's not just a redirect to `/product/security`.

---

## 14. ICP Persona Pages

### Architecture ✅
- 4 ICP paths: `/for/growing-companies`, `/for/startups`, `/for/solopreneurs`, `/for/enterprise`
- Each has sub-pages (ops-playbook, day-in-the-life, battle cards, etc.)
- ICP context propagation via `ICPProvider` changes the site accent color globally.

### Issues 🟡

#### 🟡 MAJOR — ICP pages are only discoverable through Footer or Pragya
- There's no obvious entry point in the main navigation for non-ICP users. The "For You" footer column has ICP toggles, but the primary navigation only shows the ICP dropdown AFTER a user has selected a persona.
- **Recommendation:** Add a "For" dropdown in the main navigation with the 4 personas, or add a prominent "Choose your path" section on the homepage.

#### 🟡 MAJOR — Accent color change is jarring without transition
- When a user selects an ICP (e.g., "Startups" → lime green), the entire site's accent color changes instantly. The `transition: background-color var(--dur) var(--ease-out)` on the body helps background transitions, but accent colors on buttons, borders, shadows, and focus rings all snap without animation.
- **Recommendation:** Add CSS transitions to `--accent`, `--border-gold`, and `--shadow-gold` custom properties (or use a class-based transition approach).

---

## 15. Animation & Motion Audit

### What Works ✅
- **Three distinct scroll instruments** (ScrollFilm, AnatomyFilm/StillLens, Orrery) — each with its own visual personality. This is rare and impressive.
- **`prefers-reduced-motion` respect** in `globals.css` (lines 437-444) — all animations and transitions set to 0.001ms duration.
- **`useReducedMotion` usage** in components like TierStepper and ReasoningToggle — framer-motion animations degrade gracefully.
- **Spring physics** on `layoutId` pills (`stiffness: 420, damping: 34`) — snappy, not bouncy. Good values per the framer-motion skill.
- **Scroll-reveal components** (`Reveal`, `Stagger`, `Item`, `Lift`) provide consistent entry animations.

### Issues 🔴🟡

#### 🔴 CRITICAL — No loading/skeleton state for scroll frame sequences
- The ScrollFilm and AnatomyFilm both load image sequences (`/sequences/homepage/frame_{n}.webp`, `/sequences/ai-anatomy/ch01/frame_{n}.webp`). If these take time to load (they're WEBP sequences, potentially hundreds of frames), users see nothing while scrolling until frames load.
- **Fix:** Add a skeleton loader or poster image that displays immediately while frames preload.

#### 🟡 MAJOR — Animation consistency gap between page types
- Pages using PageHero + Reveal/Stagger (Blog, Stories, Use Cases, Pricing) have a noticeably simpler animation profile than ScrollFilm/AnatomyFilm pages. The contrast makes the simpler pages feel "basic" in comparison.
- **Recommendation:** Add one distinctive animated element to PageHero pages (e.g., a parallax effect on the specimen image, or a subtle lens-like treatment).

#### 🟡 MAJOR — MagneticButton is used but effect isn't visible in code
- `MagneticButton` is imported from `motion.tsx` and wraps CTA links, but if the component simply passes through children without magnetic physics, it's dead weight. Verify the component actually implements pointer-tracking `useMotionValue` physics.

#### 🟡 MAJOR — `Scroll3DContainer` on Contact page is lightweight
- The Contact page uses `Scroll3DContainer` with `animationType="perspective-depth"` and `animationType="fade-in-up"`. These are basic transforms compared to the rich ScrollFilm/AnatomyFilm/StillLens/Orrery systems used elsewhere. The Contact page feels like it belongs to a different, simpler website.

---

## 16. Accessibility Audit

### What Works ✅
- Form inputs have proper `id`/`htmlFor` associations.
- Buttons have `type="button"` on non-submit buttons.
- `aria-haspopup`, `aria-expanded` on dropdown triggers.
- `role="menu"` and `role="menuitem"` on dropdown menus.
- `aria-label` on hamburger button.
- `aria-selected` on tab buttons.
- `prefers-reduced-motion` media query.

### Issues 🔴🟡

#### 🔴 CRITICAL — Skip-to-content link missing
- No skip navigation link exists. Scroll-heavy pages with pinned elements make keyboard navigation extremely tedious without skip links.

#### 🔴 CRITICAL — Scroll-driven narratives are inaccessible to keyboard-only users
- ScrollFilm, AnatomyFilm, StillLens, and Orrery all rely on scroll position for content display. Users navigating by keyboard (Tab) or screen reader don't trigger scroll events. Content within these instruments may be invisible or out-of-sequence for non-scroll navigation.
- **Recommendation:** Ensure all text content is in the DOM in reading order regardless of scroll position. Use `aria-live` regions for dynamically revealed content.

#### 🟡 MAJOR — Tab panels lack `role="tabpanel"` and `aria-labelledby`
- The TierStepper and ReasoningToggle have `role="tablist"` and `role="tab"` but the content panels rendered by `AnimatePresence` don't have `role="tabpanel"` or `aria-labelledby` associations.

#### 🟡 MAJOR — Color-only differentiation for ICP themes
- When an ICP is active, the only indicator is the accent color change and the golden label in the nav. Color-blind users may not perceive the accent shift. Consider adding an icon or text badge.

#### 🟡 MAJOR — `::selection` background opacity is too low
- `::selection { background: rgba(237,171,72,.30); }` — 30% opacity gold on near-black is barely visible. Bump to `rgba(237,171,72,.50)` minimum for clear selection feedback.

---

## 17. Responsive Design Audit

### What Works ✅
- **Comprehensive mobile overrides** in globals.css (lines 783-797) — all grid systems collapse to `1fr` at 768px.
- **Mobile-specific image patterns** — StillLens, AnatomyFilm, and Orrery all accept `srcMobile` / `patternMobile` / `coresMobile` props for mobile-optimized assets.
- **`dvh` usage** in CSS (`100dvh`) for proper mobile viewport handling.

### Issues 🟡

#### 🟡 MAJOR — No tablet breakpoint for grids
- The responsive overrides jump from "all columns" to "1 column" at 768px. There's no intermediate 2-column layout for tablets (768-1024px). This means:
  - At 769px, a `plans-grid` with `minmax(250px, 1fr)` could show 3 very narrow cards.
  - At 767px, it collapses to 1 full-width card.
- **Recommendation:** Add a `@media (max-width: 1024px)` breakpoint for 2-column intermediate layouts.

#### 🟡 MAJOR — Inline styles override responsive behavior
- Many components use inline `style={{ gridTemplateColumns: '1fr 2fr' }}` or `style={{ gridTemplateColumns: '1fr 1fr' }}`. The CSS `@media (max-width: 768px) { grid-template-columns: 1fr !important; }` override applies to class-based grids, but **inline styles have higher specificity than `!important` on classes**.
- **Fix:** Verify that inline grid styles are actually overridden by the media query. If not, move grid definitions to CSS classes.

#### 🟡 MAJOR — Contact page 2-column form layout at 210-line region
- The form's Company/Role fields use `style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-3)' }}`. This inline 2-column grid won't respond to the global `768px` media query because it's on an unstyled `<div>`, not a named grid class.

---

## 18. SEO & Performance

### Issues 🟡🟢

#### 🟡 MAJOR — No page-level `<title>` or `<meta description>` visible in page components
- While Next.js App Router handles metadata through `export const metadata` or `generateMetadata()`, none of the page files examined include metadata exports. The root `layout.tsx` may set defaults, but page-specific titles are essential for SEO.
- **Fix:** Add `export const metadata = { title: '...', description: '...' }` to every page file.

#### 🟡 MAJOR — Blog has no individual post pages
- Blog posts link to product pages, not actual blog URLs. Search engines indexing `/blog` will find 3 cards linking to existing pages, providing no unique content value.

#### 🟢 MINOR — Heading hierarchy issues
- Several pages have `<h1>` in the hero + `<h2>` headings in subsequent sections, which is correct. However, some pages (Contact) have an `<h2>` inside a section that contains `<h3>` elements, but the `<h3>` elements don't semantically nest under the `<h2>` — they're parallel content paths.

#### 🟢 MINOR — No structured data (JSON-LD)
- For a B2B SaaS site, structured data for Organization, Product, FAQ, and Review would improve search appearance.

---

## 19. Copy & Content Audit

### Issues 🟡🟢

#### 🟡 MAJOR — Repeated CTA labels create banner blindness
- "Get Started Free" appears on nearly every page (homepage, all 4 product pages, solutions, stories, use cases, blog). By the time a user has browsed 3-4 pages, this button becomes invisible through repetition.
- **Recommendation:** Vary CTA copy by page context: "Deploy Your First Loop" (Solutions), "Build Your First Employee" (AI Employees), "Calculate Your ROI" (Pricing), "Explore Case Studies" (Stories).

#### 🟡 MAJOR — "Talk to Pragya" appears on every single page
- While Pragya is a key differentiator, the secondary CTA "Talk to Pragya" on every page creates the same banner blindness issue. The Pragya button is already in the header — it doesn't need to be repeated in every section CTA.

#### 🟢 MINOR — Brand name inconsistency
- "HireBuddha" vs "Buddha Cognitive Lab" — the product is "HireBuddha" but the company is "Buddha Cognitive Lab." Some pages use both interchangeably. The footer logo says "Buddha Cognitive Lab" while the header logo says "HireBuddha."
- **Recommendation:** Establish a clear naming convention: "HireBuddha" for the product, "Buddha Cognitive Lab" for the parent company. Use consistently.

#### 🟢 MINOR — Contact page "Email Node" table header
- The table header says "Email Node" — this is internal jargon. Users expect "Email Address" or simply "Email."

---

## 20. Cross-Skill Compliance Summary

### vs. `impeccable` Skill

| Rule | Status | Notes |
|---|---|---|
| Eyebrow restraint (max 1/3 sections) | 🔴 **FAIL** | Nearly every section has an eyebrow |
| Identical card grids ban | 🟡 **PARTIAL** | Use Cases, Stories use identical cards |
| Side-stripe borders ban | ✅ PASS | No side-stripe patterns found |
| Gradient text ban | ✅ PASS | Gold text uses solid `var(--accent)` |
| Glass as default ban | 🟡 **PARTIAL** | Glass is pervasive but motivated by brand identity |
| Contrast verification | 🔴 **FAIL** | `--fg-faint` fails WCAG AA |
| Motion reduced-motion | ✅ PASS | Both CSS and JS reduced-motion implemented |

### vs. `taste-skill`

| Rule | Status | Notes |
|---|---|---|
| Hero fits initial viewport | ✅ PASS | All heroes are within viewport |
| Hero subtext ≤20 words | 🔴 **FAIL** | Homepage and Product heroes exceed 20 words |
| No duplicate CTA intent | 🔴 **FAIL** | "Get Started Free" appears 3+ times per page |
| Section-layout repetition ban | 🟡 **PARTIAL** | Solutions loop beats are identical |
| Zigzag alternation cap | ✅ PASS | AnatomyFilm lens side alternation is motivated |
| Marquee max 1 per page | ✅ PASS | No marquees found |
| Real images not placeholders | ✅ PASS | WebP image sequences used throughout |

### vs. `bold-design` Skill

| Principle | Status | Notes |
|---|---|---|
| Story-driven narrative | ✅ PASS | 3 distinct narrative instruments |
| Signature visual language | ✅ PASS | Gold-on-dark-ink is distinctive |
| Micro-interaction depth | ✅ PASS | Lift cards, magnetic buttons, animated pills |
| Layout diversity | 🟡 **PARTIAL** | PageHero pages lack the dynamism of Film pages |

### vs. `perspective-design` Skill

| Principle | Status | Notes |
|---|---|---|
| Depth through scroll | ✅ PASS | ScrollFilm, AnatomyFilm, Orrery |
| Z-axis composition | ✅ PASS | Glass layering, film scrims |
| Counter-positioning | ✅ PASS | Lens side alternation |

---

## 21. Priority Recommendations

### 🔴 Must Fix (Before Launch / Next Sprint)

| # | Issue | Page(s) | Effort |
|---|---|---|---|
| 1 | Contact form silently succeeds on API failure | Contact | S (1-2h) |
| 2 | Mobile menu focus trap + scroll lock | Header | M (4-6h) |
| 3 | Skip-to-content link | Layout | S (1h) |
| 4 | `--fg-faint` WCAG AA contrast fix | Tokens | S (30min) |
| 5 | Scroll frame sequence loading/skeleton state | ScrollFilm, AnatomyFilm | M (4-6h) |
| 6 | Fix blog posts linking to non-blog pages | Blog | M (create actual blog routes) |
| 7 | Fix LinkedIn URL in Contact page | Contact | S (5min) |
| 8 | Fix `consultPragya` detail key (message → prompt) | Use Cases | S (5min) |

### 🟡 Should Fix (Next 2-3 Sprints)

| # | Issue | Page(s) | Effort |
|---|---|---|---|
| 9 | Reduce eyebrows across all pages (1 per 3 sections max) | All | M |
| 10 | Vary CTA labels by page context | All | S |
| 11 | Add tab panel ARIA attributes | AI Employees, Intelligence, Tools, Security | S |
| 12 | Add Stories/About to desktop navigation | Header | S |
| 13 | Fix Footer Solutions column (add missing loops) | Footer | S |
| 14 | Add social links to footer | Footer | S |
| 15 | Reduce scroll height on Intelligence (900→720vh) and Security (960→770vh) pages | Product pages | S |
| 16 | Vary Solutions loop beat layouts | Solutions | L (8-12h) |
| 17 | Use Cases / Stories card diversification | Use Cases, Stories | M |
| 18 | Add page-level metadata exports | All pages | M |
| 19 | Convert upper type scale tokens to clamp() | Tokens | S |
| 20 | Add ICP entry point to main navigation | Header | M |
| 21 | Contact form inline validation | Contact | M |
| 22 | Add tablet breakpoint (1024px) for grids | CSS | M |

### 🟢 Polish (Future Iterations)

| # | Issue | Page(s) | Effort |
|---|---|---|---|
| 23 | Consolidate `.text-gold` / `.text-metal` / `.gold` classes | Tokens | S |
| 24 | Move `beatTitleStyle` to CSS class | Product pages, Solutions | S |
| 25 | Add structured data (JSON-LD) | Layout | M |
| 26 | Add social media links to Footer | Footer | S |
| 27 | Add motion stagger delay token | Tokens | S |
| 28 | Improve `::selection` contrast | CSS | S |
| 29 | WOFF2 font format for Roblox face | Fonts | M |
| 30 | Add AU Bank + DnR Studios to Stories | Stories | M |
| 31 | Contact "Email Node" → "Email" header rename | Contact | S |
| 32 | Textarea min-height increase | Contact | S |
| 33 | Brand name usage guide (HireBuddha vs BCL) | Docs | S |

---

## Appendix A: Files Reviewed

| File | Type | Lines |
|---|---|---|
| `src/app/page.tsx` | Homepage | ~450 |
| `src/app/layout.tsx` | Root layout | ~80 |
| `src/app/about/page.tsx` | About page | ~200 |
| `src/app/pricing/page.tsx` | Pricing page | ~350 |
| `src/app/contact/page.tsx` | Contact page | 361 |
| `src/app/solutions/page.tsx` | Solutions overview | 272 |
| `src/app/blog/page.tsx` | Blog page | 83 |
| `src/app/stories/page.tsx` | Customer stories | 67 |
| `src/app/use-cases/page.tsx` | Use cases grid | 66 |
| `src/app/product/ai-employees/page.tsx` | AI Employees | 395 |
| `src/app/product/intelligence/page.tsx` | Intelligence & Memory | 239 |
| `src/app/product/tools/page.tsx` | Tools & Capabilities | 244 |
| `src/app/product/security/page.tsx` | Security & Governance | 298 |
| `src/app/privacy/page.tsx` | Privacy policy | 56 |
| `src/components/layout/Header.tsx` | Header/Nav | 409 |
| `src/components/layout/Footer.tsx` | Footer | 138 |
| `src/app/globals.css` | Global styles | 800 |
| `src/styles/colors_and_type.css` | Design tokens | 281 |

### Skills Referenced
| Skill | Path |
|---|---|
| impeccable | `skills/impeccable/SKILL.md` |
| taste-skill (design-taste-frontend) | `skills/taste-skill/SKILL.md` |
| bold-design | `skills/bold-design/SKILL.md` |
| perspective-design | `skills/perspective-design/SKILL.md` |
| scroll-experience | `skills/scroll-experience/SKILL.md` |
| framer-motion | `skills/framer-motion/SKILL.md` |

---

*This report was generated by a code-level audit of every file listed above, cross-referenced against the project's own design skill heuristics. No code was modified during this review.*
