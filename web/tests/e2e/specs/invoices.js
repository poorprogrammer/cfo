describe("List Invoices Page", () => {
  beforeEach(() => {
    cy.visit("/invoices/2020");
    cy.login();
  });

  it("Prints an old invoice", () => {
    cy.visit("/invoices/2020");
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
});
