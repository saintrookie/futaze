# 01. Product Vision & Principles

## 1.1 What we are building

A real-world, scalable marketplace product for buying, selling, and
distributing digital creative assets:

- Stock photography and images
- Illustrations and vector graphics
- Video and stock footage, motion graphics
- 3D assets
- Audio and music
- Fonts
- Design and presentation templates, UI kits
- Icons and creative resources
- AI-generated creative assets
- Other downloadable digital products

The product is comparable in category to Envato, Adobe Stock, Shutterstock,
and Motion Array, but is **not a clone**. It ships with an original visual
identity, information architecture, and interaction model, and is designed
from day one as a durable SaaS/marketplace platform rather than a demo or
CRUD prototype.

It must support, as first-class product surfaces:

1. Public marketplace (browse, search, discovery)
2. Customer accounts
3. Creator/contributor accounts
4. Admin/operations platform
5. Asset management and lifecycle
6. Search and discovery (including future AI-assisted discovery)
7. Licensing
8. Digital downloads and delivery
9. Payments
10. Subscriptions
11. Creator earnings and payouts
12. Reviews and ratings
13. Collections
14. Favorites
15. Purchase history
16. Content moderation
17. Analytics
18. Notifications
19. Mobile applications
20. Hybrid application capabilities

## 1.2 Positioning

The product should feel like the intersection of:

- A premium creative marketplace
- A modern SaaS product
- Editorial content discovery
- A high-end design platform
- Professional creative tooling

It should **not** visually or structurally clone any single incumbent.
Layouts, branding, typography, navigation, card design, color systems,
interaction patterns, and marketplace structure are all original design
decisions, informed by — but not copied from — the category.

The interface must read as: premium, modern, editorial, immersive, fast,
intelligent, professional, visually rich, trustworthy, creator-focused, and
conversion-oriented — simultaneously.

## 1.3 Core UX Principles

These principles govern every design and engineering decision in this
document set. When a specific screen or feature spec is ambiguous, resolve
the ambiguity in favor of these principles, in order:

1. **Asset-first** — The asset is the product. Chrome, decoration, and UI
   scaffolding should never compete visually with the creative work being
   sold.
2. **Search-first** — Users arrive with intent. They must be able to find
   what they need quickly, through keyword, semantic, visual, or faceted
   search.
3. **Preview-first** — Every purchase decision is preceded by a
   high-confidence preview (hover/tap preview, zoom, playback) that reduces
   uncertainty before checkout.
4. **Trust-first** — Creator identity, license terms, quality signals, file
   specifications, and usage rights are always visible and unambiguous
   before purchase.
5. **Conversion without dark patterns** — Pricing, licensing, and
   subscription mechanics are transparent. No forced continuity, hidden
   fees, or manipulative urgency messaging.
6. **Progressive disclosure** — Default views are simple; complexity
   (licensing detail, advanced filters, technical metadata) is available on
   demand, not forced on first contact.

## 1.4 Architectural Philosophy (summary)

Two systems govern the codebase and must never be conflated:

- **Feature-Sliced Design (FSD)** governs *application and system
  architecture* — where code lives, what may depend on what, and how
  business logic is organized. See [02](./02-system-architecture.md) and
  [03](./03-fsd-layers.md).
- **Atomic Design** governs *UI composition* inside the `shared` layer's
  design system only — tokens, atoms, molecules, organisms. It is not a
  substitute for FSD and must never contain business/domain logic. See
  [04](./04-atomic-design-system.md).

Business features are never implemented as "smart" generic UI components
(e.g., a `PurchaseAssetButton` atom). Generic UI stays generic; business
behavior lives in `features` and `entities`.

## 1.5 Non-Goals (explicit)

- This is not a landing page or marketing site build.
- This is not a single-tenant demo; it is designed for real transaction
  volume, real creator uploads, and real payment processing.
- This document set does not prescribe a single visual mockup — it defines
  the structure, content, and constraints each screen must satisfy. Visual
  design executes within [04](./04-atomic-design-system.md) and
  [13](./13-non-functional-requirements.md).
- This is documentation only. No source code, configuration files, or
  build artifacts are included in this set.
