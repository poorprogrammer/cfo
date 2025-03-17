import { Page } from "@playwright/test";
import { ViewDocumentPage } from "./ViewDocumentPage";

export default class ViewReceiptPage extends ViewDocumentPage {
  constructor(page: Page) {
    super(page, "Receipt");
  }
  static async create(page: Page) {
    let viewReceiptPage = new ViewReceiptPage(page);
    await viewReceiptPage.ready();
    return viewReceiptPage;
  }
  async ready() {
    await this.page.waitForSelector(`text=Receipt/Tax Invoice (original)`);
  }
}
