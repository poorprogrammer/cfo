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
    containsFromCompanyLogo(cy)
    containsFromCompanyName(cy)
    containsTargetCompanyName(cy)
    containsInvoiceNumber(cy)
    containsInvoiceDate(cy)
    containsSignaturesWhenPrint(cy)
  }
  function containsFromCompanyLogo(cy) {
    cy.get('#from-company-logo')
  }
  function containsFromCompanyName(cy) {
    cy.contains('ODDS HQ')
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
  function containsSignaturesWhenPrint(cy) {
    cy.get('#signatures').should(onlyVisibleWhenPrint)
  }
  function onlyVisibleWhenPrint($el) {
    expect($el).to.have.css('display', 'none')
  }
})
