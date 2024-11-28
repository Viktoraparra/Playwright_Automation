import { test, expect, Page, Locator } from "@playwright/test";

export class CartPage {

  page: Page;
  cartProducts: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;
  checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator('[routerlink="/dashboard/cart"]');
    this.orders = page.locator(
      '[class="btnn action__submit ng-star-inserted"]'
    );
    this.checkout = page.locator("text=Checkout");
  }

  async VerifyProductIsDisplayed(productName: string) {
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

  getProductLocator(productName: string) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}

