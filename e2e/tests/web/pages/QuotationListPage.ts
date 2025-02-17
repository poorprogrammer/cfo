import { Page } from "@playwright/test";
import BillingArchivePage from "./BillingArchivePage";

export default class QuotationListPage extends BillingArchivePage {
  constructor(page: Page) {
    super(page, "Quotation");
  }
}
