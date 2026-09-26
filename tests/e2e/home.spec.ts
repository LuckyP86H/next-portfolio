import { test, expect } from '@playwright/test';

const PANELS = [
  'bento-identity',
  'bento-profile',
  'bento-about',
  'bento-skills',
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
    const firstCard = projects.getByRole('button', { name: /Open details for/ }).first();

    await firstCard.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Close dialog' }).click();
    await expect(dialog).toBeHidden();

    await firstCard.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('contact form validates required fields', async ({ page }) => {
    const contact = page.getByTestId('bento-contact');
    await contact.scrollIntoViewIfNeeded();
    await contact.getByRole('button', { name: /Send message/ }).click();
    await expect(contact.getByText('Name is required')).toBeVisible();
    await expect(contact.getByText('Email is required')).toBeVisible();
  });

  test('typewriter types in place without moving anything', async ({ page }) => {
    // At 360px the longest role wraps to a second line. The role line must keep one height
    // for every role, or the panels below jump on each cycle. And each letter must appear
    // where it will stay, or words hop between lines mid-typing. Fake timers step through
    // a whole cycle (~13s of typing) in about a second.
    await page.clock.install();
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const roleLine = page.getByTestId('bento-identity').locator('h1 + p');

    // Visible text of the typed layer, and each letter's position within the line.
    const snapshot = () =>
      roleLine.evaluate((line) => {
        const origin = line.getBoundingClientRect();
        const walker = document.createTreeWalker(line.lastElementChild!, NodeFilter.SHOW_TEXT);
        let text = '';
        const spots: string[] = [];
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (node.parentElement?.closest('.invisible')) continue;
          for (let i = 0; i < node.textContent!.length; i++) {
            const range = document.createRange();
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const box = range.getBoundingClientRect();
            text += node.textContent![i];
            spots.push(`${Math.round(box.left - origin.left)},${Math.round(box.top - origin.top)}`);
          }
        }
        return { text, spots, height: Math.round(origin.height) };
      });

    const heights = new Set<number>();
    const moved: string[] = [];
    let previous = await snapshot();
    for (let tick = 0; tick < 160; tick++) {
      await page.clock.runFor(100);
      const current = await snapshot();
      heights.add(current.height);
      // While one role is being typed or deleted, letters present in both samples must not move.
      const sameRole =
        current.text.startsWith(previous.text) || previous.text.startsWith(current.text);
      const shared = sameRole ? Math.min(current.text.length, previous.text.length) : 0;
      for (let i = 0; i < shared; i++) {
        if (current.spots[i] !== previous.spots[i]) moved.push(`"${current.text[i]}" in "${current.text}"`);
      }
      previous = current;
    }
    expect([...heights], 'role line heights seen').toHaveLength(1);
    expect(moved, 'letters that moved after being typed').toEqual([]);
  });

  test('phone layout has no horizontal overflow and the drawer navigates', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('#mobile-tabs a[href="#skills"]').click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator('#mobile-tabs')).toBeHidden();
  });
});
