import { DuplicateInvoicePage } from "./DuplicateInvoicePage";
import { Browser, Element } from "../../../e2e/browsers/Browser";

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

  visit(year = 2020) {
    this.browser.goto(`/invoices/${year}`);
  }

  clickDuplicateInvoiceNumber(invoiceNumber: string): DuplicateInvoicePage {
    this.browser.locator(`#duplicate_${invoiceNumber}`).click();
    return DuplicateInvoicePage.create(this.browser);
  }

  delete(invoiceNumber: string) {
    this.browser.locator(`#delete_${invoiceNumber}`).click();
    this.confirmDeleteButton.click();
    this.browser.shouldNotContains(`${invoiceNumber}`);
  }
  containsInvoice(invoiceNumber: string) {
    this.browser.containsText(`${invoiceNumber}`);
  }
}
