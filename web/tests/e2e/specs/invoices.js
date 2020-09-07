describe('List Invoices Page', () => {
  it('Prints an old invoice', () => {
    cy.visit('/invoices')
    shouldSeeLastestInvoiceNumber(cy)
    clickOnInvoice(cy, '202001-001')
    shouldSee(cy, 'Training')
  })

  it('Should be able to get back to home page from whereever page by clicking at logo', () => {
    cy.visit('/shouldNotHaveThisPage')
    cy.contains('Page not found')
    cy.get('#app_logo').click()
    cy.contains('202001-007')
  })

  function shouldSeeLastestInvoiceNumber(cy) {
    let latestInvoiceNumber = '202001-007'
    shouldSee(cy, latestInvoiceNumber)
  }

  function clickOnInvoice(cy, invoiceNumber) {
    cy.contains(invoiceNumber).click()
  }

  function shouldSee(cy, expected) {
    cy.contains(expected)
  }

})