import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/company';
import { ARCS } from '@/lib/site';
import { ICPS } from '@/lib/icp';
import { USE_CASES, STORIES, POSTS } from '@/lib/content';

// Every public page. The deeper pages (ICP sub-pages, arcs, use cases) are
// reached through JavaScript menus, so listing them here helps indexing.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/about', '/contact', '/pragya', '/pricing',
    '/product/ai-employees', '/product/intelligence', '/product/tools', '/product/security',
    '/solutions', ...ARCS.map((a) => `/solutions/${a.slug}`),
    ...ICPS.flatMap((i) => [`/for/${i.slug}`, ...i.subPages.map((sp) => `/for/${i.slug}/${sp.slug}`)]),
    '/use-cases', ...USE_CASES.map((u) => `/use-cases/${u.slug}`),
    '/stories', ...STORIES.map((s) => `/stories/${s.slug}`),
    '/blog', ...POSTS.map((p) => `/blog/${p.slug}`),
    '/privacy', '/terms', '/data-deletion', '/subprocessors', '/refund-policy', '/delivery',
  ];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === '/' ? '' : p}`,
    changeFrequency: p === '/' || p.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : p.split('/').length > 2 ? 0.6 : 0.8,
  }));
}
