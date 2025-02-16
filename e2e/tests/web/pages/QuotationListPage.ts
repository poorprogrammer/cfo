import { Page } from "@playwright/test";
import BillingArchivePage from "./BillingArchivePage";
import { DuplicateQuotationPage } from "./DuplicateQuotationPage";

export default class QuotationListPage extends BillingArchivePage {
  constructor(page: Page) {
    super(page);
  }

  static async create(page) {
    let self = new QuotationListPage(page);
    await self.ready();
    return self;
  }

  async ready() {
    return this.page.getByText("Quotation List").waitFor();
  }

  async visit(year = 2020) {
    await this.page.goto(`/quotations/${year}`);
  }

  async clickDuplicateInvoiceNumber(invoiceNumber) {
    await this.page.locator(`#duplicate_${invoiceNumber}`).click();
    return DuplicateQuotationPage.create(this.page);
  }
}
