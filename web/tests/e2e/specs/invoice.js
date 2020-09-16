describe('Invoice Page Now', () => {

  it('Visits the view invoice url should see the original invoice', () => {
    openInvoiceDetailNumber('202001-001')
    containsOriginalInvoice(cy)
    shouldSeeHeaderSoThatInvoicePrintingIsPretty(cy)
  })

  it('Can go back to see list of invoices from invoice detail page', () => {
    openInvoiceDetailNumber('202001-001')
    goBackToInoviceList(cy)
    shouldSee(cy, 'Invoice List')
  })

  function shouldSee(cy, expected) {
    cy.contains(expected)
  }

  function openInvoiceDetailNumber(invoiceNumber) {
    cy.visit('/invoice/' + invoiceNumber)
  }

  function shouldSeeHeaderSoThatInvoicePrintingIsPretty(cy) {
    cy.get('#header')
  }

  function goBackToInoviceList(cy) {
    cy.get('#back-button').click();
  }

  function containsOriginalInvoice(cy) {
    cy.containsOriginalInvoiceHeading()
    containsFromCompanyLogo(cy)
    containsFromCompanyName(cy)
    containsTargetCompanyName(cy)
    cy.containsInvoiceNumber('202001-001')
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
