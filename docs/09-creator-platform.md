# 09. Creator Platform

## 9.1 Creator dashboard

Route namespace: `creator/`

```
creator/
├── dashboard
├── assets
├── upload
├── drafts
├── published
├── analytics
├── earnings
├── payouts
├── orders
├── profile
└── settings
```

Dashboard metrics surfaced to every creator:

```
Revenue
Downloads
Views
Favorites
Conversion rate
Top assets
Traffic
Earnings
```

## 9.2 Asset upload system

The upload workflow is a first-class piece of product design, not an
afterthought form. Required capabilities:

```
drag & drop
multi-file upload
large file support
resumable uploads
upload progress
pause / resume
metadata editing
thumbnail generation
preview generation
validation
content moderation submission
draft state
publish state
```

Upload UX states map directly onto the asset lifecycle in
[05.4](./05-domain-model.md#54-asset-lifecycle):

```
UPLOADING → PROCESSING → DRAFT → UNDER_REVIEW → APPROVED → PUBLISHED → ARCHIVED
```

## 9.3 Media processing pipeline

Large media is never processed synchronously inside a web request. The
pipeline is asynchronous end-to-end:

```
Upload
  ↓
Object Storage
  ↓
Queue
  ↓
Media Processor
  ↓
Thumbnail Generator
  ↓
Preview Generator
  ↓
Metadata Extraction
  ↓
Moderation
  ↓
Search Index
  ↓
CDN
```

The creator-facing UI reflects pipeline progress (`PROCESSING` state)
without blocking, and the upload widget polls/subscribes for state changes
rather than holding a request open.

## 9.4 Digital delivery

Original private assets are never exposed directly to any client.

```
private object storage
  +
signed URLs
  +
CDN
  +
download authorization
  +
license verification
```

Every download is tracked as an event and gated end-to-end:

```
Purchase
  ↓
License validation
  ↓
Download authorization
  ↓
Signed URL
  ↓
CDN
  ↓
Download event
```

See also [08.7](./08-commerce-licensing-payments.md#87-order-integrity--entitlement)
and the security requirement that authorization is always verified
server-side ([13.4](./13-non-functional-requirements.md#134-security)).

## 9.5 Creator earnings & payouts

`CreatorPayout` records ([05.3](./05-domain-model.md#creatorpayout)) are
derived from completed, non-refunded `Order`/`Payment` records attributable
to that creator's assets, net of platform fees. The creator dashboard's
Earnings and Payouts sections surface:

- Running balance and payout history
- Per-asset revenue breakdown
- Pending vs. paid amounts
- Refund/adjustment transparency (see
  [08.8 Refunds & Disputes](./08-commerce-licensing-payments.md#88-refunds--disputes))

## 9.6 Creator profile & public presence

Every creator has a public profile (`/creator/{username}`, see
[11.7 URL Design](./11-screens-ux-catalog.md#117-url-design)) that
functions as a portfolio: published assets, follower/following (via
`follow-creator` feature), ratings/reviews summary, and a bio. This is the
same `CreatorHeader`/`CreatorProfile` organism referenced in
[04.5](./04-atomic-design-system.md#45-organisms) and
[03.3](./03-fsd-layers.md#33-widgets-layer-widgets).

## 9.7 Review queue (creator-facing)

Creators see the moderation status of their own submissions (`DRAFT` →
`UNDER_REVIEW` → `APPROVED`/rejected) without visibility into internal
moderation tooling — the creator-facing review queue is a read view over
the same `ModerationRecord` data the admin platform manages in
[10.2 Moderation](./10-admin-platform.md#102-moderation).
