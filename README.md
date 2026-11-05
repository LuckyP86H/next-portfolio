# next-portfolio

Paul Xu's portfolio: a single-page, dark-only "Developer Chic" Bento dashboard built with
Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS, Framer Motion
and D3. It deploys to GitHub Pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands

| Command             | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Development server                                              |
| `npm run build`     | Lint, type-check and export the static site to `./out`          |
| `npm run lint`      | ESLint (`next/core-web-vitals` + `next/typescript`)             |
| `npm run typecheck` | `tsc --noEmit`                                                  |
| `npm test`          | Playwright E2E suite (run `npx playwright install` once first)  |

`./scripts/validate-ci.sh` runs the same test-then-build sequence as CI.

## Editing content

Everything a visitor reads lives in `src/content/`:

- `site.ts`: name, role, company, dates, links and location. The header, hero, profile
  panel, footer and contact panel all read from it, so update it in one place.
- `about-me.ts`: the paragraphs in the `about.ts` terminal panel.
- `skills.ts`: radar skills, categories and colors. Keep at least three skills per category.
- `experience.ts`: the `experience.log` timeline.
- `projects.ts`: project cards, code snippets and optional images. Each entry summarises its
  repository's README and records a `verified` date. Run `npm run projects:check` to list
  entries whose repo has been pushed to since (add `-- --strict` to exit non-zero). To
  refresh one, re-read the repo's README, update the entry, then bump `verified`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: the Playwright suite must pass, then
`next build` exports the site and publishes `./out` to GitHub Pages. The `/next-portfolio`
base path is applied only in production builds, so local development runs at the root.

## License

MIT
