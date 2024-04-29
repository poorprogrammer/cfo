import { Locator } from "@playwright/test";
import { Browser, Element } from "../browsers/Browser";
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

  static async create(browser: Browser): Promise<DuplicateInvoicePage> {
    let page = new DuplicateInvoicePage(browser);
    await page.ready();
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

  async editFirstItem(item: string, price: string, amount: string) {
    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 400,000.00", "Item")
      .fill(item);

    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 400,000.00", "Price")
      .fill(price);

    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 20,000.00", "Amount")
      .fill(amount);
  }

  async editSecondItem(item: string, price: string, amount: string) {
    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 800.00", "Item")
      .fill(item);

    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 800.00", "Price")
      .fill(price);

    await this.browser
      .getFieldByRowAndLabel("Item Price Amount THB 20,000.00", "Amount")
      .fill(amount);
  }

  async save(): Promise<ViewInvoicePage> {
    await this.saveButton.click();
    return ViewInvoicePage.create(this.browser);
  }
}
