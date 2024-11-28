import { test, expect, Page, Locator } from "@playwright/test";

export class OrdersReviewPage {

    page:Page;
    country:Locator;
    dropdown:Locator;
    emailId:Locator;
    submit:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;

    constructor(page:Page){
        this.page = page;
        this.country = page.locator('[placeholder="Select Country"]');
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
    }

    async searchCountryAndSelect(countryCode:string, countryName:string){
        await this.country.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionCount; i++) {
            let text:any = await this.dropdown.locator("button").nth(i).textContent();
        
            if (text.trim() === countryName) {
              await this.dropdown.locator("button").nth(i).click();
              break;
            }
          }
    }

    async veryfyEmailId(username:string){
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId(){
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}
