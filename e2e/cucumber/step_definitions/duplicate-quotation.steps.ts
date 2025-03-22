import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given(
  "I duplicate quotation {string} to {string} with date {string} and items:",
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
    const viewQuotationPage = await duplicatePage.save();
    await viewQuotationPage.containsDocumentNumber(to);
    await viewQuotationPage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    await viewQuotationPage.containsText("USD 12,506.25");
  }
);

When(
  "I edit quotation {string} with date {string} and items:",
  async function (string, string2, dataTable) {
    return "pending";
  }
);

Then(
  "I should see the quotation with number {string} and amount {string}",
  async function (string, string2) {
    return "pending";
  }
);

Then("I cleanup documents with quotation {string}", async function (string) {
  return "pending";
});
