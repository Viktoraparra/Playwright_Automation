const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

let orderId;

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    try {
      const loginPage = this.poManager.getLoginPage(this.page);
      await loginPage.goTo();
      await loginPage.validLogin(username, password);
    } catch (error) {
      throw `Error: ${error}`;
    }
  }
);

When(
  "Add {string} to Cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    try {
      this.dashboardPage = this.poManager.getDashboardPage(this.page);
      await this.dashboardPage.searchProductAddToCart(productName);
      await this.dashboardPage.navigateToCart();
    } catch (error) {
      throw `Error: ${error}`;
    }
  }
);

Then(
  "Verify {string} is displayed in the Cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    try {
      const cartPage = this.poManager.getCartPage(this.page);
      await cartPage.VerifyProductIsDisplayed(productName);
      await cartPage.Checkout();
    } catch (error) {
      throw `Error: ${error}`;
    }
  }
);

When("Enter valid details and place the Order", async function () {
  try {
    const ordersReviewPage = this.poManager.getOrdersReviewPage(this.page);
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
  } catch (error) {
    throw `Error: ${error}`;
  }
});

Then("Verify order is present in the OrderHistory", async function () {
  try {
    const orderHistoryPage = this.poManager.getOrdersHistoryPage(this.page);
    await this.dashboardPage.navigateToOrders();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
  } catch (error) {
    throw `Error: ${error}`;
  }
});
