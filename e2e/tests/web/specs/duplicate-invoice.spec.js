const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test.describe("To Create New Invoice Via Invoice Duplication Feature ", () => {
  let loginPage;
  let invoiceListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceListPage = await loginPage.login();
  });

  test("Can create new Invoice by duplicate from existing one", async ({
    page,
  }) => {
    await invoiceListPage.visit(2020);
    let duplicateInvoicePage =
      await invoiceListPage.clickDuplicateInvoiceNumber("202001-007");
    await duplicateInvoicePage.editInvoiceNumber("202001-008");
    await duplicateInvoicePage.editInvoiceDate("2020-01-01");
    await duplicateInvoicePage.editFirstItem("Technical coach", "1000", "12");
    await duplicateInvoicePage.editSecondItem("UX", "2000", "10");
    let viewInvoicePage = await duplicateInvoicePage.save();
    await containInvoiceNumber(page);
    await invoiceListPage.visit(2020);
    await invoiceListPage.containsInvoice("202001-008");
    let editInvoicePage = await invoiceListPage.clickEditInvoiceNumber(
      "202001-008"
    );
    await editInvoicePage.editInvoiceDate("2020-01-02");
    // await editInvoicePage.editFirstItem("Technical coach", "1000", "10");
    // await editInvoicePage.editSecondItem("UX", "3000", "10");
    await editInvoicePage.save();
    await containInvoiceNumber(page);
    await invoiceListPage.visit(2020);
    await invoiceListPage.containsInvoice("202001-008");
    await invoiceListPage.delete("202001-008");
    await invoiceListPage.shouldNotContainsInvoice("202001-008");
  });
});

async function containInvoiceNumber(page) {
  await expect(page.getByText("Invoice Number").first()).toBeVisible();
  await expect(page.getByText("-008").nth(1)).toBeVisible();
}
