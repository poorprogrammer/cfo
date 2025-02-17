import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";
import DuplicateReceiptPage from "../pages/DuplicateReceiptPage";

test.describe("Create New Receipt Via Receipt Duplication Feature", () => {
  let loginPage: LoginPage;
  let archivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    archivePage = await loginPage.login();
    archivePage = new BillingArchivePage(page, "Receipt");
  });

  test("Can create new Receipt by duplicate from existing one", async ({
    page,
  }) => {
    await archivePage.visit(2020);
    await archivePage.clickDuplicateDocumentNumber("202001-001");
    const duplicatePage = new DuplicateReceiptPage(page);
    await duplicatePage.editDocumentNumber("202001-008");
    await duplicatePage.editDocumentDate("2020-01-01");
    await duplicatePage.editFirstItem("Technical coach", "1000", "12");
    const viewPage = await duplicatePage.save();
    await viewPage.containsDocumentNumber("202001-008");
    await viewPage.containsFirstItem("Technical coach", "1000", "12");

    await archivePage.visit(2020);
    await archivePage.containsDocument("202001-008");
    await archivePage.clickEditDocumentNumber("202001-008");
    const editPage = new DuplicateReceiptPage(page);
    await editPage.editDocumentDate("2020-01-02");
    await editPage.editFirstItem("Fullstack developer", "1000", "10");
    await editPage.save();
    await viewPage.containsDocumentNumber("202001-008");
    await archivePage.visit(2020);
    await archivePage.containsDocument("202001-008");
    await archivePage.delete("202001-008");
    await archivePage.shouldNotContainDocument("202001-008");
  });
});
