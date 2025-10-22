# Modern Portfolio

A modern portfolio site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Tech Stack

- **Next.js 14** - App Router, SSR, optimized performance
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **D3.js** - Data visualization (skills chart)
- **Playwright** - E2E testing

## Project Structure

```
next-portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── layout/       # Header, Footer, ThemeProvider
│   │   ├── sections/     # Page sections (Hero, About, etc.)
│   │   └── ui/           # Reusable UI components
│   ├── content/          # Static data (skills, about)
│   ├── lib/              # Business logic & utilities
│   │   └── visualization/ # D3 charts
│   └── types/            # TypeScript type definitions
├── tests/                # E2E tests with Playwright
├── config/               # Configuration files
├── tools/                # Development tools (Nx, Madge)
├── scripts/              # Build & validation scripts
└── public/               # Static assets
```

## Development Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm test                 # Run E2E tests
npm run test:ui          # Run tests with UI mode
npm run test:headed      # Run tests with visible browser

# Code Quality
npm run lint             # Run ESLint

# Dependency Visualization
npm run dep-graph        # Generate Nx dependency graph
npm run serve:tools      # Serve tools at localhost:8000
```

## Testing

E2E tests are located in `tests/e2e/`. Tests run automatically in CI/CD before deployment.

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm test

# Run specific test
npx playwright test tests/e2e/home.spec.ts
```

See [tests/README.md](tests/README.md) for more details.

## Validate Before Push

Ensure your changes will pass CI/CD:

```bash
./scripts/validate-ci.sh
```

This runs the same checks as GitHub Actions:
1. Install dependencies
2. Install Playwright browsers
3. Run all tests
4. Build application
5. Verify output

See [scripts/README.md](scripts/README.md) for more options including using `act`.

## Dependency Visualization

View project dependencies using Nx or Madge:

```bash
# Generate and view Nx dependency graph
npm run dep-graph

# Or serve tools directory and open in browser
npm run serve:tools
# Open http://localhost:8000/nx/nx-dep-graph.html
# Open http://localhost:8000/nx/madge-deps.html
```

See [tools/README.md](tools/README.md) for more details.

## Deployment

Deploys automatically to GitHub Pages when pushing to `main` branch.

**CI/CD Pipeline:**
1. ✅ Run E2E tests (must pass)
2. ✅ Build Next.js site (must succeed)
3. ✅ Deploy to GitHub Pages

Manual deployment:
```bash
npm run build
npm run export
```

## Features

- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Interactive skills visualization
- ✅ SEO optimized
- ✅ Type-safe with TypeScript
- ✅ E2E tested with Playwright

## License

MIT
