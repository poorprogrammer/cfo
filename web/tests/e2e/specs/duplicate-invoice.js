describe('To Create New Invoice Via Invoice Duplication Feature ', () => {
    it('Can create new Invoice by duplcate from existing one', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/invoices/',
        }).as('saveInvoice')

        cy.visit('/invoices/2020')
        duplicate_invoice('202001-007')
        cy.contains('Unsave Invoice (edit mode)')
        editInvoiceNumber('202001-008')
        editInvoiceDate('2020-01-15')
        editItemNameOnRow(1, 'Technical coach')
        editItemPriceOnRow(1, '1000')
        clickSave()
        cy.containsOriginalInvoiceHeading()
        cy.containsInvoiceNumber('202001-008')
        cy.containsItemNameOnRow(1, 'Technical coach')
        cy.containsTotal('22,256.00')
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
    function editItemNameOnRow(row, amount) {
        cy.get(`div.v-data-table tr:nth-child(${row}) td:nth-child(1) input[type=text]`).type('{selectall}'+amount)
    }
    function editItemPriceOnRow(row, amount) {
        cy.get(`div.v-data-table tr:nth-child(${row}) td:nth-child(2) input[type=text]`).type('{selectall}'+amount)
    }
    function clickSave() {
        cy.get('#save-button').click()
        cy.wait('@saveInvoice')
    }
})