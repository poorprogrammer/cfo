const Database = require("../../src/persistence/nedb")
const Invoices = require('./invoicesData')

let invoices = Object.values(Invoices)
new Database('invoices').insert(invoices)
