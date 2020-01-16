const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const whitelist = ['http://localhost:8080']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/spacex/invoices', (req, res) => {
    let invoices = [
        {
            invoiceNumber: '202001-001',
            amount: 130000,
            invoiceDate: '2020-01-03'
        },
        {
            invoiceNumber: '202001-003',
            amount: 80000,
            invoiceDate: '2020-01-07'
        },
        {
            invoiceNumber: '202001-004',
            amount: 100000,
            invoiceDate: '2020-01-07'
        },
        {
            invoiceNumber: '202001-005',
            amount: 150000,
            invoiceDate: '2020-01-07'
        },
    ]
    res.json(invoices)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
