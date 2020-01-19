// https://docs.cypress.io/api/introduction/api.html

describe('Home Page Now', () => {
  it('Visits the app root url should see homepage and proper title', () => {
    cy.visit('/')
    cy.contains('202001-007')
  })

  it('Should be able to get back to home page from whereever page by clicking at logo', () => {
    cy.visit('/shouldNotHaveThisPage')
    cy.contains('Page not found')
    cy.get('#app_logo').click()
    cy.contains('202001-007')
  })
})
