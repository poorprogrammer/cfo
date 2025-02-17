import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import BillingArchivePage from "../pages/BillingArchivePage";

test.describe("Create New Invoice Via Invoice Duplication Feature", () => {
  let loginPage: LoginPage;
  let archivePage: BillingArchivePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    archivePage = await loginPage.login();
  });

  test("Can create new Invoice by duplicate from existing one", async ({
    page,
  }) => {
    await archivePage.visit(2020);
    const duplicatePage = await archivePage.clickDuplicateDocumentNumber(
      "202001-007"
    );
    await duplicatePage.editDocumentNumber("202001-008");
    await duplicatePage.editDocumentDate("2020-01-01");
    await duplicatePage.editFirstItem("Technical coach", "1000", "12");
    await duplicatePage.editSecondItem("UX", "2000", "10");
    const viewPage = await duplicatePage.save();
    await viewPage.containsDocumentNumber("202001-008");
    await viewPage.containsFirstItem("Technical coach", "1000", "12");

    await archivePage.visit(2020);
    await archivePage.containsDocument("202001-008");
    const editPage = await archivePage.clickEditDocumentNumber("202001-008");
    await editPage.editDocumentDate("2020-01-02");
    await editPage.editFirstItem("Fullstack developer", "1000", "10");
    await editPage.editSecondItem("UX/UI", "3000", "10");
    await editPage.addSecondItem("Scrum master", "4000", "10");
    await editPage.save();
    await viewPage.containsDocumentNumber("202001-008");
    await viewPage.containsText("80,000.00");
    await archivePage.visit(2020);
    await archivePage.containsDocument("202001-008");
    await archivePage.delete("202001-008");
    await archivePage.shouldNotContainDocument("202001-008");
  });
});
