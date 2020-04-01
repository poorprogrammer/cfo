describe('To Create New Invoice Via Invoice Duplication Feature ', () => {
    it('Can create new Invoice by duplcate from existing one', () => {
        cy.visit('/invoices')
        cy.get('#duplicate_202001-007').click()
        cy.contains('Unsave Invoice (edit mode)')
    })
})