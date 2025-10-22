// tools/playwright.config.js - copied from root for tools-scoped usage
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 5000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
