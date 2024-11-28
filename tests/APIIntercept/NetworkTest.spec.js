const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");

// test.beforeEach( async ()=>{})

let response;
const loginPayload = {userEmail:"viksparra@gmail.com",userPassword:"G34d26X99"}
const orderPayload = {orders: [{ country: "Argentina", productOrderedId: "6581ca979fd99c85e8ee7faf" }],};
const fakePayloadOrders = {data:[],message:"No Orders"};
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Intercepting and faking api calls for browser", async ({ page }) => {
  
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route =>{
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrders);
      await route.fulfill(
        {
          response,
          body,
        }
      )
      //intercepting response - API response -> {playwright fakeresponse}-> Browser -> render data on frontEnd
    }
  )

  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
  await page.pause();
  // const rows = page.locator("tbody tr");
  await page.locator(".mt-4").textContent();


});
