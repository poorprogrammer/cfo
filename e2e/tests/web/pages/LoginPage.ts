import { Locator, Page } from "@playwright/test";
import { InvoiceListPage } from "./InvoiceListPage";

export class LoginPage {
  page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page: Page) {
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
