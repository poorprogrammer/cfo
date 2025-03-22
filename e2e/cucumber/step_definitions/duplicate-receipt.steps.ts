import { Given, Then, When } from "@cucumber/cucumber";

Given(
  "I duplicate receipt {string} to {string} with date {string} and items:",
  async function (string, string2, string3, dataTable) {
    return "pending";
  }
);

When(
  "I edit receipt {string} with date {string} and items:",
  async function (string, string2, dataTable) {
    return "pending";
  }
);

Then("I cleanup documents with receipt {string}", async function (string) {
  return "pending";
});
