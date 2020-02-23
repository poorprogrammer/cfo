const express = require('express')
const app = express()
const cors = require('cors')
const invoices = require('./services/invoices')
const invoice = require('./services/invoice')

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/invoices/2020', (req, res) => {
    res.json(invoices())
})
app.get('/invoice/:invoiceNumber', function (req, res) {
    res.json(invoice(req.params.invoiceNumber))
})

module.exports = app
