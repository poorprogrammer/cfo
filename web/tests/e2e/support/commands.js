Cypress.Commands.add("containsOriginalInvoiceHeading", () => {
  cy.contains("Invoice (original)");
});

Cypress.Commands.add("containsInvoiceNumber", (invoiceNumber) => {
  cy.contains("Invoice Number");
  cy.contains(invoiceNumber);
});

Cypress.Commands.add("containsItemNameOnRow", (row, value) => {
  cy.get(`div.v-data-table tr:nth-child(${row}) td:nth-child(1)`).contains(
    value
  );
});

Cypress.Commands.add("containsTotal", (total) => {
  cy.get("div.v-data-table tr:last-child td:last-child").contains(total);
});

Cypress.Commands.add("input", (key, value) => {
  cy.get(key)
    .click()
    .type("{selectall}" + value);
});
