# 06. API & State Architecture

## 6.1 Typed API client

A single typed API client (`packages/api-client`) is the only way any
`apps/*` code talks to the backend. It is organized by domain:

```
api/
├── auth
├── assets
├── search
├── creators
├── collections
├── purchases
├── downloads
├── payments
├── subscriptions
├── reviews
├── notifications
└── analytics
```

Rules:

- Every request/response is validated against a strict schema (Zod).
  External API data is never trusted blindly — a malformed response is
  treated as an error, not silently coerced.
- Feature/entity slices call into `api-client`; they never construct raw
  fetch calls directly.
- `entities/*/api` wraps read access to that entity; `features/*/api` wraps
  the specific mutation the feature performs. Both ultimately call
  `packages/api-client`.

## 6.2 State categories

State is explicitly separated into three categories, each with a single
designated tool. Mixing these (e.g. storing server data in client state) is
an architectural violation.

### Server state — TanStack Query

Used for anything that originates from the backend and can go stale:
assets, search results, profile data, purchases, recommendations.

Provides: caching, background refetching, request deduplication,
pagination/infinite-query support, and optimistic updates where
appropriate (e.g. favoriting an asset).

### Client (UI) state — lightweight local/global store (e.g. Zustand)

Used only for state with no server representation:

```
UI state (modals, panels open/closed)
filter draft state (before applied to the URL)
media player state (playback position, volume)
temporary preferences (view density, grid vs. list)
```

Kept as narrowly scoped as possible — most client state should live in
component state, not a global store. A global store is reserved for state
genuinely needed across distant parts of the tree.

### URL state

Discovery-critical state is kept in the URL, not client state:

```
/search?q=cinematic&category=footage&sort=popular
```

This enables sharing, bookmarking, SEO indexing, and correct
back/forward browser navigation. Any filter, sort, or search-query state
that a user would expect to survive a page reload or a shared link belongs
here, not in a client store.

## 6.3 Error taxonomy

A consistent, typed error hierarchy is used across the client and surfaced
consistently in UI (see [11.9 Error States](./11-screens-ux-catalog.md#119-error-states)):

```
NetworkError
AuthenticationError
AuthorizationError
ValidationError
PaymentError
UploadError
DownloadError
NotFoundError
RateLimitError
ServerError
```

Handling rules:

- Every error type maps to a user-friendly UI treatment — never a raw
  stack trace or backend error string.
- Every error is logged with technical detail server-side/in the
  observability pipeline (see
  [15.2 Observability](./15-infrastructure-operations.md#152-observability)),
  independent of what the user sees.
- Errors that are plausibly transient (network, rate limit, some server
  errors) get a retry affordance; errors that are not (authorization,
  validation) do not.
- Fallback UI states exist for every error type, not just a generic
  "Something went wrong."

## 6.4 Loading & optimistic UI

Every asynchronous interaction has an intentional loading treatment — see
the full catalog in
[11.8 Loading States](./11-screens-ux-catalog.md#118-loading--empty--error-states).
In summary: skeletons over spinners wherever layout is predictable,
optimistic UI for low-risk, easily reversible actions (favoriting), and
explicit progress UI for high-latency actions (upload, checkout,
processing).

## 6.5 Validation

`packages/validation` holds the canonical Zod schemas shared between:

- Client-side form validation (via React Hook Form + Zod resolvers)
- API request/response validation in `api-client`
- Any server-side validation that mirrors the same business rules

This ensures a single source of truth for "what a valid Asset upload looks
like" / "what a valid checkout payload looks like," rather than
re-implementing the same rules per surface.
