# 12. Mobile & Hybrid Architecture

## 12.1 Responsive design principles

Design is mobile-first. Breakpoints are defined for:

```
mobile
tablet
desktop
wide desktop
```

Mobile layouts are deliberate compositions, not a shrunk desktop layout —
every screen in [11. Screens & UX Catalog](./11-screens-ux-catalog.md) is
designed at the mobile breakpoint first, then progressively enhanced
upward.

## 12.2 Mobile UX

Mobile navigation combines:

```
bottom navigation + contextual navigation + gesture interactions
```

Key mobile flows that must be first-class, not degraded desktop flows:

```
Discover
Search
Preview
Favorite
Collection
Purchase
Download
Account
```

See [11.5 Mobile Navigation](./11-screens-ux-catalog.md#115-mobile-navigation)
for the navigation structure itself.

## 12.3 Hybrid app UX

For hybrid mobile applications specifically, prioritize:

```
fast launch
offline-aware UX
gesture support
native-feeling navigation
deep links
push notifications
secure authentication
secure downloads
```

Desktop UI patterns are never forced onto mobile/hybrid surfaces — any
widget or organism that doesn't have a coherent mobile presentation is
redesigned for that context rather than shrunk.

## 12.4 Shared domain, isolated presentation

Per [02.6](./02-system-architecture.md#26-web-mobile-and-hybrid-strategy),
business logic is never coupled to the browser DOM. This is what makes the
hybrid strategy viable:

```
packages/entities   → shared across web, mobile, admin, creator
packages/features    → shared across web, mobile, admin, creator
packages/design-system → tokens shared; presentation adapted per platform
apps/mobile          → platform-specific shell, navigation, native APIs only
```

A feature like `purchase-asset` or `favorite-asset` has one model/api
implementation (in `packages/features`) and platform-specific `ui/`
presentations where the interaction pattern genuinely differs (e.g. a
native share sheet vs. a web share link).

## 12.5 Offline & poor-network handling

Cacheable, non-sensitive data for offline/poor-network resilience:

```
recent searches
favorites
collections metadata
asset metadata
user preferences
```

Explicitly **not** cached insecurely: protected original asset files.
Offline caching never bypasses the download authorization pipeline in
[09.4 Digital Delivery](./09-creator-platform.md#94-digital-delivery).

Required network-condition handling:

```
offline
poor network
reconnection
partial downloads
retry
```

Downloads in progress must support resumable behavior consistent with the
resumable upload requirement in
[09.2](./09-creator-platform.md#92-asset-upload-system) — the same
progress/pause/resume UX pattern applies symmetrically to downloads on
constrained connections.

## 12.6 Security on hybrid surfaces

Authentication and download authorization on mobile/hybrid follow the same
server-side verification rules as web
([13.4 Security](./13-non-functional-requirements.md#134-security)) —
no relaxed trust model for the native shell. Secure token storage and
secure download handling are platform-appropriate implementations of the
same signed-URL + entitlement-check pipeline described in
[09.4](./09-creator-platform.md#94-digital-delivery).
