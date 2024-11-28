const { test, expect } = require("@playwright/test");

test("UI-Controls - Static Dropdowns", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  const userDropdown = page.locator("//select[@class='form-control']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  //this for selecting static dropdown
  await userDropdown.selectOption('consult');

  await page.locator('.radiotextsty').nth(1).check()
  await page.locator('#okayBtn').click()

  //Assertion
  console.log(await page.locator('.radiotextsty').nth(1).isChecked());
  // the action is perform outside in brewthe expect
  await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();

  await page.locator("#terms").click()
  await expect(page.locator("#terms")).toBeChecked()
  await page.locator("#terms").uncheck()
  // the action is perform inside the expect
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  // PAUSE METHOD will help for debug

  // await page.pause();

//   await userName.fill("rahulshettyacademy");
//   await password.fill("learning");
//   await signInBtn.click();
});
