import InvoiceItem from '@/models/InvoiceItem'

export default class {
    constructor (view) {
      this.view = view
      this.items = [
        new InvoiceItem({
          name: 'Developer',
          price: 20000,
          amount: 20,
        }),
        new InvoiceItem({
          name: 'Scrum master',
          price: 80,
          amount: 10,
        }),
      ]
    }
}
