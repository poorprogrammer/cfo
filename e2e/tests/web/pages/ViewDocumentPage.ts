import { expect, Page } from "@playwright/test";

export class ViewDocumentPage {
  page: Page;
  documentType: string;

  constructor(page: Page, documentType: string) {
    this.page = page;
    this.documentType = documentType;
  }

  static async create(page, documentType) {
    let viewDocumentPage = new ViewDocumentPage(page, documentType);
    await viewDocumentPage.ready();
    return viewDocumentPage;
  }

  async ready() {
    await this.page.waitForSelector(`text=${this.documentType} (original)`);
  }

  async containsDocumentNumber(number: string) {
    await this.containsText(`${this.documentType} Number`);
    await this.containsText(number);
  }

  async containsText(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  async containsFirstItem(itemName, itemPrice, itemQuantity) {
    await expect(this.page.getByText(itemName).first()).toBeVisible();
    await expect(this.page.getByText(itemPrice).first()).toBeVisible();
    await expect(this.page.getByText(itemQuantity).first()).toBeVisible();
  }
}
