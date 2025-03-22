import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";

Given("I am logged in", async function (this: CustomWorld) {
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

Then(
  "I cleanup documents with invoice {string} and receipt {string}",
  async function (this: CustomWorld, invoice: string, receipt: string) {
    await deleteInvoice(invoice, this);
    await deleteReceipt(receipt, this);
  }
);

async function deleteInvoice(invoice: string, customWorld: CustomWorld) {
  await customWorld.invoiceArchivePage.visit(2020);
  await customWorld.invoiceArchivePage.containsDocument(invoice);
  await customWorld.invoiceArchivePage.delete(invoice);
  await customWorld.invoiceArchivePage.shouldNotContainDocument(invoice);
}

async function deleteReceipt(receipt: string, customWorld: CustomWorld) {
  const receiptArchivePage = new BillingArchivePage(
    customWorld.page,
    "Receipt"
  );
  await receiptArchivePage.visit(new Date().getFullYear());
  await receiptArchivePage.containsDocument(receipt);
  await receiptArchivePage.delete(receipt);
  await receiptArchivePage.shouldNotContainDocument(receipt);
}
