# 11. Screens & UX Catalog

This document catalogs every screen the product must ship, the homepage's
required structure, navigation behavior, URL conventions, and the
loading/empty/error state requirements that apply across all of them.

## 11.1 Screen inventory

### Public

```
Homepage
Marketplace
Search
Category
Asset Detail
Creator Profile
Collections
Pricing
About
Contact
FAQ
```

### Customer

```
Login
Register
Forgot Password
Account
Purchases
Downloads
Favorites
Collections
Subscription
Billing
Notifications
Settings
```

### Creator

```
Creator Dashboard
Upload
Asset Manager
Asset Editor
Drafts
Review Queue
Analytics
Revenue
Payouts
Profile
Settings
```

### Admin

```
Admin Dashboard
Users
Creators
Assets
Moderation
Categories
Licenses
Orders
Payments
Subscriptions
Reports
Analytics
System Settings
```

Each screen above is a `pages/*` slice per [03.2](./03-fsd-layers.md#32-pages--pages-layer),
composed from the `widgets/*` inventory in
[03.3](./03-fsd-layers.md#33-widgets-layer-widgets).

## 11.2 Homepage structure

The homepage must communicate the product within seconds. Required section
order:

```
Header
  ↓
Immersive Hero
  ↓
Featured Search
  ↓
Trending Assets
  ↓
Popular Categories
  ↓
Editorial Collections
  ↓
Featured Creators
  ↓
Trending Videos
  ↓
Popular Images
  ↓
New Arrivals
  ↓
AI / Smart Discovery
  ↓
Creator CTA
  ↓
Pricing / Subscription
  ↓
Footer
```

## 11.3 Customer account area

Route: `/account`

```
/account
├── overview
├── purchases
├── downloads
├── favorites
├── collections
├── subscriptions
├── licenses
├── billing
├── notifications
└── settings
```

## 11.4 Collections

Users can create and manage collections spanning several use cases:

```
Moodboards
Projects
Favorites
Campaigns
Inspiration
Client Projects
Private Collections
Public Collections
```

Supported interactions: drag-and-drop reordering, sharing, public/private
visibility toggling, with collaborative collections planned as a future
architecture extension (see
[16.1 Phased Roadmap](./16-roadmap-delivery-process.md#161-phased-implementation-plan)) —
the `CollectionItem` schema
([05.3](./05-domain-model.md#download--favorite--collection--collectionitem))
is designed to support multi-editor ownership without a breaking schema
change.

## 11.5 Mobile navigation

Primary mobile navigation (bottom navigation + contextual navigation +
gesture interactions):

```
Home
Explore
Search
Collections
Account
```

Navigation adapts based on authentication state, and exposes
creator-specific navigation when the signed-in user has an active Creator
profile. See [12. Mobile & Hybrid Architecture](./12-mobile-hybrid-architecture.md)
for the full mobile UX and hybrid app requirements, including the key
mobile flows (Discover, Search, Preview, Favorite, Collection, Purchase,
Download, Account).

## 11.6 Responsive asset grid

```
Mobile:  2 columns
Tablet:  3 columns
Desktop: 4–6 columns
Wide:    6–8 columns
```

For masonry-style content, the choice between CSS Grid, CSS columns, or a
virtualized layout is made based on measured performance for the actual
content mix — accessibility is never sacrificed for masonry aesthetics
(tab order and reading order must remain logical regardless of visual
column packing).

## 11.7 URL design

Clean, human-readable URLs throughout; database IDs are never exposed where
a slug is appropriate.

```
/
/marketplace
/images
/videos
/footage
/illustrations
/templates
/creator/{username}
/asset/{slug}
/collection/{slug}
/search?q=...
```

## 11.8 Loading, empty, and error states

Every asynchronous experience needs an intentional, designed state for
each of the following — a generic full-page spinner is treated as a
design gap, not an acceptable default:

```
Skeleton
Spinner
Progress
Blur placeholder
Progressive media
Optimistic state
Empty state
Error state
```

### Empty states

Every list-style surface has a designed empty state, not a blank area:

```
No search results
No favorites
No collections
No downloads
No purchases
No uploaded assets
No notifications
No analytics data
```

Each empty state must explain three things: what happened, why, and what
the user can do next (e.g. "No favorites yet — assets you favorite will
appear here. Browse the marketplace to get started.").

## 11.9 Error states

Every failure mode gets a designed, human-readable treatment — never a raw
error string or stack trace:

```
Asset unavailable
Payment failed
Upload failed
Download failed
Network unavailable
Session expired
Permission denied
Server unavailable
```

These map onto the error taxonomy defined in
[06.3](./06-api-state-architecture.md#63-error-taxonomy).

## 11.10 SEO-friendly asset pages

Every public asset page exposes, and generates dynamic metadata for:

```
title
description
creator
category
tags
license
structured metadata
OpenGraph preview
```

See [13.3 SEO](./13-non-functional-requirements.md#133-seo) for the
site-wide SEO requirements this supports.
