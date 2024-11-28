const { test, expect } = require("@playwright/test");

test("Windows - Child Windosws handling", async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");
    //this event will wait for new page 
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
            documentLink.click(),         // new page is opened

        ])
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split('.')[0];
    console.log(text);  
    // console.log(domain); 
      
    await page.locator('#username').fill(domain);
    // await page.pause();
    console.log(await page.locator('#username').textContent());
});

 