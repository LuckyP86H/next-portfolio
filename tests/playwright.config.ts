import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration. See https://playwright.dev/docs/test-configuration
 *
 * Port 3000 is often taken on dev machines (Docker Desktop, OrbStack, another app), so the
 * port is overridable:  PORT=3111 npm test
 */
const port = process.env.PORT ?? '3000';
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Start the dev server before the tests (reuses one already listening on the port locally).
  webServer: {
    command: `npm run dev -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
