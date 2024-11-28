const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");

let response = {};
const loginPayload = {userEmail:"viksparra@gmail.com",userPassword:"G34d26X99"}

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response.token = await apiUtils.getToken()
});

test("Security test request intercept", async ({ page }) => {
  // login and reah orders page
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=873fad03xe7afd4c0bc8a4af",
      })
  );
  await page.locator('button:has-text("View")').first().click();
  await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order')
});
