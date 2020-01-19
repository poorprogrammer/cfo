describe('Invoice Page Now', () => {
  it('Visits the view invoice url should see view invoice page', () => {
    cy.visit('/202001-001/invoice')
    cy.contains('Invoice')
  })
})
