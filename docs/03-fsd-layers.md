# 03. FSD Layer Reference

This document is the canonical reference for what belongs in each
Feature-Sliced Design layer. Every new file added to the codebase should be
placed by first identifying its layer here.

```
src/
│
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

---

## 3.1 `app/` — Application Layer

**Responsible for:** application bootstrapping only. Never business logic.

```
app/
├── providers/     # context providers: query client, theme, auth, i18n
├── router/        # route composition, route guards
├── styles/         # global styles, CSS resets, token injection
├── config/          # runtime configuration wiring
├── layouts/          # root layout shells
└── entrypoints/        # platform entrypoints (web/mobile/admin/creator)
```

Owns: providers, routing composition, global configuration, authentication
*initialization* (not auth logic itself — that's `features/auth` +
`packages/auth`), theme, localization bootstrapping, analytics
initialization, global error boundaries, global styles, query client setup.

**Explicitly does not own:** any business rule, any domain type, any
feature-specific UI.

---

## 3.2 `pages/` — Pages Layer

**Responsible for:** complete routes/screens, composed from widgets.

```
pages/
├── home/
├── marketplace/
├── search/
├── asset/
├── category/
├── creator/
├── collection/
├── pricing/
├── checkout/
├── account/
├── downloads/
├── favorites/
└── settings/
```

Pages compose `widgets` (and, sparingly, `features`/`entities` directly when
no widget-level composition is needed). Pages must not contain low-level UI
implementation — that always belongs in `shared/ui` (atoms/molecules) or
`widgets`/`features` (organisms with business meaning).

A page's job is: fetch/orchestrate what the route needs, arrange widgets in
the route's layout, and handle route-level states (loading/error/empty at
the page level, in addition to the states each widget manages internally).

---

## 3.3 `widgets/` — Widgets Layer

**Responsible for:** large, reusable UI *compositions* that combine
entities, features, and shared UI into a meaningful section of a page.

```
widgets/
├── header/
├── navigation/
├── hero/
├── asset-grid/
├── asset-feed/
├── category-browser/
├── search-interface/
├── filter-panel/
├── recommendation-section/
├── creator-profile/
├── pricing-table/
├── checkout-summary/
├── account-sidebar/
├── download-panel/
└── footer/
```

A widget is reusable across multiple pages (e.g. `asset-grid` appears on
`marketplace`, `search`, `category`, and `creator` pages). Widgets may
import from `features`, `entities`, and `shared`, never from `pages` or
`app`.

---

## 3.4 `features/` — Features Layer

**Responsible for:** discrete user actions and business interactions. Each
feature slice is self-contained and independently testable.

```
features/
├── auth/
├── search-assets/
├── filter-assets/
├── sort-assets/
├── favorite-asset/
├── add-to-collection/
├── follow-creator/
├── purchase-asset/
├── subscribe/
├── download-asset/
├── upload-asset/
├── publish-asset/
├── review-asset/
├── report-asset/
├── share-asset/
├── checkout/
├── apply-license/
└── manage-profile/
```

**Internal structure of a feature slice** (canonical example):

```
features/favorite-asset/
├── ui/
│   └── FavoriteButton.tsx
├── model/
│   └── useFavoriteAsset.ts
├── api/
│   └── favoriteAsset.ts
└── index.ts
```

- `ui/` — presentational entry point for the feature (may compose
  `shared/ui` atoms/molecules).
- `model/` — feature-local state/hooks/business logic for this interaction.
- `api/` — the feature's calls into `packages/api-client`.
- `index.ts` — the feature's public interface. Nothing outside `ui/`,
  `model/`, `api/` is imported directly by consumers — always import
  through the slice's `index.ts`.

Every feature must have a single, clearly statable business purpose (its
name should make that purpose obvious — see
[14.5 Component & Slice Naming](./14-engineering-practices.md#145-component--slice-naming)).

---

## 3.5 `entities/` — Entities Layer

**Responsible for:** domain objects and their canonical representation —
the "nouns" of the system.

```
entities/
├── user/
├── creator/
├── asset/
├── category/
├── collection/
├── license/
├── order/
├── subscription/
├── payment/
├── review/
├── download/
├── notification/
└── payout/
```

**Internal structure of an entity slice** (canonical example):

```
entities/asset/
├── ui/
│   ├── AssetCard.tsx
│   ├── AssetThumbnail.tsx
│   ├── AssetMeta.tsx
│   ├── AssetBadge.tsx
│   └── AssetPrice.tsx
├── model/
│   ├── types.ts
│   └── selectors.ts
├── api/
│   └── assetApi.ts
└── index.ts
```

- `ui/` — the canonical visual representation of the entity (e.g. how an
  Asset is *always* rendered as a card, wherever it appears).
- `model/` — types and pure selectors/derivations over entity data.
- `api/` — the entity's own read endpoints (fetching an asset, a creator,
  etc.). Mutations that represent a *user action* belong in `features`
  (e.g. favoriting is a feature; fetching the asset itself is the entity).

Entities may depend only on `shared`. They must never import from
`features`, `widgets`, `pages`, or `app`.

---

## 3.6 `shared/` — Shared Layer

**Responsible for:** infrastructure and generic, domain-agnostic reusable
code. The foundation every other layer builds on.

```
shared/
├── ui/               # Atomic Design system — see 04-atomic-design-system.md
├── design-system/    # tokens, theming
├── lib/               # generic libraries/wrappers
├── hooks/              # generic, non-domain hooks
├── api/                 # base API client, request/response plumbing
├── config/                # shared config primitives
├── types/                  # generic utility types
├── constants/               # generic constants
├── assets/                   # static assets (icons, fonts, illustrations)
└── validation/                # generic validation primitives
```

`shared` depends on nothing else in the application. It is the only layer
every other layer is permitted to import from unconditionally.

---

## 3.7 Layer decision checklist

When adding new code, work through this checklist in order:

1. Is this a domain "noun" (Asset, Creator, Order, License...)? → `entities`
2. Is this a specific user action/interaction (favorite, purchase,
   upload...)? → `features`
3. Is this a reusable composition of multiple entities/features used across
   several pages (a whole grid, a whole header)? → `widgets`
4. Is this a whole route? → `pages`
5. Is this bootstrapping/global wiring with no business meaning? → `app`
6. Is this generic, domain-agnostic infrastructure or a design-system
   primitive? → `shared`

If a piece of code seems to fit two layers, it belongs in the *lowest*
layer that satisfies its actual responsibility — this keeps it reusable by
everything above it.
