import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://algorhythm-quiz.vercel.app/notes');
  await expect(page.getByText('[ { "id": 1, "title": "Today')).toBeVisible();
});