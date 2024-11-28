// @ts-check
const { test, expect } = require('@playwright/test');



test('Intercepting API Calls and - Aborting or disrupting files', async ({page})=> {
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    //This will trace all request url and print in the console

    await page.on('request', async request => console.log( await request.url()));

    //This will trace all response url and print in the console
    await page.on('response', async response => console.log( await response.url(), await response.status()));

     // Intercepta y bloquea todas las solicitudes de imágenes (jpg, png, jpeg)
     await page.route('**/*.{jpg,png,jpeg}', async (route) => {
        console.log(`Aborted: ${route.request().url()}`); // Confirmación en consola
        await route.abort();
    });

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
   
   await userName.fill('rahulshettyacademy');
   await password.fill('learning');
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
 
   await page.pause()
});