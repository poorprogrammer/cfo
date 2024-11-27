const { expect } = require("@playwright/test");
const { DuplicateInvoicePage } = require("./DuplicateInvoicePage");

exports.InvoiceListPage = class InvoiceListPage {
  constructor(page) {
    this.page = page;
    this.confirmDeleteButton = page.locator(".delete-btn");
  }

  static async create(page) {
    let invoiceListPage = new InvoiceListPage(page);
    await invoiceListPage.ready();
    return invoiceListPage;
  }

  async ready() {
    return this.page.getByText("Invoice List").waitFor();
  }

  async visit(year = 2020) {
    await this.page.goto(`/invoices/${year}`);
  }

  async clickDuplicateInvoiceNumber(invoiceNumber) {
    await this.page.locator(`#duplicate_${invoiceNumber}`).click();
    return DuplicateInvoicePage.create(this.page);
  }

  async delete(invoiceNumber) {
    await this.page.locator(`#delete_${invoiceNumber}`).click();
    await this.confirmDeleteButton.click();
  }

  async containsInvoice(invoiceNumber) {
    await expect(this.page.getByText(`${invoiceNumber}`)).toBeVisible();
  }

  async shouldNotContainsInvoice(invoiceNumber) {
    await expect(this.page.getByText(`${invoiceNumber}`)).not.toBeVisible();
  }
};
