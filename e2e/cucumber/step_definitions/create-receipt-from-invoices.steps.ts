import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";
import { LoginPage } from "../../tests/web/pages/LoginPage";

Given("I am logged in", async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  this.invoiceArchivePage = await this.loginPage.login();
});

When(
  "I create a receipt from invoices {string} and {string} with number {string}",
  async function (
    this: CustomWorld,
    invoice1: string,
    invoice2: string,
    receiptNumber: string
  ) {
    await this.invoiceArchivePage.visit(2020);
    await this.invoiceArchivePage.containsDocument(invoice2);
    const createReceiptPage =
      await this.invoiceArchivePage.createReceiptFromInvoices([
        invoice1,
        invoice2,
      ]);
    await createReceiptPage.editDocumentNumber(receiptNumber);
    this.viewReceiptPage = await createReceiptPage.save();
    await this.viewReceiptPage.containsDocumentNumber(receiptNumber);

    this.invoicesToCleanup.push(invoice2);
    this.invoiceReceiptsToCleanup.push(receiptNumber);
  }
);

Then(
  "I should see the receipt with number {string} and amount {string}",
  async function (
    this: CustomWorld,
    receiptNumber: string,
    expectedAmount: string
  ) {
    await this.viewReceiptPage.containsDocumentNumber(receiptNumber);
    await this.viewReceiptPage.containsText(expectedAmount);
  }
);
