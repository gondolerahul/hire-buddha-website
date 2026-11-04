// Smoke test for a running build: every route from the sitemap, at desktop and
// phone size, plus the 404 page, the lead API and the content rules the
// connector approvals depend on.
//
//   npm run build && npm start -- -p 3100   (in one terminal)
//   BASE_URL=http://localhost:3100 npm run smoke
//
// Exits non-zero on any failure. Needs a Playwright Chromium
// (`npx playwright install chromium`, or set CHROMIUM_PATH).
import { chromium } from 'playwright';

const BASE = (process.env.BASE_URL || 'http://localhost:3100').replace(/\/$/, '');
const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

const LEGAL_NAME = 'Buddha Cognitive Lab Private Limited';
const CIN = 'U62099MH2024PTC417114';
const HQ = '52, Gharkul Society, Indrayani Nagar, Beltarodi Road, Nagpur, Maharashtra, India - 440037';
const ALLOWED_EMAILS = new Set(['contact@hirebuddha.com', 'rahul@hirebuddha.com', 'piyush@hirebuddha.com']);
const PLACEHOLDERS = ['[CIN]', '[REGISTERED', '[NAME]', '[CONFIRM', 'buddhacognitive', 'AI Boulevard', 'Template content', '{{', 'Illustrative scenario'];

// ---------------------------------------------------------------- routes --
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (paths.length < 50) fail('sitemap', `only ${paths.length} URLs`);

// ---------------------------------------------- server HTML (no JavaScript) --
const titles = new Map();
const descriptions = new Map();
for (const p of paths) {
  const res = await fetch(BASE + p);
  if (res.status !== 200) { fail(p, `HTTP ${res.status}`); continue; }
  const html = await res.text();
  const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/placeholder="[^"]*"/g, '');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const expected = `https://hirebuddha.com${p === '/' ? '' : p}`;
  if (!title) fail(p, 'no <title>');
  if (titles.has(title)) fail(p, `title duplicates ${titles.get(title)}`); else titles.set(title, p);
  if (!desc) fail(p, 'no description');
  if (descriptions.has(desc)) fail(p, `description duplicates ${descriptions.get(desc)}`); else descriptions.set(desc, p);
  if (ogUrl !== expected) fail(p, `og:url is "${ogUrl}"`);
  if (canonical !== expected) fail(p, `canonical is "${canonical}"`);
  if (!/<meta property="og:image"/.test(html)) fail(p, 'no og:image');
  for (const must of [LEGAL_NAME, CIN, HQ]) if (!text.includes(must.replace(/&/g, '&amp;'))) fail(p, `server HTML lacks "${must}"`);
  for (const ph of PLACEHOLDERS) if (text.includes(ph)) fail(p, `contains placeholder "${ph}"`);
  if (text.includes('[TODO')) fail(p, 'contains [TODO');
  // Prices are in rupees everywhere; a dollar amount means a page was missed.
  for (const m of text.matchAll(/(?:US)?\$\s?\d[\d.,]*/g)) fail(p, `dollar amount "${m[0]}"`);
  for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
    if (!ALLOWED_EMAILS.has(m[0].toLowerCase())) fail(p, `unexpected e-mail address ${m[0]}`);
  }
  // The hero H1 must be readable without JavaScript.
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
  if (!h1) fail(p, 'no <h1> in server HTML');
}

const notFound = await fetch(`${BASE}/this-page-does-not-exist`);
if (notFound.status !== 404) fail('/404', `HTTP ${notFound.status}`);
const nfHtml = await notFound.text();
if (!nfHtml.includes('Page not found')) fail('/404', 'not the branded 404 page');
if (/<link rel="canonical"/.test(nfHtml)) fail('/404', 'has a canonical tag');

for (const p of ['/robots.txt', '/favicon.ico', '/apple-icon.png', '/opengraph-image', '/.well-known/security.txt']) {
  const r = await fetch(BASE + p);
  if (r.status !== 200) fail(p, `HTTP ${r.status}`);
}
for (const p of ['/fluid-buddha.global.js.map', '/sequences/homepage/manifest.json', '/next.svg']) {
  const r = await fetch(BASE + p);
  if (r.status !== 404) fail(p, `should be gone, got HTTP ${r.status}`);
}
const headers = (await fetch(BASE + '/')).headers;
for (const h of ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy']) {
  if (!headers.get(h)) fail('headers', `missing ${h}`);
}
if (headers.get('x-powered-by')) fail('headers', 'X-Powered-By is sent');

// --------------------------------------------------------------- lead API --
const post = (body, type = 'application/json', extra = {}) =>
  fetch(`${BASE}/api/lead`, { method: 'POST', headers: { 'content-type': type, ...extra }, body });
const lead = { name: 'Smoke Test', email: 'smoke@example.com', company: '', teamSize: '', message: '' };
const expectStatus = async (label, res, status) => { if (res.status !== status) fail('api', `${label}: HTTP ${res.status}, expected ${status}`); };
await expectStatus('bad e-mail "x@"', await post(JSON.stringify({ ...lead, email: 'x@' })), 400);
await expectStatus('object as name', await post(JSON.stringify({ ...lead, name: { a: 1 } })), 400);
await expectStatus('text/plain body', await post(JSON.stringify(lead), 'text/plain'), 415);
await expectStatus('cross-origin', await post(JSON.stringify(lead), 'application/json', { origin: 'https://evil.example' }), 403);
await expectStatus('oversized body', await post(JSON.stringify({ ...lead, message: 'x'.repeat(20_000) })), 413);
await expectStatus('honeypot', await post(JSON.stringify({ ...lead, website: 'spam' }), 'application/json', { 'x-forwarded-for': '203.0.113.9' }), 200);
let limited = false;
for (let i = 0; i < 8; i++) {
  const r = await post(JSON.stringify({ ...lead, email: 'bad' }), 'application/json', { 'x-forwarded-for': '203.0.113.77' });
  if (r.status === 429) { limited = true; break; }
}
if (!limited) fail('api', 'no rate limit after 8 rapid requests');

// -------------------------------------------------------------- in browser --
// CHROMIUM_PATH lets you use a Chromium already on the machine.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const [label, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  let current = '';
  page.on('console', (m) => { if (m.type() === 'error') fail(`${label} ${current}`, `console error: ${m.text().slice(0, 160)}`); });
  page.on('pageerror', (e) => fail(`${label} ${current}`, `page error: ${e.message.slice(0, 160)}`));
  for (const p of paths) {
    current = p;
    await page.goto(BASE + p, { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((h) => Number(h.tagName[1]));
      let skip = null;
      for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) { skip = `h${hs[i - 1]}→h${hs[i]}`; break; }
      return {
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        skip,
      };
    });
    if (r.h1 !== 1) fail(`${label} ${p}`, `${r.h1} <h1> elements`);
    if (r.overflow > 1) fail(`${label} ${p}`, `horizontal overflow of ${r.overflow}px`);
    if (r.skip && label === 'desktop') fail(p, `heading level skips ${r.skip}`);
  }

  if (label === 'desktop') {
    // Keyboard: the skip link moves focus into <main>.
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    if (!(await page.evaluate(() => document.activeElement?.id === 'main'))) fail('keyboard', 'skip link does not focus <main>');
    // Keyboard: every mega-menu link is reachable by Tab after opening its button.
    for (const menu of ['Product', 'Solutions', 'Who it’s for']) {
      await page.goto(BASE + '/', { waitUntil: 'load' });
      const btn = page.locator(`header nav button[data-menu="${menu}"]`);
      await btn.focus();
      await page.keyboard.press('Enter');
      const links = await page.locator(`#${await btn.getAttribute('aria-controls')} a`).count();
      let reached = 0;
      for (let i = 0; i < links; i++) {
        await page.keyboard.press('Tab');
        if (await page.evaluate((id) => !!document.activeElement?.closest(`#${id}`), await btn.getAttribute('aria-controls'))) reached++;
      }
      if (!links || reached !== links) fail('keyboard', `${menu}: reached ${reached} of ${links} links`);
    }
  }
  await context.close();
}
await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n` + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${paths.length} routes checked at desktop and mobile; all checks passed.`);
