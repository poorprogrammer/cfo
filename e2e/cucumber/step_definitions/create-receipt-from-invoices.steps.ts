import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given("I am logged in", async function (this: CustomWorld) {
  await this.loginPage.goto();
  this.invoiceArchivePage = await this.loginPage.login();
});

When(
  "I duplicate invoice {string} to {string} with date {string} and items:",
  async function (string, string2, string3, dataTable) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

When(
  "I create a receipt from invoices {string} and {string} with number {string}",
  async function (string, string2, string3) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
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
