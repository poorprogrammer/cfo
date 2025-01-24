import LineItem from "./LineItem";
import BillingDocument, { BillingDocumentData } from "./BillingDocument";
import Invoice from "./Invoice";

interface ReceiptData extends BillingDocumentData {
  receiptNumber?: string;
  receiptDate?: string;
}

export default class Receipt extends BillingDocument {
  protected receiptNumber?: string;
  protected receiptDate?: string;

  static createFromInvoices(
    invoices: Invoice[],
    today: Date = new Date()
  ): Receipt {
    const r = new Receipt(invoices[0] as unknown as ReceiptData);
    r.items = [];
    invoices.forEach((invoice: Invoice) => {
      const item = r.createPricedLineItem();
      item.name = invoice.number;
      item.price = invoice.getTotal();
      item.amount = 1;
      r.items.push(item as unknown as LineItem);
    });
    r.setDateToday(today);
    r.number = `R${r.newInvoiceNumber(today)}`;
    return r;
  }

  constructor(data?: ReceiptData) {
    super(data);
    if (!data) return;

    this.receiptNumber = data.receiptNumber;
    this.receiptDate = data.receiptDate;
  }

  get number(): string {
    return this.receiptNumber || "";
  }

  set number(n: string) {
    this.receiptNumber = n;
  }

  get date(): string {
    return this.receiptDate || "";
  }

  set date(d: string) {
    this.receiptDate = d;
  }

  get documentType(): string {
    return "Receipt";
  }

  get hasInvoiceNumber(): boolean {
    return true;
  }

  get hasReceiptNumber(): boolean {
    return true;
  }
  getTitles() {
    return [
      { id: 1, title: `${this.documentType}/Tax Invoice (original)`, css: "" },
      {
        id: 2,
        title: `${this.documentType}/Tax Invoice (copy)`,
        css: "print-only",
      },
    ];
  }
}
