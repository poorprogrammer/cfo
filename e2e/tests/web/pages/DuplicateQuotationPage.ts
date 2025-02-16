import { expect, Page } from "@playwright/test";
import { DuplicateInvoicePage } from "./DuplicateInvoicePage";

export class DuplicateQuotationPage extends DuplicateInvoicePage {
  constructor(page) {
    super(page);
    this.invoiceNumber = page.locator("#quotation-number");
    this.invoiceDate = page.locator("#quotation-date");
  }

  async ready() {
    await expect(
      this.page.getByText("Unsave Quotation (edit mode)")
    ).toBeVisible();
  }

  static async create(page: Page) {
    let duplicateInvoicePage = new DuplicateQuotationPage(page);
    await duplicateInvoicePage.ready();
    return duplicateInvoicePage;
  }
}
