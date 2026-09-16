# 07. Search & Discovery

Search and discovery are core product surfaces, not a secondary feature —
this section documents the marketplace browsing experience, the search
system, the asset card, the asset detail page, and the recommendation
engine.

## 7.1 Marketplace routes

Primary route: `/marketplace`

Category routes:

```
/images
/videos
/footage
/illustrations
/vectors
/audio
/templates
/3d
/fonts
```

Each supports dynamic filtering, sorting, and search over:

```
categories, tags, pricing, license, orientation, resolution, duration,
file type, creator, color, style, popularity, date, AI-generated status
```

## 7.2 Search system

Search must support multiple retrieval modes:

```
keyword search
semantic search
tag search
creator search
category search
visual similarity
autocomplete
search suggestions
recent searches
trending searches
```

Result presentation modes:

```
grid
masonry
large preview
compact list
```

### Performance requirements

Search must feel instantaneous. Required techniques:

- Debounced query input
- Response caching (client and edge/CDN where applicable)
- Pagination and, where appropriate, infinite scroll
- List/grid virtualization for large result sets
- Skeleton loading (never a blank screen or full-page spinner)
- Optimistic UI for filter toggles that don't require a full refetch

### Search architecture (backend)

Relational storage (PostgreSQL) is not relied upon for search at scale — no
`LIKE`-query search in production. A dedicated search engine sits alongside
Postgres:

```
Candidates: OpenSearch, Elasticsearch, Typesense, Meilisearch
```

The search engine is expected to support, incrementally per the roadmap
([16. Roadmap](./16-roadmap-delivery-process.md)):

```
full text
facets
filters
ranking
autocomplete
semantic search
vector similarity
```

The search index is kept in sync via the media processing pipeline (an
asset only enters the index once it reaches `PUBLISHED` —
see [5.4 Asset Lifecycle](./05-domain-model.md#54-asset-lifecycle) and
[9.3 Media Processing Pipeline](./09-creator-platform.md#93-media-processing-pipeline)).

## 7.3 Asset Card

The Asset Card (`entities/asset` organism, composed from `shared/ui`
atoms/molecules) is one of the most-rendered, highest-leverage components
in the product.

Must support:

```
thumbnail, video preview, hover preview, play button, favorite,
add-to-collection, creator identity, title, asset type, resolution,
duration, price, license badge, status badges
```

Interaction model:

- **Desktop:** hover → preview (video/motion assets begin a lightweight
  preview on hover; images may show alternate crops or a short loop).
- **Mobile:** tap → preview (no hover state exists; tapping opens a preview
  affordance rather than immediately navigating away, unless the card is
  already in a preview-first context).

Media handling constraints:

- Never autoplay heavy video unnecessarily — previews use lightweight,
  size-capped proxies, not the original file.
- Poster images for all video content.
- Lazy loading and Intersection Observer–gated media loading so off-screen
  cards never load media.
- Adaptive/responsive media sources sized to the card's actual rendered
  size and viewport.

## 7.4 Asset Detail Page

Route: `/asset/{slug}`

Structure:

```
Breadcrumb
  ↓
Asset Viewer
  ↓
Asset Information
  ↓
Creator
  ↓
License
  ↓
Pricing
  ↓
Purchase / Download
  ↓
Metadata
  ↓
Tags
  ↓
Reviews
  ↓
Related Assets
  ↓
More From Creator
  ↓
Recommended Assets
```

Viewer requirements:

```
image zoom
fullscreen
video playback
resolution switching
preview watermark
keyboard controls
touch gestures
```

The viewer is a shared media-player primitive (see
[07.6](#76-media-player-architecture)) parameterized per asset type, not a
one-off component per asset type.

## 7.5 Recommendation engine

Recommendation surfaces required across the product:

```
Recently viewed
Trending
Popular
Similar
For you
More from creator
Related to collection
```

Implemented as a modular recommendation service, callable from any surface
(homepage, asset detail, collections, creator profile) rather than
duplicated per-page logic. Ranking signals may evolve independently of the
surfaces that consume them.

## 7.6 Media player architecture

A single, reusable media infrastructure backs image/video/audio/3D preview
across the whole product (asset cards, asset detail viewer, collections,
creator portfolio).

Video player capability set:

```
poster, play/pause, seek, volume, fullscreen, playback speed, quality
selection, captions, keyboard controls
```

The player is a `shared/ui` organism (or `packages/ui` primitive) — asset
type–specific behavior (e.g. 3D preview controls vs. audio waveform) is
provided via a pluggable adapter, not a fork of the player itself.

## 7.7 AI-powered discovery (forward architecture)

The system is designed so the following can be added without breaking
existing boundaries:

```
semantic search
similar assets
visual search
auto-tagging
auto-categorization
recommendations
smart collections
AI-generated descriptions
```

Constraint: AI features are isolated behind a service/interface boundary.
UI and domain code never couple directly to a specific AI provider or
model — they call a stable internal interface (e.g. a "discovery service"
abstraction), whose implementation can change providers without any change
to `features`, `widgets`, or `pages`. This mirrors the payment provider
abstraction pattern in
[08.4 Payment Architecture](./08-commerce-licensing-payments.md#84-payment-architecture).
