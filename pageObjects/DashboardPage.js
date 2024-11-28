class DashboardPage{

    constructor(page){
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
        this.orders = page.locator("button[routerlink*='myorders']")
    }

    async searchProductAddToCart(productName){
        const titles = await this.productsText.allTextContents();
        const count = await this.products.count();
      
        for (let i = 0; i < count; i++) {
          if ((await this.products.nth(i).locator("b").textContent()) === productName) {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
          }
        }
    }
    async navigateToOrders(){
      await this.orders.click()
    }

    async navigateToCart(){
        await this.cart.click()
    }
}

module.exports = {DashboardPage}