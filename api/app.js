const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/spacex/invoices', (req, res) => {
    let invoices = [
        {
            invoiceNumber: '202001001',
            amount: 130000,
            invoiceDate: '2020-01-03'
        },
        {
            invoiceNumber: '202001003',
            amount: 80000,
            invoiceDate: '2020-01-07'
        },
        {
            invoiceNumber: '202001004',
            amount: 100000,
            invoiceDate: '2020-01-07'
        },
        {
            invoiceNumber: '202001005',
            amount: 150000,
            invoiceDate: '2020-01-07'
        },
    ]
    res.json(invoices)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
