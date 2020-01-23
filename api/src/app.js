const express = require('express')
const app = express()
const cors = require('cors')
const invoices = require('./services/invoices')

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/invoices/2020', (req, res) => {
    res.json(invoices())
})

module.exports = app
