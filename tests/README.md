# Tests

End-to-end tests for the portfolio using Playwright.

```
tests/
├── e2e/home.spec.ts       # Dashboard: panels, tab bar, filters, modal, contact form, phone layout
├── playwright.config.ts   # Chromium, Firefox and WebKit against the dev server on :3000
└── README.md
```

## Running

```bash
npx playwright install          # browsers, first time only
npm test                        # all browsers (PORT=3111 npm test if :3000 is taken)
npx playwright test --config=tests/playwright.config.ts --project=chromium
npm run test:ui                 # interactive UI mode
npm run test:headed             # watch the browser
npx playwright show-report      # HTML report from the last run
```

The config starts `npm run dev` automatically and reuses a server that is already running
on port 3000. On CI it retries twice, runs with one worker, and fails on a stray `test.only`.
