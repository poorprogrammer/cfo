import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { formatRate } from "../support/utillity";

Given(
  "I duplicate receipt {string} to {string} with date {string} and items:",
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
    const viewReceiptPage = await duplicatePage.save();
    await viewReceiptPage.containsDocumentNumber(to);
    await viewReceiptPage.containsFirstItem(
      items[0].description,
      formatRate(items[0].rate),
      items[0].quantity
    );
    await viewReceiptPage.containsText("USD 12,000.00");
  }
);

When(
  "I edit receipt {string} with date {string} and items:",
  async function (
    this: CustomWorld,
    receiptNumber: string,
    date: string,
    dataTable: { rawTable: Array<Array<string>> }
  ) {
    const items = dataTable.rawTable.slice(1).map((row) => ({
      description: row[0],
      rate: row[1],
      quantity: row[2],
    }));

    await this.invoiceArchivePage.visit(2020);
    const editPage = await this.invoiceArchivePage.clickEditDocumentNumber(
      receiptNumber
    );
    await editPage.editDocumentDate(date);
    await editPage.editFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
    const viewReceiptPage = await editPage.save();
    await viewReceiptPage.containsDocumentNumber(receiptNumber);
    await viewReceiptPage.containsFirstItem(
      items[0].description,
      items[0].rate,
      items[0].quantity
    );
  }
);

Then(
  "I should see the receipt at duplicate with number {string} and amount {string}",
  async function (
    this: CustomWorld,
    receiptNumber: string,
    expectedAmount: string
  ) {
    await this.invoiceArchivePage.visit(2020);
    const editPage = await this.invoiceArchivePage.clickEditDocumentNumber(
      receiptNumber
    );
    const viewReceiptPage = await editPage.save();
    await viewReceiptPage.containsDocumentNumber(receiptNumber);
    await viewReceiptPage.containsText(expectedAmount);
    this.receiptsToCleanup.push(receiptNumber);
  }
);
