import path from 'node:path';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Pragya's backend: the WebSocket for voice and its HTTPS twin for the text
// fallback. Both must be allowed in connect-src.
const pragyaWss = process.env.NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS || 'wss://api.fluidbuddha.com';
const pragyaHttps = pragyaWss.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:');

// Every page is statically generated, so nonces are not available; inline
// scripts (Next's bootstrap and the JSON-LD block) need 'unsafe-inline'. The
// policy still pins every other source to this origin and Pragya's backend.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob: data:",
  `connect-src 'self' ${pragyaWss} ${pragyaHttps}${isDev ? ' ws: http://localhost:*' : ''}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), payment=(), usb=(), microphone=(self)' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pin the workspace root so a stray lockfile in a parent folder is ignored.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
