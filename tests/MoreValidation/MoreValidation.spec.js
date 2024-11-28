const { test, expect } = require("@playwright/test");

test("Handling Calendar", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    // Handle Pop Up
    await page.locator('#alertbtn').click();
    await page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.on('dialog', dialog => dialog.dismiss());
});

test('@Web Screenshot & Visual Comparation', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').screenshot({path: 'partialScreenshot2.png'})
    await page.locator('#hide-textbox').click();
    // For screenshot on page level
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden();
})
// visual Validation of Screenshot for validating UI Testing comparing Screenschots
// screenshot - store -> screenshot ->

test('visual', async ({page}) =>{

    await page.goto('https://flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})