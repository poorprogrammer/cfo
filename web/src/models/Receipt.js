import InvoiceItem from '@/models/InvoiceItem'
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
    return r
  }
  constructor(data) {
    super(data)
    if (!data) return

    this.receiptNumber = data.receiptNumber
    this.receiptDate = data.receiptDate
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
  getItems() { return [...this.items, this.total(), this.tax(), this.grandTotal()] }
  grandTotal() { return new InvoiceItem('Grand Total', this.getTotal() + this.tax().t, this) }
  itemClass() {
    return this.items.length > 2? "small": ""
  }
  tablePaddingClass() { return this.payment === ""? "": "dense" }
}