const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrderHistoryPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.cartPage = new CartPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }
    getOrdersReviewPage(){
        return this.ordersReviewPage;
    }

}

module.exports = {POManager}