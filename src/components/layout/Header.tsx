'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Menu, X, ArrowRight, User, Rocket, Building2, Landmark } from 'lucide-react';
import { NAV, PRODUCTS, ARCS, ICP_NAV } from '@/lib/site';

const ICP_ICONS = [User, Rocket, Building2, Landmark];
import { talkToPragya } from '@/lib/pragya';
import { Magnetic } from '@/components/motion/primitives';
import s from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change + lock body scroll for the mobile sheet.
  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={s.header} data-scrolled={scrolled} onMouseLeave={() => setOpen(null)}>
      <motion.div className={s.progress} style={{ scaleX }} aria-hidden />
      <div className={`u-container--wide u-container ${s.bar}`}>
        <Magnetic strength={0.25}>
          <Link href="/" className={s.logo} aria-label="HireBuddha — home">
            <Image src="/images/logo-mark-gold.svg" alt="" width={14} height={34} className={s.logoMark} priority />
            <span className={s.logoText}>Hire<b>Buddha</b></span>
          </Link>
        </Magnetic>

        <nav className={s.nav} aria-label="Primary">
          {NAV.map((g) => (
            g.href ? (
              <Link key={g.label} href={g.href} className={s.navItem} data-cursor>
                {g.label}
              </Link>
            ) : (
              <button
                key={g.label}
                className={s.navItem}
                data-open={open === g.label}
                aria-haspopup="true"
                aria-expanded={open === g.label}
                onMouseEnter={() => setOpen(g.label)}
                onFocus={() => setOpen(g.label)}
                onClick={() => setOpen(open === g.label ? null : g.label)}
              >
                {g.label} <ChevronDown size={15} strokeWidth={2} />
              </button>
            )
          ))}

          {/* Mega panels */}
          <div className={s.panelWrap}>
            <AnimatePresence>
              {open && (
                <motion.div
                  className={`${s.panel} ${open === 'Who it’s for' ? s.panelWide : ''}`}
                  initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setOpen(open)}
                >
                  {open === 'Product' && (
                    <div className={s.panelGrid}>
                      {PRODUCTS.map((p) => (
                        <Link key={p.slug} href={p.slug} className={s.panelCard} data-cursor>
                          <span className={s.panelIcon}><p.icon size={20} strokeWidth={1.6} /></span>
                          <span>
                            <span className={s.panelCardTitle}>{p.title}</span>
                            <span className={s.panelCardBlurb}>{p.blurb}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {open === 'Who it’s for' && (
                    <div className={s.icpGrid}>
                      {ICP_NAV.map((icp, idx) => {
                        const Icon = ICP_ICONS[idx] ?? User;
                        return (
                          <div key={icp.href} className={s.icpCol}>
                            <Link href={icp.href} className={s.icpHead} data-cursor>
                              <span className={s.panelIcon}><Icon size={18} strokeWidth={1.6} /></span>
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
                  )}
                  {open === 'Solutions' && (
                    <div className={s.solGrid}>
                      <Link href="/solutions" className={s.solFeature} data-cursor>
                        <span className="u-mono" style={{ color: 'var(--accent)' }}>शील · SHEEL</span>
                        <span>
                          <span className={s.panelCardTitle} style={{ fontSize: 'var(--text-xl)' }}>One loop. Six arcs.</span>
                          <span className={s.panelCardBlurb}>Your whole company as a single self-running business loop — no silos, no seams.</span>
                        </span>
                        <span className="btn-text" style={{ color: 'var(--accent)' }}>Explore Sheel <ArrowRight size={15} className="arrow" /></span>
                      </Link>
                      <div className={s.solArcs}>
                        {ARCS.map((a) => (
                          <Link key={a.slug} href={`/solutions/${a.slug}`} className={s.arcRow} data-cursor>
                            <span className={s.arcNum}>{a.numeral}</span>
                            <a.icon size={16} strokeWidth={1.7} />
                            {a.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className={s.actions}>
          <div className={s.desktopActions}>
            <button className="btn btn-ghost" onClick={() => talkToPragya()}>Talk to Pragya</button>
            <Magnetic strength={0.3}>
              <Link href="/contact" className="btn btn-gold" data-cursor>Get Started <ArrowUpRight size={16} /></Link>
            </Magnetic>
          </div>
          <button className={s.burger} onClick={() => setMobile(true)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div className={s.mobile}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <button className={s.mClose} onClick={() => setMobile(false)} aria-label="Close menu"><X size={20} /></button>
            <div className={s.mobileInner}>
              <Link href="/" className={s.mLink}>Home <ArrowUpRight size={20} /></Link>
              <div>
                <div className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Product</div>
                <div className={s.mSub}>{PRODUCTS.map((p) => <Link key={p.slug} href={p.slug} className={s.mChip}>{p.title}</Link>)}</div>
              </div>
              <div>
                <Link href="/solutions" className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Solutions <ArrowUpRight size={20} /></Link>
                <div className={s.mSub}>{ARCS.map((a) => <Link key={a.slug} href={`/solutions/${a.slug}`} className={s.mChip}>{a.name}</Link>)}</div>
              </div>
              <div>
                <div className={s.mLink} style={{ borderBottom: 'none', paddingBottom: 4 }}>Who it’s for</div>
                <div className={s.mSub}>{ICP_NAV.map((icp) => <Link key={icp.href} href={icp.href} className={s.mChip}>{icp.label}</Link>)}</div>
              </div>
              <Link href="/pricing" className={s.mLink}>Pricing <ArrowUpRight size={20} /></Link>
              <Link href="/use-cases" className={s.mLink}>Use Cases <ArrowUpRight size={20} /></Link>
              <Link href="/stories" className={s.mLink}>Impact Stories <ArrowUpRight size={20} /></Link>
              <Link href="/pragya" className={s.mLink}>Meet Pragya <ArrowUpRight size={20} /></Link>
              <Link href="/blog" className={s.mLink}>Blog <ArrowUpRight size={20} /></Link>
            </div>
            <div className={s.mActions}>
              <button className="btn btn-ghost btn-lg" onClick={() => { setMobile(false); talkToPragya(); }}>Talk to Pragya</button>
              <Link href="/contact" className="btn btn-gold btn-lg">Get Started <ArrowUpRight size={16} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
