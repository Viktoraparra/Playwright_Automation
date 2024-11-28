class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.passwordField = page.locator("#userPassword");
  }

  async goTo() {
    try {
      await this.page.goto("https://rahulshettyacademy.com/client");
    } catch (error) {
      throw `Error navigating to login page: ${error}`;
    }
  }

  async validLogin(username, password) {
    try {
      await this.userName.fill(username);
      await this.passwordField.fill(password);
      await this.signInButton.click();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw `Error during login: ${error}`;
    }
  }
}

module.exports = { LoginPage };
