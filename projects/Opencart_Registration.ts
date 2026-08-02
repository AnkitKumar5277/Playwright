import { test, expect } from '@playwright/test';

test('Opencart Registration Account Testing', async ({ page }) => {

  // Open registration page
  await page.goto('https://awesomeqa.com/ui/index.php?route=account/register');

  // Fill registration form
  await page.fill('[name="firstname"]', 'Ankit');
  await page.fill('[name="lastname"]', 'Kumar');
  await page.fill('#input-email', `ankit${Date.now()}@gmail.com`); // Unique email
  await page.fill('#input-telephone', '6829994324');
  await page.fill('[name="password"]', 'Sakhamudi@3001');
  await page.fill('[name="confirm"]', 'Sakhamudi@3001');

  // Accept Privacy Policy
  await page.check('[name="agree"]');

  // Click Continue
  await page.click('input[type="submit"]');

  // Verify URL
  await expect(page).toHaveURL(
    'https://awesomeqa.com/ui/index.php?route=account/success'
  );

  // Verify Success Message
  const successMessage = page.locator('#content h1');
  await expect(successMessage).toHaveText('Your Account Has Been Created!');

  // Print details
  console.log('Driver Title:', await page.title());
  console.log('Success Message:', await successMessage.textContent());
});
// Driver Title: Your Account Has Been Created!
// Success Message: Your Account Has Been Created!
