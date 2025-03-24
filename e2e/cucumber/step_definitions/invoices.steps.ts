import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

When(
  "I visit the invoice list for the year {int}",
  async function (this: CustomWorld, year: number) {
    await this.page.goto(`/invoices/${year}`);
  }
);

Then(
  "I should see the invoice {string}",
  async function (this: CustomWorld, invoiceNumber: string) {
    await this.page.waitForSelector(`text=${invoiceNumber}`);
  }
);

When(
  "I print the invoice {string}",
  async function (this: CustomWorld, invoiceNumber: string) {
    await this.page.locator(`#print_${invoiceNumber}`).click();
  }
);

Then(
  "I should see the printed invoice details",
  async function (this: CustomWorld) {
    await this.page.waitForSelector("text=Training");
  }
);

When("I visit a non-existent page", async function (this: CustomWorld) {
  await this.page.goto("/shouldNotHaveThisPage");
});

Then(
  "I should see the {string} message",
  async function (this: CustomWorld, message: string) {
    await this.page.waitForSelector(`text=${message}`);
  }
);

When("I click the logo", async function (this: CustomWorld) {
  await this.page.locator("#app_logo").click();
});
