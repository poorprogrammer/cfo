const { expect } = require('@playwright/test');
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
    await expect(this.page.getByText("Unsave Invoice (edit mode)")).toBeVisible();
  }

  async editInvoiceNumber(invoiceNumber) {
    await this.invoiceNumber.fill(invoiceNumber);
  }

  async editInvoiceDate(date) {
    await this.invoiceDate.fill(date);
  }

  async editFirstItem(item, price, amount) {
    await this.page.getByRole('cell', { name: 'Item Developer' }).getByLabel('Item').fill(item);
    await this.page.getByRole('cell', { name: 'Price 20000' }).getByLabel('Price').fill(price);
    await this.page.getByRole('cell', { name: 'Amount 20' }).getByLabel('Amount').fill(amount);
  }

  async editSecondItem(item, price, amount) {
    await this.page.getByRole('cell', { name: 'Item Scrum master' }).getByLabel('Item').fill(item);
    await this.page.getByRole('cell', { name: 'Price 80' }).getByLabel('Price').fill(price);
    await this.page.getByRole('cell', { name: 'Amount 10' }).getByLabel('Amount').fill(amount);
  }

  async save() {
    await this.saveButton.click();
    return ViewInvoicePage.create(this.page);
  }
}
