describe('To Create New Invoice Via Invoice Duplication Feature ', () => {
    it('Can create new Invoice by duplcate from existing one', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/invoice/202001-008',
        }).as('saveInvoice')

        cy.visit('/invoices')
        duplicate_invoice('202001-007')
        cy.contains('Unsave Invoice (edit mode)')
        editInvoiceNumber('202001-008')
        editInvoiceDate('2020-01-15')
        clickSave()
        containsInvoiceNumber(cy, '202001-008')
    })
    function duplicate_invoice(invoiceNumber) {
        cy.get(`#duplicate_${invoiceNumber}`).click()
    }
    function editInvoiceNumber(invoiceNumber) {
        cy.get('#invoice-number').click().type('{selectall}'+invoiceNumber)
    }
    function editInvoiceDate(date) {
        cy.get('#invoice-date').click().type('{selectall}'+date)
    }
    function clickSave() {
        cy.get('#save-button').click()
        cy.wait('@saveInvoice')
    }
    function containsInvoiceNumber(cy, invoiceNumber) {
        cy.contains('Invoice Number')
        cy.contains(invoiceNumber)
    }
})