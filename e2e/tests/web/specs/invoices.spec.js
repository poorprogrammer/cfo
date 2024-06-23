const { test, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage");

test.describe("List Invoices Page", () => {
  let loginPage;
  let invoiceListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    invoiceListPage = await loginPage.login();
  });

  test.describe("in laptop", () => {

    test("Prints an old invoice", async ({ page }) => {
      await invoiceListPage.visit(2020);

      await expect(page.locator("#quotation-list-btn")).toBeVisible();
      await expect(page.locator("#invoice-list-btn")).toBeVisible();
      await expect(page.locator("#receipt-list-btn")).toBeVisible();
      await expect(page.getByText("202001-001")).toBeVisible();

      await page.locator("#print_202001-001").click();
      await expect(page.getByRole('cell', { name: 'Training' })).toBeVisible();
    });

    test("Should be able to get back to home page from wherever page by clicking at logo", async ({ page }) => {
      await page.goto("/shouldNotHaveThisPage");
      await expect(page.getByText("Page not found")).toBeVisible();

      await page.locator("#app_logo").click();
      await expect(page.getByText("Invoice List")).toBeVisible();
    });
  });

});
