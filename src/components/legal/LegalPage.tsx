import { readFileSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { company, LEGAL_UPDATED } from '@/config/company';
import s from './legal.module.css';

// Legal texts live as Markdown in src/content/legal, written with {{tokens}}
// that are filled from the company config, so the CIN, address and mailboxes
// are typed once. Rendered on the server: every word is in the static HTML.

const DIR = path.join(process.cwd(), 'src/content/legal');
const read = (name: string) => readFileSync(path.join(DIR, `${name}.md`), 'utf8');

const values: Record<string, string> = {
  legalName: company.legalName,
  cin: company.cin,
  address: company.hq.full,
  city: company.hq.city,
  phone: company.phone.display,
  hours: company.hours,
  contactEmail: company.email.contact,
  grievanceName: company.grievanceOfficer.name,
  grievanceDesignation: company.grievanceOfficer.designation,
  grievanceEmail: company.grievanceOfficer.email,
  effectiveDate: LEGAL_UPDATED,
  lastUpdated: LEGAL_UPDATED,
};

function fill(markdown: string): string {
  return markdown
    .replace('{{subprocessorsTable}}', () => read('_subprocessors-table').trim())
    .replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
      if (!(key in values)) throw new Error(`Unknown legal-page token ${match}`);
      return values[key];
    });
}

/** The page's Markdown with tokens filled and its leading "# Title" removed. */
export function loadLegal(name: string): { title: string; body: string } {
  const text = fill(read(name));
  const m = text.match(/^#\s+(.+)\n+/);
  return { title: m ? m[1].trim() : name, body: m ? text.slice(m[0].length) : text };
}

// "10. Contact and Grievance Officer" -> "contact-and-grievance-officer"
const slugify = (text: string) =>
  text.replace(/^\d+\.\s*/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const textOf = (children: React.ReactNode): string =>
  React.Children.toArray(children).map((c) => (typeof c === 'string' ? c : '')).join('');

const components: Components = {
  // Drafts number their sections "## 1. …" and link to them as "#1-…", so
  // the id keeps the number; the plain slug is added as a second anchor.
  h2: ({ children }) => {
    const text = textOf(children);
    const numbered = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return (
      <h2 id={numbered} className={s.h2}>
        {numbered !== slugify(text) && <span id={slugify(text)} />}
        {children}
      </h2>
    );
  },
  h3: ({ children }) => <h3 className={s.h3}>{children}</h3>,
  a: ({ href = '', children }) =>
    href.startsWith('/') || href.startsWith('#')
      ? <Link href={href}>{children}</Link>
      : <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
  table: ({ children }) => <div className={s.tableWrap}><table>{children}</table></div>,
};

export function LegalPage({ name, excerpt }: { name: string; excerpt: string }) {
  const { title, body } = loadLegal(name);
  return (
    <article className={s.article}>
      <header className={s.hero}>
        <div className={s.meta}><span className={s.cat}>Legal</span><span>·</span><span>{company.legalName}</span></div>
        <h1 className={s.title}>{title}</h1>
        <p className={s.excerpt}>{excerpt}</p>
      </header>
      <div className={s.rule} />
      <div className={s.body}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{body}</ReactMarkdown>
      </div>
    </article>
  );
}
