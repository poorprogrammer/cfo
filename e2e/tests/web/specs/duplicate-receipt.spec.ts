import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";
import DuplicateReceiptPage from "../pages/DuplicateReceiptPage";

test.describe("Create New Receipt Via Receipt Duplication Feature", () => {
  let loginPage: LoginPage;
  let archivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Can create new Receipt by duplicate from existing one", async ({
    page,
  }) => {
    await duplicateReceipt(
      {
        from: "202001-001",
        to: "202001-008",
        date: "2020-01-01",
        items: [
          { description: "Technical coach", rate: "1000", quantity: "12" },
        ],
      },
      page
    );

    await editReceipt(
      {
        number: "202001-008",
        date: "2020-01-02",
        items: [
          { description: "Fullstack developer", rate: "1000", quantity: "10" },
        ],
      },
      page
    );

    await deleteReceipt("202001-008");
  });

  async function login(page: Page) {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    archivePage = await loginPage.login();
    archivePage = new BillingArchivePage(page, "Receipt");
  }

  async function duplicateReceipt(
    {
      from,
      to,
      date,
      items,
    }: {
      from: string;
      to: string;
      date: string;
      items: Array<{ description: string; rate: string; quantity: string }>;
    },
    page: Page
  ) {
    await archivePage.visit(2020);
    await archivePage.clickDuplicateDocumentNumber(from);

    const duplicatePage = new DuplicateReceiptPage(page);
    await duplicatePage.editDocumentNumber(to);
    await duplicatePage.editDocumentDate(date);
    await duplicatePage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );

    const viewPage = await duplicatePage.save();
    await viewPage.containsDocumentNumber(to);
    await viewPage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await viewPage.containsText("USD 12,000.00");
  }

  async function editReceipt(
    {
      number,
      date,
      items,
    }: {
      number: string;
      date: string;
      items: Array<{ description: string; rate: string; quantity: string }>;
    },
    page: Page
  ) {
    await archivePage.visit(2020);
    await archivePage.containsDocument(number);
    await archivePage.clickEditDocumentNumber(number);

    const editPage = new DuplicateReceiptPage(page);
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

  async function deleteReceipt(receipt: string) {
    await archivePage.visit(2020);
    await archivePage.containsDocument(receipt);
    await archivePage.delete(receipt);
    await archivePage.shouldNotContainDocument(receipt);
  }
});
