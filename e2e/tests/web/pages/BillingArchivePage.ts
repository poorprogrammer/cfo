import { expect, Locator, Page } from "@playwright/test";
import { DuplicateInvoicePage } from "./DuplicateInvoicePage";

export default class BillingArchivePage {
  page: Page;
  confirmDeleteButton: Locator;
  documentType: string;

  constructor(page: Page, documentType = "Invoice") {
    this.page = page;
    this.confirmDeleteButton = page.locator(".delete-btn");
    this.documentType = documentType;
  }

  async ready() {
    return this.page.getByText(`${this.documentType} List`).waitFor();
  }

  async visit(year = 2020) {
    await this.page.goto(`/${this.documentType.toLocaleLowerCase()}s/${year}`);
  }

  async clickDuplicateInvoiceNumber(invoiceNumber) {
    await this.page.locator(`#duplicate_${invoiceNumber}`).click();
    return DuplicateInvoicePage.create(this.page, this.documentType);
  }

  async clickEditInvoiceNumber(invoiceNumber) {
    await this.page.locator(`#edit_${invoiceNumber}`).click();
    return DuplicateInvoicePage.create(this.page, this.documentType);
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
}
