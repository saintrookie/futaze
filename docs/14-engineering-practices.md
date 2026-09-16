# 14. Engineering Practices

## 14.1 Testing strategy

Four layers of testing, each with a distinct scope:

### Unit tests
For: utilities, hooks, domain logic, validators (`packages/utilities`,
`packages/validation`, entity `model/selectors.ts` files).

### Component tests
For: buttons, cards, forms, filters, dialogs — the `shared/ui` design
system and `entities/*/ui` components.

### Integration tests
For: search, checkout, authentication, downloads — flows that cross
multiple features/entities within one surface.

### End-to-end tests
For complete user journeys:

```
registration
login
search
asset preview
favorite
purchase
download
creator upload
creator publishing
admin moderation
```

## 14.2 Code quality tooling

```
TypeScript strict mode
ESLint
Prettier
lint-staged
Husky (pre-commit hooks)
automated test suites in CI
type checking in CI
CI/CD pipeline gating merges
```

Disallowed, and enforced by lint rules where possible:

```
`any` type
unused imports
dead code
duplicated components
magic numbers
unnecessary abstraction layers
```

Premature abstraction is treated as a defect, not a virtue — code is
generalized when a second real use case appears, not speculatively.

## 14.3 Component reuse rule

Before adding a new component to the design system:

1. Search `shared/ui` (and `packages/ui`) for something that already
   solves the need.
2. Determine whether an existing component can be extended (new variant or
   prop) instead of duplicated.
3. Only create a new component when the semantic responsibility is
   genuinely, provably different.

This is the mechanism that prevents drift like `Button`, `Button2`,
`PrimaryButton`, `NewButton`, `CustomButton` — see
[04.9](./04-atomic-design-system.md#49-component-reuse-rule).

## 14.4 FSD boundary enforcement

The dependency rules in
[02.2](./02-system-architecture.md#22-dependency-direction-non-negotiable)
are enforced with tooling, not convention alone — architecture linting
(ESLint rules or an equivalent architecture-boundary tool) fails CI on any
disallowed import, including:

```
shared   importing from features   ✗
entities importing from features   ✗
features importing from pages      ✗
entities importing from widgets    ✗
```

Circular dependencies at any layer fail CI unconditionally.

## 14.5 Component & slice naming

Naming conventions apply uniformly to both FSD slices and Atomic Design
components.

Prefer descriptive, purpose-clear names:

```
AssetCard, AssetPreview, AssetMetadata, CreatorAvatar, SearchInput, FilterPanel
```

Avoid ambiguous, versioned, or placeholder names:

```
Box1, CardNew, ComponentTest, Thing, Wrapper2
```

Feature slices are named for the user action they represent
(`purchase-asset`, `favorite-asset`, `apply-license`), never for the
component that implements them.

## 14.6 Development workflow (working in an existing codebase)

Before writing new code in an established repository:

1. Analyze the existing repository structure.
2. Identify the existing architecture as actually implemented (not just as
   documented).
3. Identify existing components that may already solve the problem.
4. Identify existing dependencies already available in the monorepo.
5. Identify reusable design patterns already in use.
6. Identify technical debt relevant to the task at hand.
7. Identify missing architecture the task will need to introduce.
8. Produce an implementation plan before writing code.

Full project rewrites are avoided; existing, working code is preserved.
Refactoring is undertaken only when justified by a concrete need (a new
feature the current structure can't accommodate, a defect traceable to the
structure itself — not aesthetic preference).

## 14.7 Per-feature workflow

Every feature, before being considered ready for review, passes through
these steps in order:

1. Define the user problem.
2. Define the UX flow.
3. Define the domain model impact.
4. Determine the correct FSD layer(s) — see
   [03.7 Layer decision checklist](./03-fsd-layers.md#37-layer-decision-checklist).
5. Determine which Atomic Design components are required/reusable.
6. Implement API integration (via `packages/api-client`).
7. Implement loading states.
8. Implement error states.
9. Implement empty states.
10. Implement responsive behavior.
11. Implement accessibility.
12. Implement tests (per §14.1).
13. Review architecture against §14.4's boundary rules.

This is the operational counterpart of the
[Definition of Done](./16-roadmap-delivery-process.md#163-definition-of-done)
in the roadmap document.
