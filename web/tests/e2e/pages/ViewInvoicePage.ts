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

  async ready() {
    await this.browser.containsText("Invoice (original)");
  }
}
