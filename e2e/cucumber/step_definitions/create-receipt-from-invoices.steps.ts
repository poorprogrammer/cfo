import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given("I am logged in", async function (this: CustomWorld) {
  await this.loginPage.goto();
});
