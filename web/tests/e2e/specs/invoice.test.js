describe('Invoice Page Now', () => {
  it('Visits the view invoice url should see the original invoice', () => {
    cy.visit('/invoice/202001-001')
    containsOriginalInvoice(cy)
    shouldSeeHeaderSoThatInvoicePrintingIsPretty(cy)
  })
  function shouldSeeHeaderSoThatInvoicePrintingIsPretty(cy) {
    cy.get('#header')
  }
  function containsOriginalInvoice(cy) {
    cy.contains('Invoice (original)')
    containsTargetCompanyName(cy)
    containsInvoiceNumber(cy)
    containsInvoiceDate(cy)
  }
  function containsTargetCompanyName(cy) {
    cy.contains('SPACEX HEADQUARTERS')
  }
  function containsInvoiceNumber(cy) {
    cy.contains('Invoice Number')
    cy.contains('202001-001')
  }
  function containsInvoiceDate(cy) {
    cy.contains('Invoice Date')
    cy.contains('2020-01-03')
  }
})
