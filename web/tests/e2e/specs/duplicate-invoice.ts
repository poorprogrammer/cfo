import { CypressBrowser } from "../../../e2e/browsers/CypressBrowser";
import { InvoiceListPage } from "../../../e2e/pages/InvoiceListPage";
import { LoginPage } from "../pages/LoginPage";

describe("To Create New Invoice Via Invoice Duplication Feature ", () => {
  let invoiceListPage: InvoiceListPage;

  beforeEach(() => {
    cy.visit("/");
    invoiceListPage = new LoginPage(new CypressBrowser()).login();
  });

  it("Can create new Invoice by duplcate from existing one", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/invoices/",
    }).as("saveInvoice");
    cy.route({
      method: "GET",
      url: "/invoices/2020",
    }).as("getInvoices");

    visitInvoicesPage();
    duplicate_invoice("202001-007");
    cy.contains("Unsave Invoice (edit mode)");
    editInvoiceNumber("202001-008");
    editInvoiceDate("2020-01-15");
    editItemOnRow(1, "Technical coach", "1000", "20");
    addNewItemBeforeRow(2);
    editItemOnRow(2, "UX", "2000", "10");
    clickSave();
    cy.containsOriginalInvoiceHeading();
    cy.containsInvoiceNumber("202001-008");
    cy.containsItemNameOnRow(1, "Technical coach");
    cy.containsTotal("43,656.00");

    visitInvoicesPage();
    cy.contains("202001-008");
    deleteInvoice("202001-008");
  });
  function visitInvoicesPage() {
    cy.visit("/invoices/2020");
    cy.wait("@getInvoices");
  }
  function duplicate_invoice(invoiceNumber) {
    cy.get(`#duplicate_${invoiceNumber}`).click();
  }
  function editInvoiceNumber(invoiceNumber) {
    cy.get("#invoice-number")
      .click()
      .type("{selectall}" + invoiceNumber);
  }
  function editInvoiceDate(date) {
    cy.get("#invoice-date")
      .click()
      .type("{selectall}" + date);
  }
  function editItemOnRow(row, name, price, amount) {
    editItemNameOnRow(row, name);
    editItemPriceOnRow(row, price);
    editItemAmountOnRow(row, amount);
  }
  function editItemNameOnRow(row, amount) {
    cy.get(
      `div.v-data-table tr:nth-child(${row}) td:nth-child(1) input[type=text]`
    ).type("{selectall}" + amount);
  }
  function editItemPriceOnRow(row, amount) {
    cy.get(
      `div.v-data-table tr:nth-child(${row}) td:nth-child(2) input[type=text]`
    ).type("{selectall}" + amount);
  }
  function editItemAmountOnRow(row, amount) {
    cy.get(
      `div.v-data-table tr:nth-child(${row}) td:nth-child(3) input[type=text]`
    ).type("{selectall}" + amount);
  }
  function addNewItemBeforeRow(row) {
    cy.get(`tr:nth-child(${row}) td:nth-child(5) button.green`).click();
  }
  function clickSave() {
    cy.get("#save-button").click();
    cy.wait("@saveInvoice");
  }
  function deleteInvoice(invoiceNumber) {
    cy.get(`#delete_${invoiceNumber}`).click();
    cy.get(".confirm-delete-btn").click();
    cy.contains("202001-008").should("not.exist");
  }
});
