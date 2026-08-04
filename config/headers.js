/**
 * Security headers.
 *
 * Two profiles:
 * - `/preview` — allows the Contentful editor to iframe the app. Drops X-Frame-Options (its only
 *   options are SAMEORIGIN or the deprecated single-origin ALLOW-FROM — it cannot express a
 *   multi-origin allow-list). Lists the editor origins in `frame-ancestors`. See
 *   reference/05-preview.md, "three iframe guards".
 * - everything else — deny-by-default framing.
 *
 * The editor origins include the two prod hosts and the staging host (`app.flinkly.com`); adjust
 * per environment.
 */

const EDITOR_ORIGINS = [
  'https://app.contentful.com',
  'https://app.eu.contentful.com',
  'https://app.flinkly.com',
];

const baseHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
];

const strictHeaders = [
  ...baseHeaders,
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: `frame-ancestors 'self'` },
];

const previewHeaders = [
  ...baseHeaders,
  // No X-Frame-Options on /preview — CSP frame-ancestors carries the policy instead.
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self' ${EDITOR_ORIGINS.join(' ')}`,
  },
];

module.exports = async () => {
  return [
    // The /preview route needs to be iframed by the Contentful editor.
    { source: '/preview', headers: previewHeaders },
    { source: '/preview/', headers: previewHeaders },
    // Everything else gets deny-by-default framing. Two rules — an explicit root and a catch-all
    // that excludes /preview — because a bare `/((?!preview).*)` source does NOT match the bare
    // root `/` in Next.js's header router.
    { source: '/', headers: strictHeaders },
    { source: '/((?!preview$|preview/).*)', headers: strictHeaders },
  ];
};
