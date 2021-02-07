const Database = require("../../src/persistence/nedb")
const Invoices = require('./invoicesData')
const Quotations = require('./quotationsData')

let invoices = Object.values(Invoices)
new Database('invoices').insert(invoices)
let quotations = Object.values(Quotations)
new Database('quotations').insert(quotations)
