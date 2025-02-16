import { Page } from "@playwright/test";
import BillingArchivePage from "./BillingArchivePage";

export class InvoiceListPage extends BillingArchivePage {
  constructor(page: Page) {
    super(page);
  }

  static async create(page) {
    let invoiceListPage = new InvoiceListPage(page);
    await invoiceListPage.ready();
    return invoiceListPage;
  }
}
