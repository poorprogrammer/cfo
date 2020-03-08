const express = require('express')
const app = express()
const cors = require('cors')
const Invoice = require('./services/invoice')

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/invoices/2020', (_, res) => {
    res.json(new Invoice().all())
})
app.get('/invoice/:invoiceNumber', function (req, res) {
    new Invoice().get(req.params.invoiceNumber).then((inv)=>{
        res.json(inv)
    })
})

module.exports = app
