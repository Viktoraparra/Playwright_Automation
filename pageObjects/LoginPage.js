class LoginPage {
    constructor(page){
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(username, password){
        await this.userName.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = {LoginPage}