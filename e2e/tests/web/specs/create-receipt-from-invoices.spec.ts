import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";

test.describe("Create New Receipt For Multiple Invoices", () => {
  let loginPage: LoginPage;
  let invoiceArchivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceArchivePage = await loginPage.login();
  });

  test("Create new Receipt from multiple invoices", async ({ page }) => {
    await invoiceArchivePage.visit(2020);
    const duplicatePage = await invoiceArchivePage.clickDuplicateDocumentNumber(
      "202001-007"
    );
    await duplicatePage.editDocumentNumber("202001-008");
    await duplicatePage.editDocumentDate("2020-01-01");
    await duplicatePage.editFirstItem("Technical coach", "1000", "12");
    await duplicatePage.editSecondItem("UX", "2000", "10");
    const viewInvoicePage = await duplicatePage.save();
    await viewInvoicePage.containsDocumentNumber("202001-008");
    await viewInvoicePage.containsFirstItem("Technical coach", "1000", "12");
    await viewInvoicePage.containsText("THB 32,000.00");

    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument("202001-008");
    const createReceiptPage =
      await invoiceArchivePage.createReceiptFromInvoices([
        "202001-007",
        "202001-008",
      ]);
    await createReceiptPage.editDocumentNumber("R202001-002");
    const viewReceiptPage = await createReceiptPage.save();
    await viewReceiptPage.containsDocumentNumber("R202001-002");
    await viewReceiptPage.containsText("THB 432,800.00");
    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument("202001-008");
    await invoiceArchivePage.delete("202001-008");
    const receiptArchivePage = new BillingArchivePage(page, "Receipt");
    await receiptArchivePage.visit(new Date().getFullYear());
    await receiptArchivePage.containsDocument("R202001-002");
    await receiptArchivePage.delete("R202001-002");
    await receiptArchivePage.shouldNotContainDocument("R202001-002");
  });
});
