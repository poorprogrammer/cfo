import { Locator } from "@playwright/test";
import { DuplicateInvoicePage } from "./DuplicateInvoicePage";
import { Browser } from "../browsers/Browser";

export class InvoiceListPage {
  browser: Browser;
  confirmDeleteButton: Locator;

  constructor(browser: Browser) {
    this.browser = browser;
    this.confirmDeleteButton = this.browser.locator(".confirm-delete-btn");
  }

  static async create(browser: Browser): Promise<InvoiceListPage> {
    let page = new InvoiceListPage(browser);
    await page.ready();
    return page;
  }

  async ready() {
    await this.browser.containsText("Invoice List");
  }

  async visit(year = 2020) {
    await this.browser.goto(`http://localhost:8080/invoices/${year}`);
  }

  async clickDuplicateInvoiceNumber(
    invoiceNumber: string
  ): Promise<DuplicateInvoicePage> {
    await this.browser.locator(`#duplicate_${invoiceNumber}`).click();
    return DuplicateInvoicePage.create(this.browser);
  }

  async delete(invoiceNumber: string) {
    await this.browser.locator(`#delete_${invoiceNumber}`).click();
    await this.confirmDeleteButton.click();
  }
}
