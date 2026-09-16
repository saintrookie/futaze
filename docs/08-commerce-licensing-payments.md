# 08. Commerce, Licensing & Payments

## 8.1 Licensing system

Licensing is modeled as a first-class domain entity (`entities/license`),
never as UI-embedded logic. See [05.3](./05-domain-model.md#license--price)
for the schema-level view.

License tiers:

```
personal
commercial
extended
editorial
enterprise
```

Each tier carries its own usage terms and eligibility rules. A dedicated
domain/service layer resolves "what can this user do with this asset under
this license" — UI components render the answer, they never compute it.

## 8.2 Monetization models

The platform supports multiple, coexisting monetization models:

```
single purchase
subscription
credits
bundles
enterprise licensing
creator-exclusive pricing
```

## 8.3 Pricing UX requirements

Every pricing surface must answer three questions unambiguously before a
user commits to a purchase:

```
What do I get?
What can I use it for?
What are the limitations?
```

This applies to the asset detail pricing panel, the pricing page, and the
checkout license-selection step equally.

## 8.4 Payment architecture

Payment provider implementation is kept fully abstract behind a service
interface:

```
PaymentService
├── createPayment()
├── authorizePayment()
├── capturePayment()
├── refundPayment()
└── verifyWebhook()
```

Provider adapters (interchangeable, swappable, addable):

```
Stripe
Xendit
Midtrans
PayPal
```

Business logic — order creation, license entitlement, download
authorization — never depends directly on a specific provider's SDK or API
shape. It depends only on `PaymentService`. Adding a new provider means
adding a new adapter, with zero changes to checkout, order, or entitlement
logic.

## 8.5 Checkout flow

```
Asset
  ↓
License selection
  ↓
Cart
  ↓
Checkout
  ↓
Payment
  ↓
Success
  ↓
Download
```

Checkout is optimized for conversion and must support:

```
guest checkout (where appropriate)
authenticated checkout
coupons
tax calculation
invoicing
multiple payment methods
subscription checkout
order confirmation
```

Per the UX principles in
[01.3](./01-product-vision.md#13-core-ux-principles), checkout mechanics
are never manipulative — no forced continuity into a subscription, no
hidden fees revealed only at the final step, no artificial urgency
messaging not grounded in a real constraint.

## 8.6 Subscriptions

Subscriptions generate recurring `Order`/`Payment` records
([05.3](./05-domain-model.md#order--orderitem--payment--subscription)) and
may grant periodic download credits rather than (or in addition to)
unlimited access, depending on plan design. Subscription state, billing
cycle, and entitlement are managed through the same `PaymentService`
abstraction as one-off purchases — there is no separate, parallel payment
path for subscriptions.

## 8.7 Order integrity & entitlement

Every download is gated by a server-side entitlement check, never a
client-side assumption:

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

This mirrors the digital delivery pipeline in
[09.4](./09-creator-platform.md#94-digital-delivery) and the security
requirement in
[13.4 Security](./13-non-functional-requirements.md#134-security) that
frontend authorization is never trusted.

## 8.8 Refunds & disputes

Refunds are issued through `PaymentService.refundPayment()`, and a refund
event:

- Reverses the associated `OrderItem`'s download entitlement going
  forward (already-downloaded files are not "un-downloaded," but future
  authorization checks respect the refund).
- Is reflected in creator payout calculations
  ([09.5](./09-creator-platform.md#95-creator-earnings--payouts)) for the
  relevant payout period.
- Is visible to admins in the operational dashboard
  ([10.1](./10-admin-platform.md#101-admin-dashboard-metrics)).
