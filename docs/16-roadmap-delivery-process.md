# 16. Roadmap & Delivery Process

## 16.1 Phased implementation plan

The system is not built simultaneously across all surfaces. It is built in
phases, each producing a coherent, testable increment.

### Phase 1 — Foundation
```
monorepo
FSD structure
design system
design tokens
routing
authentication
API client
responsive system
base UI (atoms/molecules)
```

### Phase 2 — Marketplace
```
assets
categories
search
filters
asset cards
asset detail
creator profiles
favorites
collections
```

### Phase 3 — Commerce
```
cart
checkout
payments
licenses
orders
downloads
subscriptions
```

### Phase 4 — Creator
```
upload
media processing
publishing
analytics
earnings
payouts
```

### Phase 5 — Admin
```
moderation
users
creators
assets
orders
payments
analytics
```

### Phase 6 — Hybrid
```
mobile application
push notifications
deep linking
offline awareness
native integrations
```

### Phase 7 — Intelligence
```
semantic search
recommendations
visual search
AI tagging
smart discovery
```

Each phase builds strictly on the FSD boundaries established in Phase 1 —
later phases (e.g. Phase 7's AI features) plug into the
`entities`/`features` boundaries and the AI-isolation pattern in
[07.7](./07-search-discovery.md#77-ai-powered-discovery-forward-architecture)
without requiring changes to earlier phases' code.

## 16.2 Future capabilities the architecture must not block

The following must be addable later without breaking existing FSD
boundaries:

```
AI Search
Visual Search
Subscriptions
Enterprise
Teams
Collaboration
Creator Tools
Mobile
Desktop
API Marketplace
Digital Rights Management
Recommendation Engine
```

This is the practical test of the architecture's success: none of the
above should require restructuring `entities`, `features`, or the
dependency direction defined in
[02.2](./02-system-architecture.md#22-dependency-direction-non-negotiable).

## 16.3 Definition of Done

A feature is not complete until every item below is true:

```
✓ UX defined
✓ Responsive UI implemented
✓ FSD layer correctly assigned
✓ Atomic components reused (not duplicated)
✓ Design tokens used (no hardcoded values)
✓ API integrated via packages/api-client
✓ Loading state implemented
✓ Empty state implemented
✓ Error state implemented
✓ Accessibility implemented (WCAG 2.2 AA)
✓ SEO considered (where the surface is public/indexable)
✓ Performance optimized
✓ Security reviewed
✓ Tests implemented (unit/component/integration/E2E as applicable)
✓ TypeScript strict, no `any`
✓ No architectural (FSD boundary) violations
✓ No unnecessary duplication
✓ Production-quality UI (13.6 UI Quality Bar)
```

## 16.4 Priority ordering

When trade-offs are required, priority is resolved in this fixed order:

```
Architecture → UX → UI → Performance → Accessibility → Security → Testing → Maintainability
```

Architectural scalability is never sacrificed to make a first
implementation faster — a feature that violates FSD boundaries to ship
sooner is not considered done, regardless of how it looks or performs.

## 16.5 Architectural review checklist

Applied after implementation of any significant feature or phase:

### FSD
- Are layer boundaries respected (§[02.2](./02-system-architecture.md#22-dependency-direction-non-negotiable), §[14.4](./14-engineering-practices.md#144-fsd-boundary-enforcement))?
- Are all dependencies valid (no upward imports)?
- Are business rules located in the correct layer (never in `shared`)?

### Atomic Design
- Are components genuinely reusable, or one-off?
- Are atoms free of domain-specific logic?
- Are molecules compositional rather than duplicated?
- Are organisms meaningful compositions, not arbitrary groupings?

### UX
- Is the user journey intuitive end-to-end?
- Is search fast and forgiving?
- Is purchase friction minimized without dark patterns?

### UI
- Is spacing consistent (token-driven)?
- Is typography consistent?
- Are responsive layouts deliberate, not shrunk desktop layouts?

### Performance
- Are media assets optimized and CDN-delivered?
- Are grids virtualized where the dataset warrants it?
- Is JavaScript minimized (server components favored by default)?

### Accessibility
- Keyboard navigable?
- Screen-reader tested?
- Sufficient contrast?
- Visible focus states?
- `prefers-reduced-motion` respected?

### Security
- Is authorization verified server-side for every sensitive action?
- Are downloads signed-URL gated?
- Is upload input validated server-side?
- Is payment webhook verification in place?
