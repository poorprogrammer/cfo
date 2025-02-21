import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";

test.describe("Create New Invoice Via Invoice Duplication Feature", () => {
  let loginPage: LoginPage;
  let archivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Can create new Invoice by duplicate from existing one", async ({
    page,
  }) => {
    await duplicateInvoice({
      from: "202001-007",
      to: "202001-008",
      date: "2020-01-01",
      items: [
        { description: "Technical coach", rate: "1000", quantity: "12" },
        { description: "UX", rate: "2000", quantity: "10" },
      ],
    });

    await editInvoice({
      number: "202001-008",
      date: "2020-01-02",
      items: [
        { description: "Fullstack developer", rate: "1000", quantity: "10" },
        { description: "UX/UI", rate: "3000", quantity: "10" },
      ],
    });

    await deleteInvoice("202001-008");
  });

  async function login(page: Page) {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    archivePage = await loginPage.login();
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
    await archivePage.visit(2020);
    const duplicatePage = await archivePage.clickDuplicateDocumentNumber(from);

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

    const viewPage = await duplicatePage.save();
    await viewPage.containsDocumentNumber(to);
    await viewPage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await viewPage.containsText("THB 32,000.00");
  }

  async function editInvoice({
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
    await editPage.editSecondItem(
      items[1].description,
      items[1].rate,
      items[1].quantity
    );

    // These operations seem to be testing UI functionality, keeping them in the flow
    await editPage.addSecondItem("Scrum master", "4000", "10");
    await editPage.removeSecondItem();

    const viewPage = await editPage.save();
    await viewPage.containsDocumentNumber(number);
    await viewPage.containsText("THB 40,000.00");
  }

  async function deleteInvoice(invoice: string) {
    await archivePage.visit(2020);
    await archivePage.containsDocument(invoice);
    await archivePage.delete(invoice);
    await archivePage.shouldNotContainDocument(invoice);
  }
});
