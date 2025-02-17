import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import QuotationListPage from "../pages/QuotationListPage";

test.describe("Create New Quotation Via Duplication Feature", () => {
  let loginPage: LoginPage;
  let invoiceListPage: QuotationListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceListPage = await loginPage.login();
    invoiceListPage = new QuotationListPage(page);
  });

  test("Can create new Quotation by duplicate from existing one", async ({
    page,
  }) => {
    await invoiceListPage.visit(2020);
    const duplicateInvoicePage =
      await invoiceListPage.clickDuplicateInvoiceNumber("202001-001");
    await duplicateInvoicePage.editInvoiceNumber("202001-008");
    await duplicateInvoicePage.editInvoiceDate("2020-01-01");
    await duplicateInvoicePage.editFirstItem("Technical coach", "1000", "12");
    const viewInvoicePage = await duplicateInvoicePage.save();
    await viewInvoicePage.containsInvoiceNumber();
    await viewInvoicePage.containsFirstItem("Technical coach", "1000", "12");

    await invoiceListPage.visit(2020);
    await invoiceListPage.containsInvoice("202001-008");
    const editInvoicePage = await invoiceListPage.clickEditInvoiceNumber(
      "202001-008"
    );
    await editInvoicePage.editInvoiceDate("2020-01-02");
    await editInvoicePage.editFirstItem("Fullstack developer", "1000", "10");
    await editInvoicePage.save();
    await viewInvoicePage.containsInvoiceNumber();
    await invoiceListPage.visit(2020);
    await invoiceListPage.containsInvoice("202001-008");
    await invoiceListPage.delete("202001-008");
    await invoiceListPage.shouldNotContainsInvoice("202001-008");
  });
});
