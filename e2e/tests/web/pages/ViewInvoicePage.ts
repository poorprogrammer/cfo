import { expect, Page } from "@playwright/test";

export class ViewInvoicePage {
  page: Page;
  constructor(page: Page) {
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

  async containsInvoiceNumber() {
    await expect(this.page.getByText("Invoice Number").first()).toBeVisible();
    await expect(this.page.getByText("-008").nth(1)).toBeVisible();
  }

  async containsFirstItem(itemName, itemPrice, itemQuantity) {
    await expect(this.page.getByText(itemName).first()).toBeVisible();
    await expect(this.page.getByText(itemPrice).first()).toBeVisible();
    await expect(this.page.getByText(itemQuantity).first()).toBeVisible();
  }
}
