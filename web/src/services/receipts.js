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

  createDTO = (receipt) => {
    let dto = {}
    Object.assign(dto, receipt)
    if(!dto.items) return dto
    dto.items.forEach((item) => {
      delete item.item
    })
    if(!dto._wht) return dto
    delete dto._wht.item
    return dto
  }
}
