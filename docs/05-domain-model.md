# 05. Domain Model

This document defines the core domain entities, their responsibilities, key
relationships, and lifecycle states. It is the reference for both the
`entities/*` FSD slices and the backing relational schema.

## 5.1 Entity inventory

```
users, profiles, creators, assets, asset_versions, asset_files,
asset_previews, categories, tags, asset_tags, licenses, prices, orders,
order_items, payments, subscriptions, downloads, favorites, collections,
collection_items, reviews, ratings, creator_payouts, notifications,
reports, moderation_records, analytics_events
```

## 5.2 Entity relationship overview

```
User ──1:1── Profile
User ──1:1── Creator (optional; a User may hold a Creator profile)

Creator ──1:N── Asset
Asset   ──1:N── AssetVersion
Asset   ──1:N── AssetFile        (source/original files, private)
Asset   ──1:N── AssetPreview     (public preview derivatives)
Asset   ──N:M── Category  (primary category is 1:1; secondary via tags/collections)
Asset   ──N:M── Tag        (via AssetTag)
Asset   ──1:N── License      (available license tiers for this asset)
License ──1:N── Price

User    ──1:N── Order
Order   ──1:N── OrderItem ──N:1── Asset
Order   ──1:N── Payment
Order   ──1:1── Subscription  (when the order represents a subscription purchase)

User    ──1:N── Download ──N:1── Asset
User    ──1:N── Favorite ──N:1── Asset
User    ──1:N── Collection ──1:N── CollectionItem ──N:1── Asset

User    ──1:N── Review ──N:1── Asset
Review  ──1:1── Rating

Creator ──1:N── CreatorPayout
User    ──1:N── Notification

Asset   ──1:N── Report            (user-submitted content reports)
Asset   ──1:N── ModerationRecord  (moderation lifecycle history)

(all)   ──1:N── AnalyticsEvent    (append-only event log, see §5.5)
```

## 5.3 Key entity notes

### User / Profile / Creator
- `User` is the authentication/identity root. `Profile` holds
  customer-facing display data. `Creator` is an extension a `User` may
  additionally hold, gating access to `creator/*` routes and features.
- A single person can be both a buyer and a creator on the same `User`
  record.

### Asset / AssetVersion / AssetFile / AssetPreview
- `Asset` is the sellable unit (its metadata, category, tags, licensing
  configuration, and lifecycle state — see §5.4).
- `AssetVersion` allows a creator to publish updated files against the same
  listing without breaking existing purchasers' download rights (a
  purchaser's download is bound to the version they purchased, or the
  latest version, per licensing terms).
- `AssetFile` records point at **private** object storage (originals);
  never exposed directly to clients.
- `AssetPreview` records point at **CDN-fronted, public** derivatives
  (thumbnails, watermarked previews, low-res streaming proxies).

### License / Price
- `License` is modeled as a first-class domain entity, not UI logic. Tiers:
  `personal`, `commercial`, `extended`, `editorial`, `enterprise`.
- Each `Asset` can expose one or more `License` tiers; each `License` tier
  has its own `Price` (supporting single-purchase, subscription-credit, or
  bundle pricing — see [08. Commerce, Licensing & Payments](./08-commerce-licensing-payments.md)).
- Licensing eligibility/entitlement logic lives in a dedicated domain/service
  layer, never hardcoded into UI components.

### Order / OrderItem / Payment / Subscription
- `Order` is the transaction envelope; `OrderItem` binds specific
  `Asset` + `License` selections to that order.
- `Payment` is provider-agnostic — see [08.4 Payment Architecture](./08-commerce-licensing-payments.md#84-payment-architecture).
- `Subscription` represents recurring plans (including credit-based plans)
  and can generate `Order`s on each billing cycle.

### Download / Favorite / Collection / CollectionItem
- `Download` records every authorized download event (see
  [09.4 Digital Delivery](./09-creator-platform.md#94-digital-delivery)) —
  this is both an entitlement record and an analytics source.
- `Favorite` is a simple user↔asset bookmark.
- `Collection` supports moodboards, projects, campaigns, and
  public/private sharing; `CollectionItem` orders assets within a
  collection and supports reordering.

### Review / Rating
- A `Review` is authored by a `User` against an `Asset` (typically gated to
  verified purchasers) and carries a `Rating`.

### CreatorPayout
- Tracks payout batches to a `Creator`, derived from their share of
  completed `Order`/`Payment` records net of platform fees and refunds.

### Notification
- Cross-cutting delivery record (in-app, email, push) triggered by domain
  events (purchase confirmation, payout processed, moderation decision,
  new review, etc.).

### Report / ModerationRecord
- `Report` is a user-submitted flag against an `Asset` (or, extensibly, a
  `Creator`/`Review`).
- `ModerationRecord` is the append-only history of moderation decisions and
  state transitions for an `Asset` (see §5.4 and
  [10. Admin Platform](./10-admin-platform.md)).

### AnalyticsEvent
- Append-only event log backing the analytics pipeline. See
  [5.5](#55-analytics-event-catalog) and
  [10.3 Analytics](./10-admin-platform.md#103-analytics).

## 5.4 Asset lifecycle

```
UPLOADING
  ↓
PROCESSING
  ↓
DRAFT
  ↓
UNDER_REVIEW
  ↓
APPROVED
  ↓
PUBLISHED
  ↓
ARCHIVED
```

- `UPLOADING` / `PROCESSING` are transient, system-driven states tied to
  the media processing pipeline ([09.3](./09-creator-platform.md#93-media-processing-pipeline)).
- `DRAFT` is creator-owned and editable; not visible to buyers.
- `UNDER_REVIEW` → `APPROVED`/rejected is the moderation gate
  ([10.2 Moderation](./10-admin-platform.md#102-moderation)).
- `PUBLISHED` is the only state visible in public marketplace surfaces.
- `ARCHIVED` removes an asset from discovery while preserving purchase
  history and download rights for prior buyers.

Every transition is recorded as a `ModerationRecord` (system or
human-initiated) for auditability.

## 5.5 Analytics event catalog

Minimum event set the domain model must support (see
[10.3](./10-admin-platform.md#103-analytics) for how these are consumed):

```
asset_viewed
asset_previewed
asset_favorited
asset_added_to_collection
creator_viewed
search_performed
filter_used
checkout_started
purchase_completed
download_started
download_completed
subscription_started
```

The event schema is designed to accept additional event types without a
migration, so future product analytics integrations can plug in (see
[16. Roadmap](./16-roadmap-delivery-process.md)).

## 5.6 Schema conventions

Applied consistently across every table above:

- Explicit foreign keys with referential integrity.
- Indexes on all foreign keys and on columns used in filtering/sorting at
  scale (category, price, publish date, popularity).
- Unique constraints where uniqueness is a business rule (e.g. one
  `Favorite` per `User`+`Asset`, one slug per `Asset`/`Creator`/`Collection`).
- Soft deletion where a record must remain referenceable for historical
  integrity (e.g. `Order`, `Review`) rather than hard-deleted.
- Standard audit fields (`created_at`, `updated_at`, and `created_by`
  where relevant) on every table.
- Human-readable slugs for all public-facing entities (`Asset`, `Creator`,
  `Collection`) — see [11.7 URL Design](./11-screens-ux-catalog.md#117-url-design).
