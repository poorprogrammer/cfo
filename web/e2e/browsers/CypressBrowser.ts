import { Browser, Element } from "./Browser";

export class CypressBrowser implements Browser {
  host: string;

  constructor(host: string) {
    this.host = host;
  }
  async goto(url) {
    cy.visit(`${this.host}${url}`);
  }

  getByLabel(label: string): Element {
    return CypressElement.getByLabel(label);
  }

  getButtonByName(name: string) {
    return CypressElement.getButtonByName(name);
  }

  getFieldByRowAndLabel(row: string, label: string): Element {
    return CypressElement.getByLocator(
      `div.v-data-table tr:nth-child(${row}) ${label}`
    );
  }

  async containsText(text: string) {
    cy.contains(text);
  }

  async shouldNotContains(text: string) {
    cy.contains(text).should("not.exist");
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
  contains(text: string) {
    this.el().contains(text);
  }
}
