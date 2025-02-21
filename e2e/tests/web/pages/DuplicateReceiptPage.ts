import { Page } from "@playwright/test";
import { DuplicateDocumentPage } from "./DuplicateDocumentPage";
import ViewReceiptPage from "./ViewReceiptPage";

export default class DuplicateReceiptPage extends DuplicateDocumentPage {
  constructor(page: Page) {
    super(page, "Receipt");
  }
  async save() {
    await this.saveButton.click();
    return ViewReceiptPage.create(this.page);
  }
}
