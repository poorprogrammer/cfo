import { expect, Locator, Page } from "@playwright/test";
import { DuplicateDocumentPage } from "./DuplicateDocumentPage";
import DuplicateReceiptPage from "./DuplicateReceiptPage";

export default class BillingArchivePage {
  page: Page;
  confirmDeleteButton: Locator;
  documentType: string;
  generateReceiptButton: Locator;

  constructor(page: Page, documentType: string) {
    this.page = page;
    this.confirmDeleteButton = page.locator(".delete-btn");
    this.documentType = documentType;
    this.generateReceiptButton = page.locator("#generate-receipt");
  }

  static async create(page: Page, documentType: string) {
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

  async clickDuplicateDocumentNumber(documentNumber: string) {
    await this.page.locator(`#duplicate_${documentNumber}`).click();
    return DuplicateDocumentPage.create(this.page, this.documentType);
  }

  async clickEditDocumentNumber(documentNumber: string) {
    await this.page.locator(`#edit_${documentNumber}`).click();
    return DuplicateDocumentPage.create(this.page, this.documentType);
  }

  async delete(documentNumber: string) {
    await this.page.locator(`#delete_${documentNumber}`).click();
    await this.confirmDeleteButton.click();
  }

  async containsDocument(documentNumber: string) {
    await expect(this.page.getByText(`${documentNumber}`)).toBeVisible();
  }

  async shouldNotContainDocument(documentNumber: string) {
    await expect(this.page.getByText(`${documentNumber}`)).not.toBeVisible();
  }

  async createReceiptFromInvoices(invoiceNumbers: string[]) {
    await this.generateReceiptButton.click();
    // Check the checkboxes for the selected invoices
    for (const invoiceNumber of invoiceNumbers) {
      await this.page
        .locator(`.selecting-invoices input[value='${invoiceNumber}']`)
        .check();
    }
    await this.generateReceiptButton.click();
    return new DuplicateReceiptPage(this.page);
  }
}
