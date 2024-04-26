import { Locator, Page, expect } from "@playwright/test";
import { Browser, Role } from "./Browser";

export class PlayWrightBrowser implements Browser {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  getByLabel(text: string): Locator {
    return this.page.getByLabel(text);
  }

  getButtonByName(name: string): Locator {
    return this.getRoleByName("button", name);
  }

  getRoleByName(role: Role, name: string): Locator {
    return this.page.getByRole(role, { name: name });
  }

  async containsText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}
