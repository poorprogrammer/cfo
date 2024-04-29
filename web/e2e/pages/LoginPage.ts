import { Browser, Element } from "../browsers/Browser";
import { InvoiceListPage } from "./InvoiceListPage";

export class LoginPage {
  browser: Browser;
  username: Element;
  password: Element;
  loginButton: Element;

  constructor(browser: Browser) {
    this.browser = browser;
    this.username = browser.getByLabel("Username");
    this.password = browser.getByLabel("Password");
    this.loginButton = browser.getButtonByName("Login");
  }

  async login(): Promise<InvoiceListPage> {
    await this.username.type("user");
    await this.password.type("s3cr3t");
    await this.loginButton.click();
    return InvoiceListPage.create(this.browser);
  }
}
