import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../tests/web/pages/LoginPage";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";
import * as config from "../../playwright.config.js";
import { ViewDocumentPage } from "../../tests/web/pages/ViewDocumentPage";
import DuplicateReceiptPage from "../../tests/web/pages/DuplicateReceiptPage";

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  invoiceArchivePage!: BillingArchivePage;
  viewReceiptPage!: ViewDocumentPage;
  duplicateReceiptPage!: DuplicateReceiptPage;

  async launchBrowser() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext(config.use);
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
  }

  async closeBrowser() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
export { CustomWorld };
