const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");

// test.beforeEach( async ()=>{})

let response;

const loginPayload = {userEmail:"viksparra@gmail.com",userPassword:"G34d26X99"}
const orderPayload = {orders: [{ country: "Argentina", productOrderedId: "6581ca979fd99c85e8ee7faf" }],
};
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Login app by API and checking order by API", async ({ page }) => {
  
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  const rows = page.locator("tbody tr");
  await page.locator("tbody").waitFor();
  for (let i = 0; i < (await rows.count()); i++) {
    const textValidate = await rows.locator("th").nth(i).textContent();

    if (textValidate === response.orderId) {
      rows.nth(i).locator('button[class="btn btn-primary"]').click();
      break;
    }
  }
  await page.locator('div[class="col-text -main"]').waitFor();
  await expect(page.locator('div[class="col-text -main"]')).toHaveText(response.orderId);

});
