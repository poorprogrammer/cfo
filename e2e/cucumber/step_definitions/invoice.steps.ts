import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../../tests/web/pages/LoginPage";

Given("I am a guest user", async function (this: CustomWorld) {
  await this.launchBrowser();
});

Given("I am an authenticated user", async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login();
});

When(
  "I try to view invoice {string}",
  async function (this: CustomWorld, invoiceNumber: string) {
    await this.page.goto("/invoice/" + invoiceNumber);
  }
);

When(
  "I view invoice {string}",
  async function (this: CustomWorld, invoiceNumber: string) {
    await this.page.goto("/invoice/" + invoiceNumber);
  }
);

When("I go back to the invoice list", async function (this: CustomWorld) {
  await this.page.locator("#back-button").click();
});

Then(
  "I should be redirected to the login page",
  async function (this: CustomWorld) {
    await this.page.waitForSelector("text=Sign in to your account");
  }
);

Then(
  "I should see the original invoice details",
  async function (this: CustomWorld) {
    await this.page.waitForSelector("text=Invoice (original)");
    await this.page.waitForSelector("#from-company-logo");
    await this.page.waitForSelector("text=ODDS HQ");
    await this.page.waitForSelector("text=SPACEX HEADQUARTERS");
    await this.page.waitForSelector("text=Invoice Number");
    await this.page.waitForSelector("text=202001-001");
    await this.page.waitForSelector("text=Invoice Date");
    await this.page.waitForSelector("text=2020-01-03");
  }
);

Then(
  "I should see the {string} page",
  async function (this: CustomWorld, pageTitle: string) {
    await this.page.waitForSelector(`text=${pageTitle}`);
  }
);
