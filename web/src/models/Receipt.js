import InvoiceItem from '@/models/InvoiceItem'
import PricedInvoiceItem from '@/models/PricedInvoiceItem'
import PaymentInformation from '@/models/PaymentInformation'

export default class Receipt extends PaymentInformation {
  static createFromInvoices(invoices, today=new Date()) {
    let r = new Receipt(invoices[0])
    r.items = []
    invoices.forEach((invoice) => {
      let item = r.createPricedInvoiceItem()
      item.name = invoice.invoiceNumber
      item.price = invoice.getTotal()
      item.amount = 1
      r.items.push(item)
    })
    r.setDateToday(today)
    r.number = r.newInvoiceNumber(today)
    r._wht.price = r.getTotal() * -0.03
    return r
  }
  constructor(data) {
    super(data)
    console.log(`items length = ${this.items.length}`)
    console.log(`total = ${this.getTotal()}`)
    this._wht = new PricedInvoiceItem(this, 'WHT 3%', this.getTotal() * -0.03, 1)

    if (!data) return

    this.receiptNumber = data.receiptNumber
    this.receiptDate = data.receiptDate
    this.payment = data.payment
    this._wht = data._wht ? data._wht : this._wht
  }
  get number() { return this.receiptNumber }
  set number(n) { this.receiptNumber = n }
  get date() { return this.receiptDate }
  set date(d) { this.receiptDate = d }
  get documentType() {
    return 'Receipt'
  }
  get hasInvoiceNumber() { return true; }
  get hasReceiptNumber() { return true; }
  getItems() { return [...this.items, this.total(), this.wht(), this.tax(), this.grandTotal()] }
  wht() { return this._wht }
  grandTotal() { return new InvoiceItem('Grand Total', this.getTotal() * 1.04, this) }
  itemClass() {
    return this.items.length > 2? "small": ""
  }
  tablePaddingClass() { return this.payment === ""? "": "dense" }
}