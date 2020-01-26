// https://docs.cypress.io/api/introduction/api.html

describe('Home Page Now', () => {
  it('Prints an old invoice', () => {
    cy.visit('/')
    shouldSeeLastestInvoiceNumber(cy)
    gotoSecondPage(cy)
    clickOnInvoice(cy, '202001-001')
    shouldSee(cy, 'Training')
  })

  function shouldSeeLastestInvoiceNumber(cy) {
    let latestInvoiceNumber = '202001-007'
    shouldSee(cy, latestInvoiceNumber)
  }

  function gotoSecondPage(cy) {
    cy.get('.v-data-footer__icons-after').click()
  }

  function clickOnInvoice(cy, invoiceNumber) {
    cy.contains(invoiceNumber).click()
  }

  function shouldSee(cy, expected) {
    cy.contains(expected)
  }

  it('Should be able to get back to home page from whereever page by clicking at logo', () => {
    cy.visit('/shouldNotHaveThisPage')
    cy.contains('Page not found')
    cy.get('#app_logo').click()
    cy.contains('202001-007')
  })
})
