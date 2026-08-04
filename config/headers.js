// Editor origins allowed to iframe the ExO preview route.
//   - app.contentful.com / app.eu.contentful.com  → production (com + eu)
//   - app.flinkly.com                              → staging
// The app is framed by the Contentful editor only for /preview, so we relax the
// framing policy on that route alone and keep every other route deny-by-default.
const EXO_EDITOR_FRAME_ANCESTORS = [
  "'self'",
  'https://app.contentful.com',
  'https://app.eu.contentful.com',
  'https://app.flinkly.com',
].join(' ');

// Strict defaults for the whole app. X-Frame-Options: SAMEORIGIN forbids any
// cross-origin framing, and frame-ancestors is scoped to same-origin only.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self'`,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
];

// Same strict set for the preview route, minus the framing lock: the editor
// must be able to iframe it. X-Frame-Options can only say SAMEORIGIN or a single
// (deprecated) ALLOW-FROM, so it cannot express a multi-origin allow-list — drop
// it here and let CSP frame-ancestors (its modern replacement) carry the policy.
const previewHeaders = [
  ...securityHeaders.filter((h) => h.key !== 'X-Frame-Options' && h.key !== 'Content-Security-Policy'),
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors ${EXO_EDITOR_FRAME_ANCESTORS}`,
  },
];

module.exports = async () => {
  return [
    {
      // The preview route, framed by the Contentful editor. Listed first, and
      // the default rule below excludes /preview so the two never both match
      // and emit duplicate/conflicting framing headers.
      source: '/preview',
      headers: previewHeaders,
    },
    {
      // Root route, explicitly: Next's negative-lookahead source below does not
      // match the bare '/', so it would otherwise get no headers at all.
      source: '/',
      headers: securityHeaders,
    },
    {
      // Every other route: strict, framing denied to cross-origin. The
      // (?!preview) lookahead keeps /preview from also matching here (which
      // would re-add X-Frame-Options and a second, stricter CSP and re-break
      // the iframe).
      source: '/((?!preview).*)',
      headers: securityHeaders,
    },
  ];
};
