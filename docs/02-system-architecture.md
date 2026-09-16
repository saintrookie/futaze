# 02. System Architecture

## 2.1 Two systems, two responsibilities

| System | Responsibility | Lives in |
|---|---|---|
| Feature-Sliced Design (FSD) | Application/system architecture: where code lives, what depends on what | Entire codebase (`src/`) |
| Atomic Design | UI composition: how visual components combine | Inside `shared/ui` and `shared/design-system` only |

Atomic Design is **not** the application architecture. It is one layer's
internal organizing principle. FSD is the system's organizing principle.

```
FSD
│
├── shared
│   └── Atomic Design System
│       ├── tokens
│       ├── atoms
│       ├── molecules
│       ├── organisms
│       └── ui primitives
│
├── entities
├── features
├── widgets
├── pages
└── app
```

## 2.2 Dependency direction (non-negotiable)

```
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

Rules:

- A layer may only import from itself or layers below it in this diagram.
- Lower layers never import from higher layers.
- No circular dependencies, at any layer, under any circumstance.
- These rules are mechanically enforced — see
  [14. Engineering Practices §14.4](./14-engineering-practices.md#144-fsd-boundary-enforcement).

Concretely forbidden:

```
shared    → features   ✗
entities  → features   ✗
features  → pages       ✗
entities  → widgets     ✗
```

## 2.3 Monorepo strategy

A monorepo is used so that domain logic, the design system, and design
tokens are shared across web, mobile, admin, and creator surfaces, while
platform-specific presentation is isolated per app.

```
root/
│
├── apps/
│   ├── web/          # public marketplace + customer account (Next.js)
│   ├── mobile/        # hybrid/native mobile application
│   ├── admin/         # internal admin/operations platform
│   └── creator/       # creator dashboard & upload experience
│
├── packages/
│   ├── ui/                 # atoms/molecules/organisms (Atomic Design system)
│   ├── design-system/      # tokens, theming, motion system
│   ├── entities/            # cross-platform domain entities (FSD entities layer)
│   ├── features/            # cross-platform business features (FSD features layer)
│   ├── api-client/          # typed API client, schemas, request/response contracts
│   ├── auth/                 # authentication/session logic
│   ├── config/                # environment & feature-flag config
│   ├── validation/            # shared Zod schemas / validators
│   ├── utilities/              # framework-agnostic helpers
│   ├── analytics/               # event tracking contracts
│   └── types/                    # shared TypeScript types
│
├── tooling/     # lint configs, FSD boundary rules, build tooling
├── docs/        # this documentation set
└── infrastructure/   # IaC, deployment config (documented, not implemented, here)
```

Workspace tooling: a package-manager workspace system (e.g. pnpm workspaces)
combined with a task orchestrator (e.g. Turborepo or an equivalent mature
tool) for caching, parallelization, and dependency-aware builds across
`apps/*` and `packages/*`.

**Guiding principle:** shared domain logic and design tokens are reusable
across platforms; platform-specific presentation (navigation chrome, native
gestures, platform APIs) stays isolated inside each `apps/*` package.

## 2.4 Why FSD for this product specifically

A marketplace of this scope has many cross-cutting business concerns
(assets, licensing, orders, subscriptions, creators, moderation) that are
each consumed from multiple surfaces (public browsing, checkout, creator
dashboard, admin). FSD's `entities` and `features` layers give each concern
a single canonical home, importable from any `widgets`/`pages` that need it,
without duplicating business logic per screen or per app.

## 2.5 Why Atomic Design for UI composition specifically

The product is asset-first and visually dense (grids, previews, media
players, editorial layouts). A disciplined atomic hierarchy (tokens → atoms
→ molecules → organisms) is what keeps hundreds of asset cards, filters, and
dashboard widgets visually and behaviorally consistent without duplicated,
one-off components. It also keeps generic UI reusable across `web`,
`mobile`, `admin`, and `creator` apps via `packages/ui`.

## 2.6 Web, Mobile, and Hybrid strategy

The architecture supports three deployment targets from shared domain code:

```
Web            → Next.js (App Router, Server Components where appropriate)
Mobile/Hybrid  → shares packages/entities, packages/features, packages/design-system
Desktop/Hybrid → same shared packages, different shell
```

Business logic (domain rules, validation, API contracts) is not coupled to
the browser DOM. It lives in `packages/entities`, `packages/features`, and
`packages/api-client`, which are consumable by any renderer. Only
presentation — layout, navigation chrome, gestures, platform APIs — is
platform-specific and lives inside each `apps/*` package.

See [12. Mobile & Hybrid Architecture](./12-mobile-hybrid-architecture.md)
for the full hybrid strategy, offline behavior, and native-feeling
navigation requirements.

## 2.7 Technology stack (reference)

| Concern | Choice |
|---|---|
| Web framework | Next.js (App Router), React, TypeScript (strict mode) |
| Styling | Tailwind CSS + CSS custom properties for design tokens |
| Server state | TanStack Query |
| Client/UI state | Zustand (or equivalent) — scoped, not global-by-default |
| Forms | React Hook Form + Zod schema validation |
| Media | Modern image formats (WebP/AVIF), responsive image loading, virtualization for large grids |
| Search | PostgreSQL for transactional data; dedicated search engine (OpenSearch/Elasticsearch/Typesense/Meilisearch — see [07](./07-search-discovery.md)) for discovery |
| Payments | Provider-abstracted service layer (Stripe/Xendit/Midtrans/PayPal — see [08](./08-commerce-licensing-payments.md)) |
| Object storage + CDN | Private original storage, CDN-fronted previews, signed URLs for downloads — see [15](./15-infrastructure-operations.md) |

Dependencies are added deliberately; unnecessary third-party packages are
avoided in favor of the above core set.
