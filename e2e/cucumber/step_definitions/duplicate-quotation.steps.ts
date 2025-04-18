import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { formatRate } from "../support/utillity";

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
      formatRate(items[0].rate),
      items[0].quantity
    );
    await viewQuotationPage.containsText("USD 12,506.25");
  }
);

When(
  "I edit quotation {string} with date {string} and items:",
  async function (
    this: CustomWorld,
    quotationNumber: string,
    date: string,
    dataTable: { rawTable: Array<Array<string>> }
  ) {
    const items = dataTable.rawTable.slice(1).map((row) => ({
      description: row[0],
      rate: row[1],
      quantity: row[2],
    }));

    await this.invoiceArchivePage.visit(2020);
    await this.invoiceArchivePage.containsDocument(quotationNumber);

    const editPage = await this.invoiceArchivePage.clickEditDocumentNumber(
      quotationNumber
    );
    await editPage.editDocumentDate(date);
    await editPage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );

    const viewPage = await editPage.save();
    await viewPage.containsDocumentNumber(quotationNumber);
    await viewPage.containsText("USD 10,000.00");
  }
);

Then(
  "I should see the quotation with number {string} and amount {string}",
  async function (
    this: CustomWorld,
    quotationNumber: string,
    expectedAmount: string
  ) {
    await this.invoiceArchivePage.visit(2020);
    const editPage = await this.invoiceArchivePage.clickEditDocumentNumber(
      quotationNumber
    );
    const viewQuotationPage = await editPage.save();
    await viewQuotationPage.containsDocumentNumber(quotationNumber);
    await viewQuotationPage.containsText(expectedAmount);
    this.quotationsToCleanup.push(quotationNumber);
  }
);
