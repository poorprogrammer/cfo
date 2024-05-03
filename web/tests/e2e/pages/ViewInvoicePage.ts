import { Browser } from "../../../e2e/browsers/Browser";

export class ViewInvoicePage {
  browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  static create(browser: Browser): ViewInvoicePage {
    let page = new ViewInvoicePage(browser);
    page.ready();
    return page;
  }

  ready() {
    this.browser.containsText("Invoice (original)");
  }

  containsInvoiceNumber(invoiceNumber: string) {
    this.browser.containsText(`${invoiceNumber}`);
  }
  containsItemNameOnRow(row: number, text: string) {
    this.browser
      .getFieldByRowAndLabel(`${row}`, "td:nth-child(1)")
      .contains(text);
  }
  containsTotal(text: string) {
    this.browser
      .locator("div.v-data-table tr:last-child td:last-child")
      .contains(text);
  }
}
