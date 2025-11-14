# ROMI Calculator

A lightweight static React app that models Return on Marketing Investment (ROMI). Adjust spend, revenue, gross margin, and supporting costs to instantly see ROMI percentage, multiples, required break-even revenue, and contribution across multiple stress scenarios.

## Available scripts

Inside `romi-calculator` you can run:

- `npm install` – install dependencies
- `npm run dev` – start the Vite dev server
- `npm run build` – type-check and produce an optimized production build under `dist/`
- `npm run preview` – preview the production build locally
- `npm run test` – execute the Vitest suite (focused on the ROMI math helpers)

## Testing approach

- Tests live under `tests/` per repository guidance
- Vitest runs in Node environment and type-checks with `tsconfig.vitest.json`
- Coverage reports are generated via V8 (text + lcov) to help satisfy coverage gates

## Tech stack

- React 19 with TypeScript
- Vite 7 for bundling and local dev
- Custom calculator utilities with dedicated unit tests
