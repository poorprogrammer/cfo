import { expect, Locator, Page } from "@playwright/test";
import { ViewInvoicePage } from "./ViewInvoicePage";

export class DuplicateInvoicePage {
  page: Page;
  invoiceDate: Locator;
  invoiceNumber: Locator;
  saveButton: Locator;
  documentType: string;

  constructor(page, documentType = "Invoice") {
    this.page = page;
    this.invoiceNumber = page.locator(
      `#${documentType.toLocaleLowerCase()}-number`
    );
    this.invoiceDate = page.locator(
      `#${documentType.toLocaleLowerCase()}-date`
    );
    this.saveButton = page.locator("#save-button");
    this.documentType = documentType;
  }

  static async create(page: Page, documentType = "Invoice") {
    let duplicateInvoicePage = new DuplicateInvoicePage(page, documentType);
    await duplicateInvoicePage.ready();
    return duplicateInvoicePage;
  }

  async ready() {
    await expect(
      this.page.getByText(`Unsave ${this.documentType} (edit mode)`)
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
    return ViewInvoicePage.create(this.page, this.documentType);
  }
}
