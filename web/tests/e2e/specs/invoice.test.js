describe('Invoice Page Now', () => {
  it('Visits the view invoice url should see the original invoice', () => {
    cy.visit('/invoice/202001-001')
    containsOriginalInvoice(cy)
  })
  function containsOriginalInvoice(cy) {
    cy.contains('Invoice (original)')
    cy.contains('Invoice Number: 202001-001')
    cy.contains('Company: spacex')
    cy.contains('Invoice Date: 2020-01-03')
  }
})
