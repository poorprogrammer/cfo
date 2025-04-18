import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../tests/web/pages/LoginPage";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";
import * as config from "../../playwright.config.js";
import { ViewDocumentPage } from "../../tests/web/pages/ViewDocumentPage";
import DuplicateReceiptPage from "../../tests/web/pages/DuplicateReceiptPage";
import { deleteInvoice, deleteQuotation, deleteInvoiceReceipt, deleteReceipt } from "./cleanup"; // ✅ Import cleanup functions


class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  invoiceArchivePage!: BillingArchivePage;
  viewReceiptPage!: ViewDocumentPage;
  duplicateReceiptPage!: DuplicateReceiptPage;

  invoicesToCleanup: string[] = [];
  invoiceReceiptsToCleanup: string[] = [];
  quotationsToCleanup: string[] = [];
  receiptsToCleanup: string[] = [];


  async launchBrowser() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext(config.use);
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.browser?.close();
  }

  async cleanupDocuments() {
    for (const invoice of this.invoicesToCleanup) {
      await deleteInvoice(invoice, this);
    }
    for (const receipt of this.invoiceReceiptsToCleanup) {
      await deleteInvoiceReceipt(receipt, this);
    }
    for (const quotation of this.quotationsToCleanup) {
      await deleteQuotation(quotation, this);
    }
    for (const receipts of this.receiptsToCleanup) {
      await deleteReceipt(receipts, this);
    }
  }
}

setWorldConstructor(CustomWorld);
export { CustomWorld };
