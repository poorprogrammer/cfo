import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given("I am logged in", async function (this: CustomWorld) {
  await this.loginPage.goto();
  this.invoiceArchivePage = await this.loginPage.login();
});

When(
  "I duplicate invoice {string} to {string} with date {string} and items:",
  async function (
    this: CustomWorld,
    from: string,
    to: string,
    date: string,
    dataTable: { rawTable: Array<Array<string>> }
  ) {
    const items = dataTable.rawTable.slice(1).map((row) => ({
      description: row[0],
      rate: row[1],
      quantity: row[2],
    }));

    await this.invoiceArchivePage.visit(2020);
    const duplicatePage =
      await this.invoiceArchivePage.clickDuplicateDocumentNumber(from);
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
    const viewInvoicePage = await duplicatePage.save();
    await viewInvoicePage.containsDocumentNumber(to);
    await viewInvoicePage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await viewInvoicePage.containsText("THB 32,000.00");
  }
);

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
  }
);

Then(
  "I should see the receipt with number {string} and amount {string}",
  async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then(
  "I cleanup documents with invoice {string} and receipt {string}",
  async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);
