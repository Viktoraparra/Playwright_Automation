const { test, expect } = require('@playwright/test');


test('Playwrigth Special Locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    
    // GetByLabel
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').click();

    // only will by available for the selected options
    await page.getByLabel('Gender').selectOption('Female');

    // getByPlaceholder
    await page.getByPlaceholder("Password").fill('123456');

    // getByRole
    await page.getByRole("button", {name:'submit'}).click();

    // getByText
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    // getByRole
    await page.getByRole("link", {name:'shop'}).click();

    // Chaining method 
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
  });