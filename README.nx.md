Nx Quick Usage — dependency graph

1. Install dependencies (already done):

   npm install

2. Open interactive dependency graph:

   npm run dep-graph

   This will start or generate an interactive graph. You can also run:

   npx nx graph

3. Run Nx targets for the app:

   npx nx run portfolio:dev
   npx nx run portfolio:build
   npx nx run portfolio:server

Notes:
- We initialized Nx in minimal mode and added `project.json` pointing at your existing `src` directory. This is intentionally non-destructive to make future migration to an Nx layout simple.
- To migrate to a full Nx monorepo layout later, install `@nrwl/next` (already added) and run the recommended generators.
