const { test, expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator('[routerlink="/dashboard/cart"]');
    this.orders = page.locator(
      '[class="btnn action__submit ng-star-inserted"]'
    );
    this.checkout = page.locator("text=Checkout");
  }

  async VerifyProductIsDisplayed(productName) {
    try {
      await this.cartProducts.waitFor();
      const bool = await this.getProductLocator(productName).isVisible();
      expect(bool).toBeTruthy();
    } catch (error) {
        throw `Error: ${error}` 
    }
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}

module.exports = { CartPage };
