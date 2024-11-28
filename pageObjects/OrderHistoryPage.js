class OrderHistoryPage{
    constructor(page){
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.row = page.locator("tbody tr");
        this.orderIdDetails = page.locator('div[class="col-text -main"]');
    }

    async searchOrderAndSelect(orderId){
        await this.ordersTable.waitFor();
                for (let i = 0; i < await this.row.count(); i++) {
            const rowOrderId = await this.row.locator("th").nth(i).textContent();
        
            if (orderId.includes(rowOrderId)) {
              await this.row.nth(i).locator('button').first().click();
              break;
            }
          }

    }

    async getOrderId(){
        return await this.orderIdDetails.textContent();    
    }

}

module.exports = {OrderHistoryPage}