describe('Invoice Page Now', () => {
  it('Visits the view invoice url should see view invoice page', () => {
    cy.visit('/invoice/202001-001')
    cy.contains('Invoice')
  })
})
