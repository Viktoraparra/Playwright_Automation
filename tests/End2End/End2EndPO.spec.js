const { test, expect } = require("@playwright/test");
const {customTest} = require('../../utils/test-base')
const { POManager } = require("../../pageObjects/POManager");
const dataSet = JSON.parse(JSON.stringify(require("../../data/placeorderData.json")));

for(const data of dataSet)
{
  test(`@Web Client App - Placing Orders ${data.productName}`, async ({ page }) => {

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage(page);
  const dashboardPage = poManager.getDashboardPage(page);
  const cartPage = poManager.getCartPage(page);
  const ordersReviewPage = poManager.getOrdersReviewPage(page);
  const orderHistoryPage = poManager.getOrdersHistoryPage(page);

  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
  await dashboardPage.searchProductAddToCart(data.productName);
  await dashboardPage.navigateToCart();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();
  await ordersReviewPage.searchCountryAndSelect(data.countryId, data.country);
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()


});
}

// customTest(`Client App - Placing Orders ${data.productName}`, async ({ page, testDataForOrder }) => {

//   const poManager = new POManager(page);
//   const loginPage = poManager.getLoginPage(page);
//   const dashboardPage = poManager.getDashboardPage(page);
//   const cartPage = poManager.getCartPage(page);
//   const ordersReviewPage = poManager.getOrdersReviewPage(page);
//   const orderHistoryPage = poManager.getOrdersHistoryPage(page);

//   await loginPage.goTo();
//   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
//   await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
//   await dashboardPage.navigateToCart();
//   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
//   await cartPage.Checkout();
//   await ordersReviewPage.searchCountryAndSelect(testDataForOrder.countryId, testDataForOrder.country);
//   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
//   console.log(orderId);

//   await dashboardPage.navigateToOrders();
//   await orderHistoryPage.searchOrderAndSelect(orderId);
//   expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()


// });