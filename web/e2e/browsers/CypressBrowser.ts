import { Browser, Element } from "./Browser";

export class CypressBrowser implements Browser {
  async goto(url) {
    cy.visit(url);
  }

  getByLabel(label: string): Element {
    return CypressElement.getByLabel(label);
  }

  getButtonByName(name: string) {
    return CypressElement.getButtonByName(name);
  }

  getFieldByRowAndLabel(row: string, label: string): Element {
    return CypressElement.getByLocator(
      `div.v-data-table tr:nth-child(${row}) td:nth-child(${label}) input[type=text]`
    );
  }

  async containsText(text: string) {
    cy.contains(text);
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
    return new CypressElement(() => cy.get(locator));
  }

  fill(text: string): void {
    this.type("{selectall}" + text);
  }

  type(text: string): void {
    this.el().type(text);
  }

  click(): void {
    this.el().click();
  }
}
