// @ts-check
const { test, expect } = require('@playwright/test');

// test('First Playwright test', async ({browser})=> {

//     //chrome - plugins/ cookies
//     const context = await browser.newContext();
//     const page = await context.newPage()
//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//     console.log(await page.title());

// });

// for executing only this scenario from this Test file
// test('Page Playwright test', async ({page})=> {

//     await page.goto('https://www.google.com/');
//     // get title - assertion
//     console.log(await page.title());
//     await expect(page).toHaveTitle('Google')

// });

test('Second Playwright test - Get Text', async ({page})=> {

    //chrome - plugins/ cookies
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // CSS , XPATH - based on the tuto
    // there are 2 form of populate field type, fill -> "types" is deprecated as there where
    await page.locator('#username').fill('rahulshetty');
    await page.locator("[type='password']").fill('learning');
    await page.locator('#signInBtn').click();
    //wait until this locator shows up
    console.log(await page.locator("[style*='block']").textContent());
    expect(await page.locator("[style*='block']").textContent()).toContain('Incorrect username/password.');
});

test('Third Playwright test - Get Text', async ({page})=> {
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    //chrome - plugins/ cookies
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // CSS , XPATH - based on the tuto
    // there are 2 form of populate field type, fill -> "types" is deprecated as there where
    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signInBtn.click();
    expect(await page.locator("[style*='block']").textContent()).toContain('Incorrect username/password.');
    //wait until this locator shows up
   await userName.fill('');
   await userName.fill('rahulshettyacademy');
   await signInBtn.click();
   /*
    When apearing multiple element to be able to select first, by number = nth or last
   */
   console.log(await page.locator('.card-body a').first().textContent());
   console.log(await page.locator('.card-body a').nth(1).textContent());
   console.log(await page.locator('.card-body a').nth(2).textContent());
   console.log(await page.locator('.card-body a').last().textContent());
   // for greating all titles
   // for this action auto-wait wont work
   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);
 
});