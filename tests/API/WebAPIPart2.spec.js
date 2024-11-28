const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");

let webContext;

test.beforeAll(async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('viksparra@gmail.com');
    await page.locator('#userPassword').fill('G34d26X99');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'})
    webContext = await browser.newContext({storageState:'./data/state.json'})
})

test("Login app by API and checking order by API", async () => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const producTitles = page.locator('.card-body b');
    const titles = await producTitles.allTextContents();
    console.log(titles)
    console.log(await producTitles.first().textContent());
    expect(await producTitles.first().textContent()).toContain('ZARA')

  });