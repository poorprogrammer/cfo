import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given(
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
  "I edit invoice {string} with date {string} and items:",
  async function (
    this: CustomWorld,
    invoiceNumber: string,
    date: string,
    dataTable: { rawTable: Array<Array<string>> }
  ) {
    const items = dataTable.rawTable.slice(1).map((row) => ({
      description: row[0],
      rate: row[1],
      quantity: row[2],
    }));

    await this.invoiceArchivePage.visit(2020);
    await this.invoiceArchivePage.containsDocument(invoiceNumber);

    const editPage = await this.invoiceArchivePage.clickEditDocumentNumber(
      invoiceNumber
    );
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

    await editPage.addSecondItem("Scrum master", "4000", "10");
    await editPage.removeSecondItem();

    const viewPage = await editPage.save();
    await viewPage.containsDocumentNumber(invoiceNumber);
    await viewPage.containsText("THB 40,000.00");
  }
);

Then(
  "I should see the invoice with number {string} and amount {string}",
  async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then("I cleanup documents with invoice {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
