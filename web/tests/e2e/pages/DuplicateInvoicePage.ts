import { Browser, Element } from "../../../e2e/browsers/Browser";
import { ViewInvoicePage } from "./ViewInvoicePage";

export class DuplicateInvoicePage {
  browser: Browser;
  invoiceNumber: Element;
  invoiceDate: Element;
  saveButton: Element;

  constructor(browser: Browser) {
    this.browser = browser;
    this.invoiceNumber = browser.locator("#invoice-number");
    this.invoiceDate = browser.locator("#invoice-date");
    this.saveButton = browser.locator("#save-button");
  }

  static create(browser: Browser): DuplicateInvoicePage {
    let page = new DuplicateInvoicePage(browser);
    page.ready();
    return page;
  }

  async ready() {
    await this.browser.containsText("Unsave Invoice (edit mode)");
  }

  async editInvoiceNumber(invoiceNumber: string) {
    await this.invoiceNumber.fill(invoiceNumber);
  }

  async editInvoiceDate(date: string) {
    await this.invoiceDate.fill(date);
  }

  editFirstItem(item: string, price: string, amount: string) {
    this.browser.getFieldByRowAndLabel("1", "1").fill(item);
    this.browser.getFieldByRowAndLabel("1", "2").fill(price);
    this.browser.getFieldByRowAndLabel("1", "3").fill(amount);
  }

  async editSecondItem(item: string, price: string, amount: string) {
    this.browser.getFieldByRowAndLabel("2", "1").fill(item);
    this.browser.getFieldByRowAndLabel("2", "2").fill(price);
    this.browser.getFieldByRowAndLabel("2", "3").fill(amount);
  }

  save(): ViewInvoicePage {
    this.saveButton.click();
    return ViewInvoicePage.create(this.browser);
  }
}
