// @ts-check
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test.describe("Invoice Page 2020", () => {

  test.describe("for guest", () => {
    test("requires login to see an invoice", async ({ page }) => {
      await openInvoiceDetailNumber("202001-001", page);
      await expect(page).toHaveURL(/login/);
    });
  });

  test.describe("for authenticated user", () => {
    let invoiceListPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
      invoiceListPage = await loginPage.login();
    });

    test("Visits the view invoice url should see the original invoice", async ({ page }) => {
      await openInvoiceDetailNumber("202001-001", page);
      await shouldContainsOriginalInvoice(page);
    });

    test("Can go back to see list of invoices from invoice detail page", async ({ page }) => {
      await openInvoiceDetailNumber("202001-001", page);
      await goBackToInvoiceList(page);
      await expect(page.getByText("Invoice List")).toBeVisible();
    });
  });

  async function openInvoiceDetailNumber(invoiceNumber, page) {
    await page.goto("/invoice/" + invoiceNumber);
  }

  async function goBackToInvoiceList(page) {
    await page.locator("#back-button").click();
  }

  async function shouldContainsOriginalInvoice(page) {
    await expect(page.getByText("Invoice (original)")).toBeVisible();
    await expect(page.locator("#from-company-logo").first()).toBeVisible();
    await expect(page.getByText("ODDS HQ").first()).toBeVisible();
    await expect(page.getByText("SPACEX HEADQUARTERS").first()).toBeVisible();
    await expect(page.getByText("Invoice Number").first()).toBeVisible();
    await expect(page.getByText("202001-001").first()).toBeVisible();
    await expect(page.getByText("Invoice Date").first()).toBeVisible();
    await expect(page.getByText("2020-01-03").first()).toBeVisible();
  }

});
