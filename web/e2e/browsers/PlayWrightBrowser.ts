import { Locator, Page, expect } from "@playwright/test";
import { Browser, Element } from "./Browser";

export class PlayWrightBrowser implements Browser {
  page: Page;
  baseUrl: string;

  constructor(page: Page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
  }
  async goto(uri) {
    await this.page.goto(`${this.baseUrl}${uri}`);
  }

  locator(selector: string): Element {
    return new PlayWrightElement(this.page.locator(selector));
  }

  getByLabel(text: string): Element {
    return new PlayWrightElement(this.page.getByLabel(text));
  }

  getButtonByName(name: string): Element {
    return new PlayWrightElement(this.getRoleByName("button", name));
  }

  getFieldByRowAndLabel(rowName: string, label: string): Element {
    return new PlayWrightElement(
      this.getRoleByName("row", rowName).getByLabel(label)
    );
  }

  getRoleByName(role: Role, name: string) {
    return this.page.getByRole(role, { name: name });
  }

  async containsText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}

type Role = "button" | "row";

class PlayWrightElement implements Element {
  el: Locator;

  constructor(el: Locator) {
    this.el = el;
  }

  async click(): Promise<void> {
    await this.el.click();
  }

  async type(text: string): Promise<void> {
    await this.el.type(text);
  }

  async fill(value: string): Promise<void> {
    await this.el.fill(value);
  }
}
