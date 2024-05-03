import { DuplicateInvoicePage } from "./DuplicateInvoicePage";
import { Browser, Element } from "../browsers/Browser";

export class InvoiceListPage {
  browser: Browser;
  confirmDeleteButton: Element;

  constructor(browser: Browser) {
    this.browser = browser;
    this.confirmDeleteButton = this.browser.locator(".confirm-delete-btn");
  }

  static create(browser: Browser): InvoiceListPage {
    let page = new InvoiceListPage(browser);
    page.ready();
    return page;
  }

  ready() {
    this.browser.containsText("Invoice List");
  }

  async visit(year = 2020) {
    await this.browser.goto(`/invoices/${year}`);
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
    await this.browser.shouldNotContains(`${invoiceNumber}`);
  }
}
