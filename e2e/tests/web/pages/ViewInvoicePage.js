const { expect } = require("@playwright/test");
exports.ViewInvoicePage = class ViewInvoicePage {
  constructor(page) {
    this.page = page;
  }

  static async create(page) {
    let viewInvoicePage = new ViewInvoicePage(page);
    await viewInvoicePage.ready();
    return viewInvoicePage;
  }

  async ready() {
    await this.page.waitForSelector("text=Invoice (original)");
  }

  async containInvoiceNumber(page) {
    await expect(page.getByText("Invoice Number").first()).toBeVisible();
    await expect(page.getByText("-008").nth(1)).toBeVisible();
  }
};
