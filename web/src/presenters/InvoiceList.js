import PaymentInfoList from "./PaymentInfoList"

export default class extends PaymentInfoList {
  constructor(view, api) {
    super(view, api)
    this.isGeneratingReceipt = false
    this.selectedInvoices = []
  }
  toggleGenerateReceipt = () => {
    this.isGeneratingReceipt = !this.isGeneratingReceipt
  }
  get buttonColor() {
    return this.isGeneratingReceipt? 'purple': 'primary'
  }
}
