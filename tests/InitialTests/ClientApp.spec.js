const { test, expect } = require('@playwright/test');


// test('Login Excercise creating user and login ', async ({page})=> {

//     const firstNameField = page.locator("//input[@id='firstName']");
//     const lastNameField = page.locator('#lastName');
//     const phoneField = page.locator('[id="userMobile"]');
//     const sexradioBtns = page.locator('[type="radio"]');
//     const userEmailField = page.locator('#userEmail');
//     const paswordField = page.locator('#userPassword');
//     const oldercheckbox = page.locator('input[type="checkbox"]');
//     const confirmPaswordField = page.locator('#confirmPassword');
//     const registerBtn = page.locator("a[class*='text-reset']");
//     const returnLoginBtn = page.locator('button[class="btn btn-primary"]');
//     const loginRegisterBtn = page.locator('#login');
//     const producTitles = page.locator('div h5');

    
//     // Navigate
//     await page.goto('https://rahulshettyacademy.com/client');

//     // open registery
//     await registerBtn.click();

//     // fill form for login
//     await firstNameField.fill('Victor');
//     await lastNameField.fill('Parra')
//     await phoneField.fill('1153222554')
//     await userEmailField.fill('viksparra@gmail.com')
//     await sexradioBtns.first().check();
//     await paswordField.fill('G34d26X99');
//     await confirmPaswordField.fill('G34d26X99');
//     await oldercheckbox.check();
//     await loginRegisterBtn.click();
//     // return to login
//     await returnLoginBtn.click();

//     // Login
//     await userEmailField.fill('viksparra@gmail.com');
//     await paswordField.fill('G34d26X99');
//     await loginRegisterBtn.click();

//     // Validate first text
//     console.log(await producTitles.first().textContent());
//     expect(await producTitles.first().textContent()).toContain('ZARA')

// });

test('Login Excercise creating user and login ', async ({page})=> {

    const userEmailField = page.locator('#userEmail');
    const paswordField = page.locator('#userPassword');
    const loginRegisterBtn = page.locator('#login');
    const producTitles = page.locator('.card-body b');

    
    // Navigate
    await page.goto('https://rahulshettyacademy.com/client');
    // Login
    await userEmailField.fill('viksparra@gmail.com');
    await paswordField.fill('G34d26X99');
    await loginRegisterBtn.click();
    /*
        USABLE Waits
        wait for networkscalls
        waitForLoadState('networkidle') could be flikea
        waitFor()
    */


    await page.waitForLoadState('networkidle');
    // await producTitles.waitFor();
    // Validate first text
    const titles = await producTitles.allTextContents();
    console.log(titles)
    console.log(await producTitles.first().textContent());
    expect(await producTitles.first().textContent()).toContain('ZARA')

});