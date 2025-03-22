import { Given, Then, When } from "@cucumber/cucumber";

Given(
  "I duplicate quotation {string} to {string} with date {string} and items:",
  async function (string, string2, string3, dataTable) {
    return "pending";
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
