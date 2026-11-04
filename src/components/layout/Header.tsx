'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Menu, X, ArrowRight, User, Rocket, Building2, Landmark, MessageSquare } from 'lucide-react';
import { NAV, PRODUCTS, ARCS, ICP_NAV } from '@/lib/site';
import { talkToPragya } from '@/lib/pragya';
import { SIGNUP_URL, SIGNIN_URL } from '@/config/company';
import { Magnetic } from '@/components/motion/primitives';
import s from './Header.module.css';

const ICP_ICONS = [User, Rocket, Building2, Landmark];

// Desktop menus follow the disclosure pattern: a button toggles its panel,
// which sits right after it in the DOM, so Tab moves from the button into its
// links. Hover still opens them for mouse users. The mobile sheet is a modal
// dialog with its own focus trap.
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change (adjusting state during render, not in an
  // effect), and lock body scroll for the mobile sheet.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(null); setMobile(false); }
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const closeMobile = useCallback(() => { setMobile(false); burgerRef.current?.focus(); }, []);

  // Escape closes the open menu and returns focus to its button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (mobile) { closeMobile(); return; }
      if (open) {
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${CSS.escape(open)}"]`)?.focus();
        setOpen(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, mobile, closeMobile]);

  // Mobile sheet: focus its close button on open and keep Tab inside it.
  useEffect(() => {
    if (!mobile) return;
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobile]);

  // A menu closes when focus moves outside both its button and its panel.
  const onGroupBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
  };

  const panelId = (label: string) => `menu-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;

  return (
    <header className={s.header} data-scrolled={scrolled} onMouseLeave={() => setOpen(null)}>
      <motion.div className={s.progress} style={{ scaleX }} aria-hidden />
      <div className={`u-container--wide u-container ${s.bar}`}>
        <Magnetic strength={0.25}>
          <Link href="/" className={s.logo} aria-label="HireBuddha home">
            <Image src="/images/logo-mark-gold.svg" alt="" width={14} height={34} className={s.logoMark} priority />
            <span className={s.logoText}>Hire<b>Buddha</b></span>
          </Link>
        </Magnetic>

        <nav className={s.nav} aria-label="Primary" ref={navRef}>
          {NAV.map((g) => (
            g.href ? (
              <Link key={g.label} href={g.href} className={s.navItem} data-cursor onMouseEnter={() => setOpen(null)}>
                {g.label}
              </Link>
            ) : (
              <div key={g.label} className={s.group} onBlur={onGroupBlur} onMouseEnter={() => setOpen(g.label)}>
                <button
                  type="button"
                  className={s.navItem}
                  data-menu={g.label}
                  data-open={open === g.label}
                  aria-expanded={open === g.label}
                  aria-controls={panelId(g.label)}
                  onClick={() => setOpen(open === g.label ? null : g.label)}
                >
                  {g.label} <ChevronDown size={15} strokeWidth={2} aria-hidden />
                </button>
                {/* Positioned against the header, so every panel opens in the same place. */}
                <div className={s.panelWrap}>
                  <AnimatePresence>
                    {open === g.label && (
                      <motion.div
                        id={panelId(g.label)}
                        className={`${s.panel} ${g.kind === 'icp' ? s.panelWide : ''}`}
                        initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {g.kind === 'product' && <ProductPanel />}
                        {g.kind === 'icp' && <ICPPanel />}
                        {g.kind === 'solutions' && <SolutionsPanel />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          ))}
        </nav>

        <div className={s.actions}>
          <div className={s.desktopActions}>
            <a href={SIGNIN_URL} className={s.signIn}>Sign in</a>
            <button type="button" className={`btn btn-ghost ${s.pragyaBtn}`} onClick={() => talkToPragya()}>Talk to Pragya</button>
            <Magnetic strength={0.3}>
              <a href={SIGNUP_URL} className="btn btn-gold" data-cursor>Start Free <ArrowUpRight size={16} /></a>
            </Magnetic>
          </div>
          <button
            ref={burgerRef}
            type="button"
            className={s.burger}
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div className={s.mobile} id="mobile-menu" ref={sheetRef}
            role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <button type="button" className={s.mClose} onClick={closeMobile} aria-label="Close menu" data-autofocus><X size={20} aria-hidden /></button>
            <nav className={s.mobileInner} aria-label="Mobile">
              <Link href="/" className={s.mLink}>Home <ArrowUpRight size={20} aria-hidden /></Link>
              <div>
                <div className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Product</div>
                <div className={s.mSub}>
                  {PRODUCTS.map((p) => <Link key={p.slug} href={p.slug} className={s.mChip}>{p.title}</Link>)}
                  <Link href="/pragya" className={s.mChip}>Meet Pragya</Link>
                </div>
              </div>
              <div>
                <Link href="/solutions" className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Solutions <ArrowUpRight size={20} aria-hidden /></Link>
                <div className={s.mSub}>{ARCS.map((a) => <Link key={a.slug} href={`/solutions/${a.slug}`} className={s.mChip}>{a.name}</Link>)}</div>
              </div>
              <div>
                <div className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Who it’s for</div>
                {ICP_NAV.map((icp) => (
                  <Fragment key={icp.href}>
                    <Link href={icp.href} className={s.mIcp}>{icp.label}</Link>
                    <div className={s.mSub} style={{ paddingTop: 4 }}>
                      {icp.subs.map((sub) => <Link key={sub.href} href={sub.href} className={s.mChip}>{sub.label}</Link>)}
                    </div>
                  </Fragment>
                ))}
              </div>
              <Link href="/pricing" className={s.mLink}>Pricing <ArrowUpRight size={20} aria-hidden /></Link>
              <Link href="/use-cases" className={s.mLink}>Use Cases <ArrowUpRight size={20} aria-hidden /></Link>
              <Link href="/stories" className={s.mLink}>Stories <ArrowUpRight size={20} aria-hidden /></Link>
              <Link href="/blog" className={s.mLink}>Blog <ArrowUpRight size={20} aria-hidden /></Link>
            </nav>
            <div className={s.mActions}>
              <a href={SIGNUP_URL} className="btn btn-gold btn-lg">Start Free <ArrowUpRight size={16} aria-hidden /></a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => { setMobile(false); talkToPragya(); }}>Talk to Pragya</button>
              <a href={SIGNIN_URL} className="btn btn-ghost btn-lg">Sign in</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProductPanel() {
  return (
    <div className={s.panelGrid}>
      {PRODUCTS.map((p) => (
        <Link key={p.slug} href={p.slug} className={s.panelCard} data-cursor>
          <span className={s.panelIcon}><p.icon size={20} strokeWidth={1.6} aria-hidden /></span>
          <span>
            <span className={s.panelCardTitle}>{p.title}</span>
            <span className={s.panelCardBlurb}>{p.blurb}</span>
          </span>
        </Link>
      ))}
      <Link href="/pragya" className={s.panelCard} data-cursor>
        <span className={s.panelIcon}><MessageSquare size={20} strokeWidth={1.6} aria-hidden /></span>
        <span>
          <span className={s.panelCardTitle}>Meet Pragya</span>
          <span className={s.panelCardBlurb}>Your AI account manager, and the Meta Agent behind her.</span>
        </span>
      </Link>
    </div>
  );
}

function ICPPanel() {
  return (
    <div className={s.icpGrid}>
      {ICP_NAV.map((icp, idx) => {
        const Icon = ICP_ICONS[idx] ?? User;
        return (
          <div key={icp.href} className={s.icpCol}>
            <Link href={icp.href} className={s.icpHead} data-cursor>
              <span className={s.panelIcon}><Icon size={18} strokeWidth={1.6} aria-hidden /></span>
              <span>
                <span className={s.icpName}>{icp.label}</span>
                <span className={s.icpConcept}>{icp.concept}</span>
              </span>
            </Link>
            <div className={s.icpSubs}>
              {icp.subs.map((sub) => (
                <Link key={sub.href} href={sub.href} className={s.icpSubLink} data-cursor>{sub.label}</Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SolutionsPanel() {
  return (
    <div className={s.solGrid}>
      <Link href="/solutions" className={s.solFeature} data-cursor>
        <span className="u-mono" style={{ color: 'var(--accent)' }}>शील · SHEEL</span>
        <span>
          <span className={s.panelCardTitle} style={{ fontSize: 'var(--text-xl)' }}>One loop. Six arcs.</span>
          <span className={s.panelCardBlurb}>Your whole company as a single self-running business loop — no silos, no seams.</span>
        </span>
        <span className="btn-text" style={{ color: 'var(--accent)' }}>Explore Sheel <ArrowRight size={15} className="arrow" aria-hidden /></span>
      </Link>
      <div className={s.solArcs}>
        {ARCS.map((a) => (
          <Link key={a.slug} href={`/solutions/${a.slug}`} className={s.arcRow} data-cursor>
            <span className={s.arcNum}>{a.numeral}</span>
            <a.icon size={16} strokeWidth={1.7} aria-hidden />
            {a.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
