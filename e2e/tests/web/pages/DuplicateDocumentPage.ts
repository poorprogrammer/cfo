import { expect, Locator, Page } from "@playwright/test";
import { ViewDocumentPage } from "./ViewDocumentPage";

export class DuplicateDocumentPage {
  page: Page;
  documentDate: Locator;
  documentNumber: Locator;
  saveButton: Locator;
  documentType: string;

  constructor(page: Page, documentType: string) {
    this.page = page;
    this.documentNumber = page.locator(`#${documentType.toLowerCase()}-number`);
    this.documentDate = page.locator(`#${documentType.toLowerCase()}-date`);
    this.saveButton = page.locator("#save-button");
    this.documentType = documentType;
  }

  static async create(page: Page, documentType: string) {
    let duplicateDocumentPage = new DuplicateDocumentPage(page, documentType);
    await duplicateDocumentPage.ready();
    return duplicateDocumentPage;
  }

  async ready() {
    await expect(
      this.page.getByText(`Unsave ${this.documentType} (edit mode)`)
    ).toBeVisible();
  }

  async editDocumentNumber(documentNumber: string) {
    await this.documentNumber.fill(documentNumber);
  }

  async editDocumentDate(date: string) {
    await this.documentDate.fill(date);
  }

  async editFirstItem(item: string, price: string, amount: string) {
    await this.lineItem('input[placeholder="Item"]', 1).fill(item);
    await this.lineItem('input[placeholder="Price"]', 1).fill(price);
    await this.lineItem('input[placeholder="Amount"]', 1).fill(amount);
  }

  async addSecondItem(item: string, price: string, amount: string) {
    await this.lineItem("button.add-item", 2).click();
    expect(this.lineItem('input[placeholder="Price"]', 6)).toBeVisible();
    await this.editSecondItem(item, price, amount);
  }

  async removeSecondItem() {
    await this.lineItem("button.remove-item", 2).click();
  }

  async editSecondItem(item: string, price: string, amount: string) {
    await this.lineItem('input[placeholder="Item"]', 2).fill(item);
    await this.lineItem('input[placeholder="Price"]', 2).fill(price);
    await this.lineItem('input[placeholder="Amount"]', 2).fill(amount);
  }

  lineItem(element: string, row: number) {
    return this.page.locator(
      `table.items-table tbody tr:nth-child(${row}) ${element}`
    );
  }

  async save() {
    await this.saveButton.click();
    return ViewDocumentPage.create(this.page, this.documentType);
  }
}
