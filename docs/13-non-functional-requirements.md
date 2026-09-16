# 13. Non-Functional Requirements

## 13.1 Accessibility

Target conformance level: **WCAG 2.2 AA**, platform-wide, with no
exceptions carved out for "marketing" or "marketplace" surfaces.

Requirements:

```
semantic HTML
keyboard navigation
visible focus states
screen-reader support
ARIA only when semantic HTML is insufficient
sufficient color contrast
respect for prefers-reduced-motion
accessible forms
accessible media controls
proper heading hierarchy
```

Accessibility is verified per-feature, per the Definition of Done in
[16.3](./16-roadmap-delivery-process.md#163-definition-of-done) — it is not
a final-pass audit item.

## 13.2 Performance

Performance is a first-class product requirement, not an optimization
pass.

Targets:

```
fast initial load
excellent Core Web Vitals
minimal JavaScript
optimized images
responsive images
lazy loading
code splitting
streaming
prefetching
caching
virtualized grids
```

Media-specific requirements:

```
WebP / AVIF formats
responsive image sizes per viewport
poster frames for all video
adaptive video delivery
CDN delivery for all public media
```

Hard rule: original, full-resolution assets are never loaded in
marketplace/search/collection grids — only CDN-optimized preview
derivatives (see
[09.3 Media Processing Pipeline](./09-creator-platform.md#93-media-processing-pipeline)).

### Performance budget

Avoid:

```
huge JS bundles
unoptimized images
unnecessary client components (prefer server components by default)
blocking requests
large third-party scripts
```

Prefer:

```
server rendering
streaming
lazy loading
partial hydration where applicable
CDN caching
```

## 13.3 SEO

All marketplace pages must be indexable and well-formed for search and
social sharing:

```
metadata
Open Graph
Twitter/X metadata
structured data
canonical URLs
sitemaps
robots directives
breadcrumbs
semantic markup
```

Asset detail pages specifically implement the dynamic metadata generation
described in
[11.10 SEO-friendly Asset Pages](./11-screens-ux-catalog.md#1110-seo-friendly-asset-pages).

## 13.4 Security

Production-grade security is required across the platform, with specific
protection against:

```
XSS
CSRF
SQL injection
IDOR (insecure direct object reference)
broken access control
file upload attacks
path traversal
signed URL abuse
rate abuse
credential attacks
payment webhook attacks
```

**Non-negotiable rule:** asset downloads must verify authorization
server-side. The frontend is never trusted as an authorization boundary —
this applies identically to web, mobile, and hybrid surfaces (see
[12.6](./12-mobile-hybrid-architecture.md#126-security-on-hybrid-surfaces)),
and to the digital delivery pipeline in
[09.4](./09-creator-platform.md#94-digital-delivery) and the entitlement
flow in
[08.7](./08-commerce-licensing-payments.md#87-order-integrity--entitlement).

Payment webhooks are verified (signature/HMAC verification via
`PaymentService.verifyWebhook()`,
[08.4](./08-commerce-licensing-payments.md#84-payment-architecture)) before
any order state is mutated as a result of them.

Upload validation (file type, size, content scanning) happens before an
asset enters the `PROCESSING` stage of
[09.3](./09-creator-platform.md#93-media-processing-pipeline), never
relying solely on client-side file-type checks.

## 13.5 Internationalization

Initial locale support:

```
English
Indonesian
```

The system is designed for additional locales without architectural
change. Requirements:

- No user-facing string is ever hardcoded — all copy is sourced through the
  i18n layer.
- Locale, currency, date/time, number formatting, timezone, and
  pluralization are all locale-aware, not just translated strings.

## 13.6 UI quality bar

Every shipped screen must feel production-ready. Explicitly disallowed:

```
placeholder-looking layouts
generic, undifferentiated dashboards
excessive rounded cards
decorative/random gradients
inconsistent spacing
inconsistent typography
fake or non-functional interactions
meaningless animation
excessive shadow use
poor/neglected mobile layouts
```

Every visual decision must be traceable to a reason (a token, a hierarchy
need, a usability need) — this is the same standard referenced in
[04.2 Visual Direction](./04-atomic-design-system.md#42-visual-direction).
