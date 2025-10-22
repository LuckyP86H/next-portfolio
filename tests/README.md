# Tests

End-to-end tests for the portfolio application using Playwright.

## Structure

```
tests/
├── e2e/                      # E2E test files
│   ├── home.spec.ts         # Homepage tests
│   └── example.spec.ts      # Example Playwright tests
├── playwright.config.ts      # Playwright configuration
└── README.md                # This file
```

## Running Tests

### Prerequisites

```bash
# Install Playwright browsers (first time only)
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

### Run Tests in Headed Mode (see browser)

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/e2e/home.spec.ts
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Configuration

- **Config file**: `tests/playwright.config.ts`
- **Test directory**: `tests/e2e/`
- **Base URL**: `http://localhost:3000`
- **Auto-start dev server**: Yes (configured in playwright.config.ts)

## Writing Tests

Add new test files in `tests/e2e/` with the `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
```

## CI/CD

Tests are configured to:
- Retry 2 times on CI
- Run sequentially on CI (workers: 1)
- Fail if `test.only` is detected

## Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports are generated in `playwright-report/` (gitignored).
