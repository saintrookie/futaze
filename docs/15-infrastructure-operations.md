# 15. Infrastructure & Operations

## 15.1 Storage & CDN architecture

Object storage, not the relational database, holds all media. Large media
files are never stored directly in Postgres.

```
Object Storage
  ↓
CDN
  ↓
Application
```

Storage is segmented by purpose:

```
original assets   (private — never exposed directly)
preview assets     (public, CDN-fronted)
thumbnail assets     (public, CDN-fronted)
derived assets         (public or private depending on purpose)
private files            (never exposed directly)
```

### Public preview delivery

```
User → CDN → Object Storage
```

### Private/download delivery

```
User → Application authorization → Signed CDN URL → Asset
```

This is the same pipeline described in
[09.4 Digital Delivery](./09-creator-platform.md#94-digital-delivery) and
is a hard security requirement, not an optimization
([13.4 Security](./13-non-functional-requirements.md#134-security)).

## 15.2 Observability

Required instrumentation:

```
structured logging
error tracking
performance monitoring
analytics (see 05.5 / 10.3)
distributed tracing
health checks
```

Specifically monitored:

```
API latency
search latency
upload processing time
download errors
payment failures
CDN performance
queue failures
```

Observability data feeds the admin platform's audit-log and metrics
surfaces ([10.1](./10-admin-platform.md#101-admin-dashboard-metrics),
[10.2](./10-admin-platform.md#102-moderation)) and is the mechanism by
which the error taxonomy in
[06.3](./06-api-state-architecture.md#63-error-taxonomy) is triaged
server-side independent of what end users see.

## 15.3 Environment configuration

Strict separation of:

```
development
staging
production
```

No secret is ever hardcoded. Environment configuration governs:

```
API URL
storage credentials/endpoints
CDN configuration
payment provider credentials
analytics configuration
search engine endpoint/credentials
authentication configuration
feature flags
```

Configuration is centralized in `packages/config`
([02.3](./02-system-architecture.md#23-monorepo-strategy)) and consumed
consistently by every `apps/*` target.

## 15.4 Feature flags

A feature flag architecture supports gradual, reversible rollout of new
capabilities:

```
AI_SEARCH
SEMANTIC_SEARCH
NEW_CHECKOUT
CREATOR_ANALYTICS_V2
COLLABORATIVE_COLLECTIONS
```

Flags are resolved through `packages/config`, allowing a capability to be
enabled per-environment, per-cohort, or platform-wide without a code
deploy — this is the mechanism that lets Phase 7 intelligence features
([16.1](./16-roadmap-delivery-process.md#161-phased-implementation-plan))
ship dark and roll out gradually.

## 15.5 CI/CD

CI/CD gates every merge on:

```
type checking (TypeScript strict)
lint (including FSD boundary rules, 14.4)
automated test suites (14.1)
build success across all apps/* targets
```

Deployment promotes through `development → staging → production` per
§15.3, with no direct-to-production path that bypasses staging validation.
