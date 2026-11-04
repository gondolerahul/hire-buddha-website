import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_NAV, LEGAL_NAV } from '@/lib/site';
import { company, otherProducts, SIGNUP_URL } from '@/config/company';
import { PragyaButton } from '@/components/pragya/PragyaButton';
import { FooterWordmark } from './FooterWordmark';
import s from './Footer.module.css';

// A server component, so the legal identity below is in every page's HTML and
// the year is computed on the server.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={`u-container u-container--wide ${s.top}`}>
        <div className={s.brand}>
          <Link href="/" className={s.brandTop} aria-label="HireBuddha home">
            <Image src="/images/logo-mark-gold.svg" alt="" width={13} height={32} className={s.brandMark} />
            <span className={s.brandName}>Hire<b>Buddha</b></span>
          </Link>
          <p className={s.tagline}>Stop hiring. Start deploying.<br />Towards digital enlightenment.</p>
          <div className={s.ctaRow}>
            <a href={SIGNUP_URL} className="btn btn-gold">Start Free <ArrowUpRight size={16} /></a>
            <PragyaButton />
          </div>
        </div>

        <nav className={s.cols} aria-label="Footer">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <div className={s.colHead}>{col.heading}</div>
              <div className={s.colList}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className={s.colLink}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className={`u-container u-container--wide ${s.company}`}>
        <address className={s.companyBlock}>
          <span className={s.companyName}>{company.legalName}</span>
          <span>CIN {company.cin}</span>
          <span>Registered office: {company.hq.full}</span>
          <span>
            <a href={`mailto:${company.email.contact}`} className={s.inlineLink}>{company.email.contact}</a>
            {' · '}
            <a href={`tel:${company.phone.tel}`} className={s.inlineLink}>{company.phone.display}</a>
            {' · '}{company.hours}
          </span>
        </address>
        <div className={s.companyBlock}>
          <span>
            HireBuddha is a product of{' '}
            <a href={company.url} className={s.inlineLink} target="_blank" rel="noopener">{company.legalName}</a>.
          </span>
          <span>
            Other products:{' '}
            {otherProducts.map((p, i) => (
              <span key={p.name}>
                {i > 0 && ' · '}
                {p.live
                  ? <a href={p.url} className={s.inlineLink} target="_blank" rel="noopener">{p.name}</a>
                  : <>{p.name} (launching soon)</>}
              </span>
            ))}
          </span>
        </div>
        <nav className={s.legalNav} aria-label="Legal">
          {LEGAL_NAV.map((l) => <Link key={l.href} href={l.href} className={s.legalLink}>{l.label}</Link>)}
        </nav>
      </div>

      <div className={`u-container u-container--wide ${s.bottom}`}>
        <span className={s.meta}>© {year} {company.legalName}. All rights reserved.</span>
        <div className={s.socials}>
          <a className={s.social} href={company.x} aria-label="Buddha Cognitive Lab on X" target="_blank" rel="noopener noreferrer"><XIcon /></a>
          <a className={s.social} href={company.linkedin} aria-label="Buddha Cognitive Lab on LinkedIn" target="_blank" rel="noopener noreferrer"><InIcon /></a>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}

function XIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}
function InIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>;
}
