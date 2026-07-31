import { test, expect } from "@playwright/test";

test("Login and calculate total", async ({ page }) => {

  // Open Website
  await page.goto("https://demo.applitools.com");

  // Login
  await page.fill("#username", "Admin");
  await page.fill("#password", "Password@123");
  await page.click("#log-in");

  // Wait for table
  await page.waitForSelector("table");

  // Get all amounts
  const amounts = await page
    .locator("td.text-right.bolder.nowrap span")
    .allTextContents();

  let total = 0;

  // Add all amounts
  for (const amount of amounts) {

    const value = amount
      .replace("+", "")
      .replace("$", "")
      .replace(",", "")
      .replace("USD", "")
      .replace(/\s/g, "");

    total = total + Number(value);
  }

  console.log("Amounts:", amounts);
  console.log("Total Sum:", total);

  expect(total).toBeGreaterThan(0);
});
