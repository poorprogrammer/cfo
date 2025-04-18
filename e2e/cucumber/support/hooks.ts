import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  console.log("🚀 Launching Browser for Scenario...\n");
  await this.launchBrowser();
});

After(async function (this: CustomWorld) {
  console.log("\n🛑 Cleaning up documents after Scenario...");
  await this.cleanupDocuments();
  await this.closeBrowser();
});
