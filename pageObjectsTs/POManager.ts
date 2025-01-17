
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { Page } from "@playwright/test";

export class POManager{

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    ordersHistoryPage: OrderHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrderHistoryPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.cartPage = new CartPage(page);
    }

    getLoginPage(page: Page){
        return this.loginPage;
    }
    getDashboardPage(page: Page){
        return this.dashboardPage;
    }
    getCartPage(page: Page){
        return this.cartPage;
    }
    getOrdersHistoryPage(page: Page){
        return this.ordersHistoryPage;
    }
    getOrdersReviewPage(page: Page){
        return this.ordersReviewPage;
    }

}
