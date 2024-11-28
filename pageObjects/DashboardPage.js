class DashboardPage{

    constructor(page){
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
        this.orders = page.locator("button[routerlink*='myorders']")
    }

    async searchProductAddToCart(productName){
      try {
        const titles = await this.productsText.allTextContents();
        const count = await this.products.count();
      
        for (let i = 0; i < count; i++) {
          console.log(await this.products.nth(i).locator("b").textContent())
          if ((await this.products.nth(i).locator("b").textContent()) === productName) {
            await this.products.nth(i).locator("button:has-text('Add To Cart')").click();
            break;
          }
        }
      } catch (error) {
        throw `Error: ${error}`
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