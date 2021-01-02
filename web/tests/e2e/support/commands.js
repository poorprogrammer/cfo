Cypress.Commands.add("containsOriginalInvoiceHeading", () => {
    cy.contains('Invoice (original)')
})

Cypress.Commands.add("containsInvoiceNumber", (invoiceNumber) => {
    cy.contains('Invoice Number')
    cy.contains(invoiceNumber)
})

Cypress.Commands.add("containsTotal", (total) => {
    cy.get('div.v-data-table tr:last-child td:last-child')
      .contains(total)
})