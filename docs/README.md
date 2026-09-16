# Enterprise Digital Asset Marketplace — Documentation Set

This is the end-to-end documentation for a production-grade digital asset
marketplace (stock photos, video/footage, illustrations, vectors, 3D, audio,
fonts, templates, UI kits, icons, and AI-generated creative assets),
architected with **Feature-Sliced Design (FSD)** for system structure and
**Atomic Design** for UI composition, across **web, mobile, and hybrid**
targets.

This document set is documentation only — no application code is included.
It is intended to be dropped into a repository's `/docs` folder and used as
the reference for engineering, design, and product teams building the
platform.

## How this documentation is organized

| # | Document | Covers |
|---|----------|--------|
| 01 | [Product Vision & Principles](./01-product-vision.md) | What the product is, who it's for, positioning, UX principles, differentiation from category incumbents |
| 02 | [System Architecture](./02-system-architecture.md) | FSD ↔ Atomic Design integration, monorepo layout, dependency rules, hybrid app strategy |
| 03 | [FSD Layer Reference](./03-fsd-layers.md) | app / pages / widgets / features / entities / shared — responsibilities, contents, examples |
| 04 | [Atomic Design System](./04-atomic-design-system.md) | Design tokens, atoms, molecules, organisms, component governance |
| 05 | [Domain Model](./05-domain-model.md) | Core entities, relationships, schema notes, lifecycle states |
| 06 | [API & State Architecture](./06-api-state-architecture.md) | API client structure, server/client/URL state, error taxonomy, validation |
| 07 | [Search & Discovery](./07-search-discovery.md) | Search architecture, filtering, asset card/detail UX, recommendations, AI discovery |
| 08 | [Commerce, Licensing & Payments](./08-commerce-licensing-payments.md) | Licensing model, pricing, checkout, payment provider abstraction, subscriptions |
| 09 | [Creator Platform](./09-creator-platform.md) | Creator dashboard, upload pipeline, media processing, digital delivery, payouts |
| 10 | [Admin Platform](./10-admin-platform.md) | Admin dashboard, moderation, operational metrics, audit |
| 11 | [Screens & UX Catalog](./11-screens-ux-catalog.md) | Every screen across public/customer/creator/admin, navigation, empty/error states |
| 12 | [Mobile & Hybrid Architecture](./12-mobile-hybrid-architecture.md) | Responsive strategy, mobile UX, hybrid app concerns, offline behavior |
| 13 | [Non-Functional Requirements](./13-non-functional-requirements.md) | Accessibility, performance, SEO, security, internationalization |
| 14 | [Engineering Practices](./14-engineering-practices.md) | Testing strategy, code quality, component reuse, FSD lint boundaries |
| 15 | [Infrastructure & Operations](./15-infrastructure-operations.md) | Storage, CDN, observability, environments, feature flags |
| 16 | [Roadmap & Delivery Process](./16-roadmap-delivery-process.md) | Phased implementation plan, per-feature workflow, Definition of Done, architectural review checklist |

## Reading order

- **Product/Design stakeholders:** 01 → 11 → 04 → 13
- **Frontend/Platform engineers:** 02 → 03 → 04 → 06 → 14
- **Backend/Domain engineers:** 05 → 07 → 08 → 09 → 15
- **New engineers onboarding:** 01 → 02 → 03 → 16
