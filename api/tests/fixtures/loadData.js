const Database = require("../../src/persistence/nedb")
const Invoices = require('./invoicesData')
const Quotations = require('./quotationsData')

let invoices = Object.values(Invoices)
new Database('invoice').insert(invoices)
let quotations = Object.values(Quotations)
new Database('quotation').insert(quotations)
