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
    await duplicateInvoice({
      from: "202001-007",
      to: "202001-008",
      date: "2020-01-01",
      items: [
        { description: "Technical coach", rate: "1000", quantity: "12" },
        { description: "UX", rate: "2000", quantity: "10" },
      ],
    });

    await createReceipt({
      invoices: ["202001-007", "202001-008"],
      number: "R202001-002",
      expectedAmount: "THB 432,800.00",
    });

    await cleanupDocuments(
      {
        invoice: "202001-008",
        receipt: "R202001-002",
      },
      page
    );
  });

  async function login(page: Page) {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceArchivePage = await loginPage.login();
  }

  async function duplicateInvoice({
    from,
    to,
    date,
    items,
  }: {
    from: string;
    to: string;
    date: string;
    items: Array<{ description: string; rate: string; quantity: string }>;
  }) {
    await invoiceArchivePage.visit(2020);
    const duplicatePage = await invoiceArchivePage.clickDuplicateDocumentNumber(
      from
    );
    await duplicatePage.editDocumentNumber(to);
    await duplicatePage.editDocumentDate(date);
    await duplicatePage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await duplicatePage.editSecondItem(
      items[1].description,
      items[1].rate,
      items[1].quantity
    );

    const viewInvoicePage = await duplicatePage.save();
    await viewInvoicePage.containsDocumentNumber(to);
    await viewInvoicePage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await viewInvoicePage.containsText("THB 32,000.00");
  }

  async function createReceipt({
    invoices,
    number,
    expectedAmount,
  }: {
    invoices: string[];
    number: string;
    expectedAmount: string;
  }) {
    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument("202001-008");

    const createReceiptPage =
      await invoiceArchivePage.createReceiptFromInvoices(invoices);
    await createReceiptPage.editDocumentNumber(number);

    const viewReceiptPage = await createReceiptPage.save();
    await viewReceiptPage.containsDocumentNumber(number);
    await viewReceiptPage.containsText(expectedAmount);
  }

  async function cleanupDocuments(
    {
      invoice,
      receipt,
    }: {
      invoice: string;
      receipt: string;
    },
    page: Page
  ) {
    await deleteInvoice(invoice);
    await deleteReceipt(receipt, page);
  }

  async function deleteInvoice(invoice: string) {
    await invoiceArchivePage.visit(2020);
    await invoiceArchivePage.containsDocument(invoice);
    await invoiceArchivePage.delete(invoice);
    await invoiceArchivePage.shouldNotContainDocument(invoice);
  }

  async function deleteReceipt(receipt: string, page: Page) {
    const receiptArchivePage = new BillingArchivePage(page, "Receipt");
    await receiptArchivePage.visit(new Date().getFullYear());
    await receiptArchivePage.containsDocument(receipt);
    await receiptArchivePage.delete(receipt);
    await receiptArchivePage.shouldNotContainDocument(receipt);
  }
});
