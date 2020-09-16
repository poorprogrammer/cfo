Cypress.Commands.add("containsOriginalInvoiceHeading", () => {
    cy.contains('Invoice (original)')
})

Cypress.Commands.add("containsInvoiceNumber", (invoiceNumber) => {
    cy.contains('Invoice Number')
    cy.contains(invoiceNumber)
})
