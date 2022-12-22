import { test, expect } from "@playwright/test";

test.describe("To Create New Invoice Via Invoice Duplication Feature ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/invoices/2020");
    await login(page);
  });

  test("Can create new Invoice by duplcate from existing one", async ({
    page,
  }) => {
    await visitInvoicePage(page);
    await duplicateInvoice(page);
    await expect(page.getByText("Unsave Invoice (edit mode)")).toBeVisible();
    await editInvoiceNumber(page);
    await editInvoiceDate(page);
    await editItemOnRow(page);
    await clickSave(page);
    await containsOriginalInvoiceHeading(page);
    await visitInvoicePage(page);
    // await containInvoiceNumber(page);
    await page.locator("#delete_202001-008").click();
    // await page.getByRole("button", { name: "Delete" }).click();
    await page.locator(".confirm-delete-btn").click();
    // cy.contains("202001-008").should("not.exist");
  });
});

async function editInvoiceDate(page) {
  await page.locator("#invoice-date").fill("2020-01-01");
}

async function editInvoiceNumber(page) {
  await page.locator("#invoice-number").fill("202001-008");
}

async function duplicateInvoice(page) {
  await page.locator("#duplicate_202001-007").click();
}

async function visitInvoicePage(page) {
  await page.goto("http://localhost:8080/invoices/2020");
}

async function login(page) {
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").type("user");

  await page.getByLabel("Password").type("s3cr3t");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Invoice List")).toBeVisible();
}

async function containsOriginalInvoiceHeading(page) {
  await expect(page.getByText("Invoice (original)")).toBeVisible();
}

async function containInvoiceNumber(page) {
  await expect(page.getByText("Invoice Number")).toBeVisible();
  await expect(page.getByText("202001-008")).toBeVisible();
}

async function editItemOnRow(page) {
  await editItemTechCoach(page);
  await editItemUX(page);
}

async function editItemUX(page: any) {
  await page
    .getByRole("row", { name: "Item Price Amount THB 800.00" })
    .getByLabel("Item")
    .fill("UX");
  await page
    .getByRole("row", { name: "Item Price Amount THB 800.00" })
    .getByLabel("Price")
    .fill("2000");
  await page
    .getByRole("row", { name: "Item Price Amount THB 20,000.00" })
    .getByLabel("Amount")
    .fill("10");
}

async function editItemTechCoach(page: any) {
  await page
    .getByRole("row", { name: "Item Price Amount THB 400,000.00" })
    .getByLabel("Item")
    .fill("Technical coach");

  await page
    .getByRole("row", { name: "Item Price Amount THB 400,000.00" })
    .getByLabel("Price")
    .fill("1000");

  await page
    .getByRole("row", { name: "Item Price Amount THB 20,000.00" })
    .getByLabel("Amount")
    .fill("10");
}

async function clickSave(page) {
  await page.locator("#save-button").click();
}
