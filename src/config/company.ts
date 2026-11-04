// Single source of truth for the legal identity behind HireBuddha. The footer,
// contact page, legal pages, JSON-LD and security.txt all read from here, so
// a change is made once. Mirrors buddha-cognitive-lab-website's company.ts,
// with hirebuddha.com mailboxes (every role address maps onto contact@).

export const company = {
  legalName: 'Buddha Cognitive Lab Private Limited',
  shortName: 'Buddha Cognitive Lab',
  cin: 'U62099MH2024PTC417114',
  // The registered office, as on the certificate of incorporation.
  hq: {
    line1: '52, Gharkul Society, Indrayani Nagar, Beltarodi Road',
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    pin: '440037',
    full: '52, Gharkul Society, Indrayani Nagar, Beltarodi Road, Nagpur, Maharashtra, India - 440037',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=52%20Gharkul%20Society%2C%20Indrayani%20Nagar%2C%20Beltarodi%20Road%2C%20Nagpur%20440037',
  },
  phone: { display: '+91 93102 31302', tel: '+919310231302' },
  hours: 'Mon–Fri, 10:00–18:00 IST',
  email: {
    contact: 'contact@hirebuddha.com',
    rahul: 'rahul@hirebuddha.com',
    piyush: 'piyush@hirebuddha.com',
  },
  grievanceOfficer: {
    name: 'Rahul Gondole',
    designation: 'Founder & CEO',
    email: 'rahul@hirebuddha.com',
  },
  url: 'https://buddhalab.in',
  linkedin: 'https://www.linkedin.com/company/buddha-cognitive-lab',
  x: 'https://x.com/buddhalab',
} as const;

export const SITE_URL = 'https://hirebuddha.com';
export const APP_URL = 'https://app.hirebuddha.com';
export const SIGNUP_URL = `${APP_URL}/register`;
export const SIGNIN_URL = `${APP_URL}/login`;

// The date shown as "Last updated" on every legal page. Change it whenever a
// legal page's text changes.
export const LEGAL_UPDATED = '3 November 2026';

export interface Product {
  name: string;
  tagline: string;
  url: string;
  // false until the product's own website loads; shown without a link.
  live: boolean;
}

export const otherProducts: Product[] = [
  { name: 'fluIDBuddha', tagline: 'An AI-driven, fluid and dynamic user interface system.', url: 'https://fluidbuddha.com', live: false },
  { name: 'ChantingBuddha', tagline: 'An API platform for accessing our AI models.', url: 'https://chantingbuddha.com', live: true },
];
