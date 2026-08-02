import { test, expect } from '@playwright/test';

test('Book Appointment', async ({ page }) => {

  // Open Website
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  // Click Make Appointment
  await page.click('#btn-make-appointment');

  // Login
  await page.fill('#txt-username', 'John Doe');
  await page.fill('#txt-password', 'ThisIsNotAPassword');
  await page.click('#btn-login');

  // Select Hospital
  await page.selectOption('#combo_facility', 'Hongkong CURA Healthcare Center');

  // Check Readmission
  await page.check('#chk_hospotal_readmission');

  // Select Medicaid
  await page.check("input[value='Medicaid']");

  // Select Date
  await page.click('#txt_visit_date');
  await page.click("//td[text()='30']");

  // Enter Comment
  await page.fill(
    '#txt_comment',
    'This is my first Playwright automation.'
  );

  // Book Appointment
  await page.click('#btn-book-appointment');

  // Verify Success
  await expect(page.locator('h2')).toHaveText('Appointment Confirmation');

  console.log("✅ Appointment Booked Successfully");

});
