import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";

test.describe("Create New Receipt For Multiple Invoices", () => {
  let loginPage: LoginPage;
  let invoiceArchivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Create new Receipt from multiple invoices", async ({ page }) => {
    await duplicateInvoice({ from: "202001-007", to: "202001-008" });
    await createReceiptFromInvoices({
      invoices: ["202001-007", "202001-008"],
      receiptNumber: "R202001-002",
    });
    await deleteInvoice("202001-008");
    await deleteReceipt(page, "R202001-002");
  });

  async function login(page: Page) {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceArchivePage = await loginPage.login();
  }

  async function duplicateInvoice({ from, to }: { from: string; to: string }) {
    await invoiceArchivePage.visit(2020);
    const duplicatePage = await invoiceArchivePage.clickDuplicateDocumentNumber(
      from
    );
    await duplicatePage.editDocumentNumber(to);
    await duplicatePage.editDocumentDate("2020-01-01");
    await duplicatePage.editFirstItem("Technical coach", "1000", "12");
    await duplicatePage.editSecondItem("UX", "2000", "10");
    const viewInvoicePage = await duplicatePage.save();
    await viewInvoicePage.containsDocumentNumber(to);
    await viewInvoicePage.containsFirstItem("Technical coach", "1000", "12");
    await viewInvoicePage.containsText("THB 32,000.00");
  }

  async function createReceiptFromInvoices({
    invoices,
    receiptNumber,
  }: {
    invoices: string[];
    receiptNumber: string;
  }) {
    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument("202001-008");
    const createReceiptPage =
      await invoiceArchivePage.createReceiptFromInvoices(invoices);
    await createReceiptPage.editDocumentNumber(receiptNumber);
    const viewReceiptPage = await createReceiptPage.save();
    await viewReceiptPage.containsDocumentNumber("R202001-002");
    await viewReceiptPage.containsText("THB 432,800.00");
  }

  async function deleteInvoice(invoice: string) {
    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument(invoice);
    await invoiceArchivePage.delete(invoice);
    await invoiceArchivePage.shouldNotContainDocument(invoice);
  }

  async function deleteReceipt(page: Page, receipt: string) {
    const receiptArchivePage = new BillingArchivePage(page, "Receipt");
    await receiptArchivePage.visit(new Date().getFullYear());
    await receiptArchivePage.containsDocument(receipt);
    await receiptArchivePage.delete(receipt);
    await receiptArchivePage.shouldNotContainDocument(receipt);
  }
});
