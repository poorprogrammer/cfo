import { Locator, Page } from "@playwright/test";
import BillingArchivePage from "./BillingArchivePage";

export class LoginPage {
  page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page
      .getByLabel("Password")
      .and(page.getByRole("textbox"));
    this.loginButton = page.getByText("Sign In").and(page.getByRole("button"));
  }

  async goto() {
    await this.page.goto("/");
  }

  async login() {
    await this.usernameInput.type("e2e");
    await this.passwordInput.type("s3cr3t");
    await this.loginButton.click();
    return BillingArchivePage.create(this.page, "Invoice");
  }
}
