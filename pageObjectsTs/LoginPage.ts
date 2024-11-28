import { test, expect, Page, Locator } from "@playwright/test";

export class LoginPage {

    page: Page;
    signInButton: Locator;
    userName: Locator;
    passwordField: Locator;



    constructor(page:Page){
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(username:string, password:string){
        await this.userName.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
