const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Invoice = require('./services/invoice')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/invoices/:year', (req, res) => {
    new Invoice().all(req.params.year).then((invoices) => {
        res.json(invoices)
    })
})
app.get('/invoice/:invoiceNumber', function (req, res) {
    new Invoice().get(req.params.invoiceNumber).then((inv)=>{
        res.json(inv)
    })
})
app.post('/invoice/:invoiceNumber', function (req, res) {
    new Invoice().save(req.body).then((inv)=>{
        res.json(inv.invoiceNumber)
    })
})

module.exports = app
