import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://socbrain.vercel.app/login');
  await page.getByPlaceholder('you@example.com').click();
  await page.getByPlaceholder('you@example.com').fill('test@gmail.com');
  await page.getByPlaceholder('you@example.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('123456');
  await page.getByPlaceholder('••••••••').press('Enter');
  await page.getByRole('button', { name: 'User Icon' }).click();
  await page.getByRole('link', { name: 'Profile New' }).click();
  await expect(page.getByText('Update your profile')).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('main')).toContainText('Welcome to');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('link', { name: 'Modules' }).click();
  await expect(page.getByRole('link', { name: 'Onboarding Week' })).toBeVisible();
  await page.getByRole('link', { name: 'Onboarding Week' }).click();
  await expect(page.getByRole('heading', { name: 'Onboarding' })).toBeVisible();
});