const { expect } = require("@playwright/test");
const { ViewInvoicePage } = require("./ViewInvoicePage");

exports.DuplicateInvoicePage = class DuplicateInvoicePage {
  constructor(page) {
    this.page = page;
    this.invoiceNumber = page.locator("#invoice-number");
    this.invoiceDate = page.locator("#invoice-date");
    this.saveButton = page.locator("#save-button");
  }

  static async create(page) {
    let duplicateInvoicePage = new DuplicateInvoicePage(page);
    await duplicateInvoicePage.ready();
    return duplicateInvoicePage;
  }

  async ready() {
    await expect(
      this.page.getByText("Unsave Invoice (edit mode)")
    ).toBeVisible();
  }

  async editInvoiceNumber(invoiceNumber) {
    await this.invoiceNumber.fill(invoiceNumber);
  }

  async editInvoiceDate(date) {
    await this.invoiceDate.fill(date);
  }

  async editFirstItem(item, price, amount) {
    await this.page
      .locator(
        'table.items-table tbody tr:first-child input[placeholder="Item"]'
      )
      .fill(item);
    await this.page
      .locator(
        'table.items-table tbody tr:first-child input[placeholder="Price"]'
      )
      .fill(price);
    await this.page
      .locator(
        'table.items-table tbody tr:first-child input[placeholder="Amount"]'
      )
      .fill(amount);
  }

  async editSecondItem(item, price, amount) {
    await this.page
      .locator(
        'table.items-table tbody tr:nth-child(2) input[placeholder="Item"]'
      )
      .fill(item);
    await this.page
      .locator(
        'table.items-table tbody tr:nth-child(2) input[placeholder="Price"]'
      )
      .fill(price);
    await this.page
      .locator(
        'table.items-table tbody tr:nth-child(2) input[placeholder="Amount"]'
      )
      .fill(amount);
  }

  async save() {
    await this.saveButton.click();
    return ViewInvoicePage.create(this.page);
  }
};
