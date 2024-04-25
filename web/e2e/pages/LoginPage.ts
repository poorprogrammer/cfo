import { Locator, Page } from "@playwright/test";
import { Browser } from "./browser";
import { InvoiceListPage } from "./InvoiceListPage";

export class LoginPage {
  browser: Browser;
  username: Locator;
  password: Locator;
  loginButton: Locator;

  constructor(browser: Browser) {
    this.browser = browser;
    this.username = browser.getByLabel("Username");
    this.password = browser.getByLabel("Password");
    this.loginButton = browser.getButtonByName("Login");
  }

  async login(): Promise<InvoiceListPage> {
    await this.username.click();
    await this.username.type("user");

    await this.password.type("s3cr3t");

    await this.loginButton.click();
    return InvoiceListPage.create(this.browser);
  }
}
