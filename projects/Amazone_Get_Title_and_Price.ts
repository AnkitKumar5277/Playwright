import { test } from '@playwright/test';

test('Amazon Laptop Prices', async ({ page }) => {

  // Open Amazon
  await page.goto('https://www.amazon.in/');

  // Search Laptop
  await page.fill('#twotabsearchtextbox', 'laptop');
  await page.keyboard.press('Enter');

  // Wait until products appear
  await page.waitForSelector('div[data-component-type="s-search-result"]');

  // Get all titles
  const titles = await page
    .locator('div[data-component-type="s-search-result"] h2')
    .allTextContents();

  // Get all prices
  const prices = await page
    .locator('.a-price-whole')
    .allTextContents();

  console.log("===== Laptop Names and Prices =====\n");

  // Print title and price
  for (let i = 0; i < Math.min(titles.length, prices.length); i++) {
    console.log(`${i + 1}. ${titles[i]}`);
    console.log(`Price: ₹${prices[i]}`);
    console.log("---------------------------");
  }

});
