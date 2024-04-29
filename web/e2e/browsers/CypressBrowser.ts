import { Browser, Element } from "./Browser";

export class CypressBrowser implements Browser {
  async goto(url) {
    // await this.page.goto(url);
  }

  getByLabel(label: string): Element {
    return CypressElement.getByLabel(label);
  }

  getButtonByName(name: string) {
    return CypressElement.getButtonByName(name);
  }

  getFieldByRowAndLabel(rowName: string, label: string): Element {
    return CypressElement.getByLabel(label);
  }

  async containsText(text: string) {
    // await expect(this.page.getByText(text)).toBeVisible();
  }

  locator(locator: string) {
    return CypressElement.getByLocator(locator);
  }
}

class CypressElement implements Element {
  el: () => Cypress.Chainable<JQuery<HTMLLabelElement>>;

  constructor(el) {
    this.el = el;
  }

  static getByLabel(label: string) {
    return new CypressElement(() => cy.contains("label", label).next("input"));
  }

  static getButtonByName(name: string) {
    return new CypressElement(() => cy.contains("button", name));
  }

  static getByLocator(locator: string) {
    return new CypressElement(() => cy.contains(locator));
  }

  fill(text: string): void {
    this.type(text);
  }

  type(text: string): void {
    this.el().type(text);
  }

  click(): void {
    this.el().click();
  }
}
