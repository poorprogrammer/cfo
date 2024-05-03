import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { PlayWrightBrowser } from "./browsers/PlayWrightBrowser";
import { InvoiceListPage } from "./pages/InvoiceListPage";

test.describe("To Create New Invoice Via Invoice Duplication Feature ", () => {
  let invoiceListPage: InvoiceListPage;

  test.beforeEach(async ({ page }) => {
    let browser = new PlayWrightBrowser(page, "http://localhost:8080");
    await browser.goto("/");
    invoiceListPage = await new LoginPage(browser).login();
  });

  test("Can create new Invoice by duplcate from existing one", async ({
    page,
  }) => {
    await invoiceListPage.visit(2020);
    let duplicateInvoicePage =
      await invoiceListPage.clickDuplicateInvoiceNumber("202001-007");
    await duplicateInvoicePage.editInvoiceNumber("202001-008");
    await duplicateInvoicePage.editInvoiceDate("2020-01-01");
    await duplicateInvoicePage.editFirstItem("Technical coach", "1000", "10");
    await duplicateInvoicePage.editSecondItem("UX", "2000", "10");
    let viewInvoicePage = await duplicateInvoicePage.save();
    // await containInvoiceNumber(page);
    await invoiceListPage.visit(2020);
    await invoiceListPage.containsInvoice("202001-008");
    await invoiceListPage.delete("202001-008");
    // cy.contains("202001-008").should("not.exist");
  });
});

async function containInvoiceNumber(page) {
  await expect(page.getByText("Invoice Number")).toBeVisible();
  await expect(page.getByText("202001-008")).toBeVisible();
}
