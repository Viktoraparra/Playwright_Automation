const { test, expect } = require("@playwright/test");

test("Login Excercise creating user and login ", async ({ page }) => {
  const productname = "ZARA COAT 3";

  // Login Page locators
  const email = "viksparra@gmail.com";
  const userEmailField = page.locator("#userEmail");
  const paswordField = page.locator("#userPassword");
  const loginRegisterBtn = page.locator("#login");

  // First page Loctatos
  const products = page.locator(".card-body");
  const producTitles = page.locator(".card-body b");
  const cartBtn = page.locator('[routerlink="/dashboard/cart"]');

  // Second page Locators
  const prodContainer = page.locator('[class="infoWrap"]');
  // Checkout Locators
  const ccn = page.locator("form input[class$='input txt text-validated']");
  const cvvCodeNameOf = page.locator("form input[class$='input txt']");
  const couponField = page.locator('input[name="coupon"]');
  const dates = page.locator("select[class$='input ddl']");
  const applyCouponBtn = page.locator("div button[type='submit']");
  const confirmCoupon = page.locator('p[class="mt-1 ng-star-inserted"]');
  const emailF = page.locator(
    'input[class="input txt text-validated ng-untouched ng-pristine ng-valid"]'
  );
  const countryDropdown = page.locator('[placeholder="Select Country"]');
  const orderBtn = page.locator(
    '[class="btnn action__submit ng-star-inserted"]'
  );

  await page.goto("https://rahulshettyacademy.com/client");
  await userEmailField.fill(email);
  await paswordField.fill("G34d26X99");
  await loginRegisterBtn.click();

  await page.waitForLoadState("networkidle");

  const titles = await producTitles.allTextContents();

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productname) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await cartBtn.click();
  await page.locator("div li").first().waitFor();

  const bool = await prodContainer.locator("h3").isVisible();
  expect(await prodContainer.locator("h3").textContent()).toContain(
    productname
  );
  expect(bool).toBeTruthy();

  await page.locator("//button[normalize-space()='Checkout']").click();
  await page
    .locator('[class="payment__type payment__type--cc active"]')
    .waitFor();

  await ccn.clear();
  await ccn.fill("4542 9931 9292 7193");

  await dates.nth(0).selectOption("07");
  await dates.nth(1).selectOption("19");

  await cvvCodeNameOf.nth(1).fill("875");

  await cvvCodeNameOf.nth(0).fill("Clarence Mitchell");

  await couponField.fill("rahulshettyacademy");

  await applyCouponBtn.click();

  await confirmCoupon.waitFor();

  expect(await confirmCoupon.textContent()).toContain("Coupon Applied");

  // To enter text Sequentially 1 by 1
  /*
        This is a Helpfull Way to handle Dynamics Dropdowns
    */
  await countryDropdown.pressSequentially("ind");

  const dropresp = page.locator(".ta-results");
  await dropresp.waitFor();
  let optionCount = await dropresp.locator("button").count();

  for (let i = 0; i < optionCount; i++) {
    let text = await dropresp.locator("button").nth(i).textContent();

    if (text === " India") {
      await dropresp.locator("button").nth(i).click();
      break;
    }
  }
  await expect(
    await page.locator(".user__name [type='text']").first()
  ).toHaveText(email);
  await orderBtn.click();

  // Tercera pagina
  const titleCompleted = page.locator(".hero-primary");
  await expect(titleCompleted).toHaveText(" Thankyou for the order. ");

  const orderIdMessed = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  const orderId = cleanText(orderIdMessed);

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  const rows = page.locator("tbody tr");
  await page.locator("h1").waitFor();

  for (let i = 0; i < (await rows.count()); i++) {
    const textValidate = await rows.locator("th").nth(i).textContent();

    if (textValidate === orderId) {
      rows.nth(i).locator('button[class="btn btn-primary"]').click();
      break;
    }
  }
  await page.locator('div[class="col-text -main"]').waitFor();
  await expect(page.locator('div[class="col-text -main"]')).toHaveText(orderId);
});

/**
 * Limpia un texto eliminando caracteres específicos como "|" y espacios.
 * @param {string} text - El texto a limpiar.
 * @returns {string} - El texto limpio.
 */
function cleanText(text) {
  return text.replace(/\|/g, "").trim(); // Elimina "|" y recorta espacios en los extremos
}
