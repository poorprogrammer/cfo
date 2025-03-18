import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  console.log("🚀 Launching Browser for Scenario...");
  await this.launchBrowser();
});

After(async function (this: CustomWorld) {
  console.log("🛑 Closing Browser after Scenario...");
  await this.closeBrowser();
});
