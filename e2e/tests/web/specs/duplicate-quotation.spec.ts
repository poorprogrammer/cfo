import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";

test.describe("Create New Quotation Via Duplication Feature", () => {
  let loginPage: LoginPage;
  let archivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `test-results/${testInfo.title}-failure.png`,
      });
    }
  });

  test("Can create new Quotation by duplicate from existing one", async ({
    page,
  }) => {
    await duplicateQuotation({
      from: "202001-001",
      to: "202001-008",
      date: "2020-01-01",
      items: [
        { description: "Technical coach", rate: "1000.5", quantity: "12.5" },
      ],
    });

    await editQuotation({
      number: "202001-008",
      date: "2020-01-02",
      items: [
        { description: "Fullstack developer", rate: "1000", quantity: "10" },
      ],
    });

    await deleteQuotation("202001-008");
  });

  async function login(page: Page) {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    archivePage = await loginPage.login();
    archivePage = new BillingArchivePage(page, "Quotation");
  }

  async function duplicateQuotation({
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
    await archivePage.visit(2020);
    const duplicatePage = await archivePage.clickDuplicateDocumentNumber(from);

    await duplicatePage.editDocumentNumber(to);
    await duplicatePage.editDocumentDate(date);
    await duplicatePage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );

    const viewPage = await duplicatePage.save();
    await viewPage.containsDocumentNumber("008");
    await viewPage.containsFirstItem(
      items[0].description,
      "1,000.50",
      items[0].quantity
    );
    await viewPage.containsText("USD 12,506.25");
  }

  async function editQuotation({
    number,
    date,
    items,
  }: {
    number: string;
    date: string;
    items: Array<{ description: string; rate: string; quantity: string }>;
  }) {
    await archivePage.visit(2020);
    await archivePage.containsDocument(number);

    const editPage = await archivePage.clickEditDocumentNumber(number);
    await editPage.editDocumentDate(date);
    await editPage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );

    const viewPage = await editPage.save();
    await viewPage.containsDocumentNumber(number);
    await viewPage.containsText("USD 10,000.00");
  }

  async function deleteQuotation(quotation: string) {
    await archivePage.visit(2020);
    await archivePage.containsDocument(quotation);
    await archivePage.delete(quotation);
    await archivePage.shouldNotContainDocument(quotation);
  }
});
