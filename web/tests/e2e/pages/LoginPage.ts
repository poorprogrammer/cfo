import { Browser, Element } from "../../../e2e/browsers/Browser";
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

  login(): InvoiceListPage {
    this.mockLogin();
    this.username.type("user");
    this.password.type("s3cr3t");
    this.loginButton.click();
    return InvoiceListPage.create(this.browser);
  }
  mockLogin() {
    cy.intercept("POST", "/login/").as("login");
  }
}