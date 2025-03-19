import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  console.log("🚀 Launching Browser for Scenario...\n\n");
  await this.launchBrowser();
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
  console.log("\n\n🛑 Closing Browser after Scenario...");
});
