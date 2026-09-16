# Futaze

A digital asset marketplace built with React and Vite.

## Tech Stack

- React 18 + Vite
- React Router
- Zustand (state management)
- TanStack Query (data fetching)
- React Hook Form + Zod (forms & validation)
- Tailwind CSS + Radix UI primitives

## Project Structure

The codebase follows a feature-sliced structure:

```
src/
  app/        # app entrypoints, providers, router, global styles
  pages/      # route-level pages (home, marketplace, checkout, account, ...)
  widgets/    # composite UI blocks made of features/entities
  features/   # user-facing actions (auth, upload-asset, purchase-asset, ...)
  entities/   # core domain models (asset, creator, order, payout, ...)
  shared/     # reusable UI kit, utils, and config
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```
