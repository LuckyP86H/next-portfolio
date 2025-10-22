import { test, expect } from '@playwright/test';

test('homepage loads and shows hero', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('text=Hello, I\'m')).toBeVisible();
});
