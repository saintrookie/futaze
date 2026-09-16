# 10. Admin Platform

The admin platform is a serious operational tool, not a stripped-down
internal CRUD screen — the team running the marketplace depends on it daily.

## 10.1 Admin dashboard metrics

```
GMV
Revenue
Orders
Downloads
Active users
New users
Creators
Assets
Conversion
Subscription revenue
Creator payouts
Refunds
```

Required dashboard capabilities: charts, filters, tables, search, export,
and audit logs — every metric must be filterable by date range and, where
relevant, by category/creator/geography.

## 10.2 Moderation

Moderation operates on the `Report` and `ModerationRecord` entities
([05.3](./05-domain-model.md#report--moderationrecord)) and drives the
`UNDER_REVIEW` → `APPROVED`/rejected transition in the
[asset lifecycle](./05-domain-model.md#54-asset-lifecycle).

The moderation queue surfaces:

- Assets awaiting first review (`UNDER_REVIEW`)
- User-submitted reports against already-published assets
- Full decision history per asset (append-only `ModerationRecord`)
- Reviewer accountability (who made which decision, when)

Every moderation decision is auditable — this feeds the audit log
requirement in [10.1](#101-admin-dashboard-metrics) and the observability
requirements in
[15.2](./15-infrastructure-operations.md#152-observability).

## 10.3 Analytics

The admin platform is the primary consumer of the `AnalyticsEvent` log
([05.5](./05-domain-model.md#55-analytics-event-catalog)):

```
asset_viewed, asset_previewed, asset_favorited, asset_added_to_collection,
creator_viewed, search_performed, filter_used, checkout_started,
purchase_completed, download_started, download_completed,
subscription_started
```

The analytics architecture is built to accommodate future product
analytics tool integrations without a schema migration — event ingestion
is decoupled from any single analytics vendor.

## 10.4 Admin screen inventory

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

Each list-style screen (`Users`, `Creators`, `Assets`, `Orders`, etc.)
follows the same operational pattern: searchable/filterable table, bulk
actions where safe, drill-down into a detail view, and an audit trail of
changes made from that screen.

## 10.5 Access control

Admin platform access is role-gated at the routing/`app` layer
(authentication *initialization* lives in `app/providers`, per
[03.1](./03-fsd-layers.md#31-app--application-layer)), with authorization
for any mutating admin action re-verified server-side — consistent with
the platform-wide rule that frontend authorization is never trusted
([13.4 Security](./13-non-functional-requirements.md#134-security)).
