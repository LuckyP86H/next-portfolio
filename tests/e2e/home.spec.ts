import { test, expect } from '@playwright/test';

const PANELS = [
  'bento-identity',
  'bento-about',
  'bento-skills',
  'bento-activity',
  'bento-experience',
  'bento-projects',
  'bento-contact',
];

test.describe('Developer Chic portfolio dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the identity hero', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Paul');
    await expect(page.getByTestId('bento-identity')).toBeVisible();
  });

  test('renders every bento panel', async ({ page }) => {
    for (const id of PANELS) {
      await expect(page.getByTestId(id)).toBeAttached();
    }
  });

  test('IDE tab bar links to sections', async ({ page }) => {
    await page.locator('a[href="#projects"]').first().click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('skills category filter toggles items', async ({ page }) => {
    const skills = page.getByTestId('bento-skills');
    await skills.scrollIntoViewIfNeeded();
    const languages = skills.getByRole('button', { name: 'Languages' });
    await languages.click();
    await expect(languages).toHaveAttribute('aria-pressed', 'true');
    await languages.click();
    await expect(languages).toHaveAttribute('aria-pressed', 'false');
  });

  test('project detail modal opens and closes', async ({ page }) => {
    const projects = page.getByTestId('bento-projects');
    await projects.scrollIntoViewIfNeeded();
    await projects.getByRole('button', { name: /Open details for/ }).first().click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('button', { name: 'Close dialog' }).click();
    await expect(dialog).toBeHidden();
  });

  test('contact form validates required fields', async ({ page }) => {
    const contact = page.getByTestId('bento-contact');
    await contact.scrollIntoViewIfNeeded();
    await contact.getByRole('button', { name: /Send message/ }).click();
    await expect(contact.getByText('Name is required')).toBeVisible();
    await expect(contact.getByText('Email is required')).toBeVisible();
  });
});
