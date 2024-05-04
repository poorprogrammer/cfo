import { CypressBrowser } from "../../../e2e/browsers/CypressBrowser";
import { InvoiceListPage } from "../pages/InvoiceListPage";
import { LoginPage } from "../pages/LoginPage";

describe("To Create New Invoice Via Invoice Duplication Feature ", () => {
  let invoiceListPage: InvoiceListPage;

  beforeEach(() => {
    let browser = new CypressBrowser("http://localhost:8080");
    browser.goto("/");
    invoiceListPage = new LoginPage(browser).login();
  });

  it("Can create new Invoice by duplcate from existing one", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/invoices/",
    }).as("saveInvoice");

    invoiceListPage.visit(2020);
    let duplicateInvoicePage =
      invoiceListPage.clickDuplicateInvoiceNumber("202001-007");
    duplicateInvoicePage.editInvoiceNumber("202001-008");
    duplicateInvoicePage.editInvoiceDate("2020-01-15");
    duplicateInvoicePage.editFirstItem("Technical coach", "1000", "20");
    duplicateInvoicePage.addNewItemBeforeRow(2);
    duplicateInvoicePage.editSecondItem("UX", "2000", "10");
    let viewInvoicePage = duplicateInvoicePage.save();
    viewInvoicePage.containsInvoiceNumber("202001-008");
    viewInvoicePage.containsItemNameOnRow(1, "Technical coach");
    viewInvoicePage.containsTotal("43,656.00");

    invoiceListPage.visit(2020);
    invoiceListPage.containsInvoice("202001-008");
    invoiceListPage.delete("202001-008");
  });
});
