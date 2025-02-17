import { expect, Locator, Page } from "@playwright/test";
import { DuplicateDocumentPage } from "./DuplicateDocumentPage";

export default class BillingArchivePage {
  page: Page;
  confirmDeleteButton: Locator;
  documentType: string;

  constructor(page: Page, documentType) {
    this.page = page;
    this.confirmDeleteButton = page.locator(".delete-btn");
    this.documentType = documentType;
  }

  static async create(page, documentType) {
    let archivePage = new BillingArchivePage(page, documentType);
    await archivePage.ready();
    return archivePage;
  }

  async ready() {
    return this.page.getByText(`${this.documentType} List`).waitFor();
  }

  async visit(year = 2020) {
    await this.page.goto(`/${this.documentType.toLocaleLowerCase()}s/${year}`);
  }

  async clickDuplicateDocumentNumber(documentNumber) {
    await this.page.locator(`#duplicate_${documentNumber}`).click();
    return DuplicateDocumentPage.create(this.page, this.documentType);
  }

  async clickEditDocumentNumber(documentNumber) {
    await this.page.locator(`#edit_${documentNumber}`).click();
    return DuplicateDocumentPage.create(this.page, this.documentType);
  }

  async delete(documentNumber) {
    await this.page.locator(`#delete_${documentNumber}`).click();
    await this.confirmDeleteButton.click();
  }

  async containsDocument(documentNumber) {
    await expect(this.page.getByText(`${documentNumber}`)).toBeVisible();
  }

  async shouldNotContainDocument(documentNumber) {
    await expect(this.page.getByText(`${documentNumber}`)).not.toBeVisible();
  }
}
