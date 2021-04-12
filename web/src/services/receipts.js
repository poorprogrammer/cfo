import Receipt from '@/models/Receipt'
import InvoiceService from '@/services/invoices'

export default class ReceiptService extends InvoiceService {
  constructor() {
    super()
    this.root = process.env.VUE_APP_BASE_API
  }

  collectionUrl() {
    return `${this.root}/receipts/`
  }

  itemUrl(receiptNumber) {
    return `${this.root}/receipt/${receiptNumber}`
  }

  createItem = (item) => {
    return new Receipt(item)
  }

}
