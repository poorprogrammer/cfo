import { CypressBrowser } from "../../../e2e/browsers/CypressBrowser";
import { InvoiceListPage } from "../pages/InvoiceListPage";
import { LoginPage } from "../pages/LoginPage";

describe("List Invoices Page", () => {
  let invoiceListPage: InvoiceListPage;

  beforeEach(() => {
    cy.visit("/invoices/2020");
    invoiceListPage = new LoginPage(new CypressBrowser()).login();
  });

  describe("in laptop", () => {
    beforeEach(() => {
      cy.viewport(800, 600);
    });
    it("Prints an old invoice", () => {
      invoiceListPage.visit(2020);
      shouldSeeShortcutLabelsToMakeItFriendlyToNewUsers();
      shouldSeeLastestInvoiceNumber(cy);
      clickPrintInvoice(cy, "202001-001");
      shouldSee(cy, "Training");
    });

    it("Should be able to get back to home page from whereever page by clicking at logo", () => {
      cy.visit("/shouldNotHaveThisPage");
      cy.contains("Page not found");
      cy.get("#app_logo").click();
      cy.contains("Invoice List");
    });
  });

  describe("in mobile", () => {
    beforeEach(() => {
      cy.viewport(600, 581);
    });
    it("Shows 3 icons", () => {
      cy.visit("/invoices/2020");
      const quotationIcon = ".mdi-format-quote-open";
      const invoiceIcon = ".mdi-file-document-outline";
      const receiptIcon = ".mdi-currency-usd";
      cy.get("#quotation-list-btn").find(quotationIcon);
      cy.get("#invoice-list-btn").find(invoiceIcon);
      cy.get("#receipt-list-btn").find(receiptIcon);
    });
    it("Hides labels so all icons are visible on screen", () => {
      cy.visit("/invoices/2020");
      labelShouldNotVisible("#quotation-list-btn");
      labelShouldNotVisible("#invoice-list-btn");
      labelShouldNotVisible("#receipt-list-btn");
    });
  });

  function shouldSeeLastestInvoiceNumber(cy) {
    let latestInvoiceNumber = "202001-007";
    shouldSee(cy, latestInvoiceNumber);
  }

  function clickPrintInvoice(cy, invoiceNumber) {
    cy.get(`#print_${invoiceNumber}`).click();
  }

  function shouldSee(cy, expected) {
    cy.contains(expected);
  }

  function shouldSeeShortcutLabelsToMakeItFriendlyToNewUsers() {
    labelShould("#quotation-list-btn", "be.visible");
    labelShould("#invoice-list-btn", "be.visible");
    labelShould("#receipt-list-btn", "be.visible");
  }

  function labelShouldNotVisible(selector) {
    labelShould(selector, "not.be.visible");
  }

  function labelShould(selector, condition) {
    cy.get(selector).find(".list-btn-label").should(condition);
  }
});
