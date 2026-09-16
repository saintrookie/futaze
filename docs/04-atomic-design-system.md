# 04. Atomic Design System

The Atomic Design system lives entirely inside `shared/ui/` and
`shared/design-system/`. It is domain-agnostic by construction: nothing in
this document ever references marketplace concepts like "asset" or
"creator" by name inside a generic component.

```
shared/
└── ui/
    ├── atoms/
    ├── molecules/
    ├── organisms/
    ├── primitives/
    └── patterns/
```

## 4.1 Design tokens

All visual decisions route through tokens — no hardcoded colors, spacing,
radii, or shadows anywhere in the codebase outside `design-system/`.

Token categories:

```
colors
typography
spacing
radius
shadows
borders
motion
z-index
breakpoints
container sizes
```

Delivered as CSS custom properties, e.g.:

```css
--color-background
--color-foreground
--color-primary
--color-muted
--color-border

--space-xs
--space-sm
--space-md
--space-lg
--space-xl

--radius-sm
--radius-md
--radius-lg

--shadow-sm
--shadow-md
--shadow-lg
```

Tokens are the single source of truth consumed by Tailwind theme
configuration, so both utility classes and any raw CSS in `shared/ui`
resolve to the same values.

## 4.2 Visual direction

The visual language is original — not a clone of any category incumbent —
and is guided by:

```
Minimal + Editorial + Immersive + High contrast + Premium + Digital-native
```

Principles:

- Large visual assets are the primary content on any screen; UI chrome
  recedes.
- Whitespace is used intentionally, not as filler.
- Avoid excessive cards, borders, gradients, and decorative UI — every
  visual embellishment must have a functional reason (see
  [13. Non-Functional Requirements](./13-non-functional-requirements.md)
  for the full UI quality bar).

## 4.3 Atoms

The smallest, fully generic, reusable UI elements. No domain-specific
business logic. Fully accessible, with consistent variants, always
token-driven.

```
Button, Icon, Input, Label, Badge, Avatar, Checkbox, Radio, Switch,
Divider, Spinner, Skeleton, Tooltip, Text, Heading, Image, Price
```

Naming rule: atoms are named for what they *are*, never for what they're
*used for*.

- Bad: `PurchaseAssetButton`
- Good: `Button` (used, with props, inside `features/purchase-asset`)

## 4.4 Molecules

Atoms combined into small, meaningful, still domain-agnostic components.

```
SearchInput, PriceDisplay, UserIdentity, RatingDisplay, AssetMetadata,
FilterChip, Pagination, DownloadButton, CreatorIdentity, Breadcrumbs
```

Example composition:

```
AssetMetadata
├── Icon
├── Text
├── Badge
└── Tooltip
```

Note: some molecule names above (`AssetMetadata`, `CreatorIdentity`) read as
domain-specific but are structurally generic — they render whatever
metadata/identity fields they're given as props, with no marketplace
business rules embedded. If a molecule needs to *know* marketplace rules
(e.g. "hide price for out-of-stock license tiers"), that logic moves up to
an `entities` or `features` component instead.

## 4.5 Organisms

Large, reusable interface structures assembled from atoms and molecules.

```
AssetCard, AssetGallery, SearchBar, FilterSidebar, Header, CreatorHeader,
CheckoutPanel, AssetDetailsPanel, ReviewList, NavigationMenu
```

Organisms may be *aware* of entity shapes (e.g. `AssetCard` knows the shape
of an Asset), but generic shared organisms must not encode
marketplace-specific *business rules* (pricing logic, licensing
eligibility, moderation state transitions). Business rules attach to the
`entities/asset` and `features/*` versions that consume these organisms,
per the FSD boundary in [03](./03-fsd-layers.md).

## 4.6 Primitives & Patterns

- `primitives/` — the lowest-level rendering building blocks the design
  system is built from (e.g. box/stack/grid layout primitives, visually
  hidden helpers, focus-trap utilities). Everything else in `shared/ui` is
  built on these.
- `patterns/` — cross-cutting UI patterns that aren't a single component
  (e.g. a standard empty-state pattern, a standard error-state pattern —
  see [13.6](./13-non-functional-requirements.md)) that many
  molecules/organisms plug into for consistency.

## 4.7 Component governance

Every component in the design system must document:

```
variants
sizes
states
accessibility behavior
responsive behavior
usage documentation
usage examples
```

Reference example:

```
Button
  variants: primary, secondary, outline, ghost, destructive
  sizes:    xs, sm, md, lg, xl
  states:   default, hover, active, focus, disabled, loading
```

## 4.8 Component naming conventions

Prefer descriptive, purpose-clear names:

```
AssetCard, AssetPreview, AssetMetadata, CreatorAvatar, SearchInput, FilterPanel
```

Avoid ambiguous or versioned names:

```
Box1, CardNew, ComponentTest, Thing, Wrapper2
```

## 4.9 Component reuse rule

Before creating a new component:

1. Search the existing design system for something that already covers the
   need.
2. Determine whether an existing component can be extended (new variant,
   new prop) rather than duplicated.
3. Only create a new component when its semantic responsibility is
   genuinely different from anything that exists.

This prevents proliferation such as `Button`, `Button2`, `PrimaryButton`,
`NewButton`, `CustomButton` where a single `Button` system, correctly
extended, is sufficient.

## 4.10 Motion system

A small, deliberate set of motion tiers:

```
micro   — state feedback (hover, press)
fast     — local transitions (dropdown open, tab switch)
normal    — navigation-level transitions
slow       — large layout/content transitions
```

Motion always communicates something: hierarchy, navigation, a state
change, feedback, or discovery — never decoration for its own sake.
`prefers-reduced-motion` is respected everywhere motion is used; see
[13.1 Accessibility](./13-non-functional-requirements.md#131-accessibility).
