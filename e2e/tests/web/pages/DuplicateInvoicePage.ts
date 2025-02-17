import { expect, Locator, Page } from "@playwright/test";
import { ViewInvoicePage } from "./ViewInvoicePage";

export class DuplicateDocumentPage {
  page: Page;
  documentDate: Locator;
  documentNumber: Locator;
  saveButton: Locator;
  documentType: string;

  constructor(page, documentType) {
    this.page = page;
    this.documentNumber = page.locator(`#${documentType.toLowerCase()}-number`);
    this.documentDate = page.locator(`#${documentType.toLowerCase()}-date`);
    this.saveButton = page.locator("#save-button");
    this.documentType = documentType;
  }

  static async create(page: Page, documentType) {
    let duplicateDocumentPage = new DuplicateDocumentPage(page, documentType);
    await duplicateDocumentPage.ready();
    return duplicateDocumentPage;
  }

  async ready() {
    await expect(
      this.page.getByText(`Unsave ${this.documentType} (edit mode)`)
    ).toBeVisible();
  }

  async editDocumentNumber(documentNumber) {
    await this.documentNumber.fill(documentNumber);
  }

  async editDocumentDate(date) {
    await this.documentDate.fill(date);
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
