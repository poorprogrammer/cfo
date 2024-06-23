const { InvoiceListPage } = require("./InvoiceListPage");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByText("Login");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login() {
    await this.usernameInput.type("user");
    await this.passwordInput.type("s3cr3t");
    await this.loginButton.click();
    return InvoiceListPage.create(this.page);
  }
}
