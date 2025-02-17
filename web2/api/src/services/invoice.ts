import { Database } from "../persistence/nedb";
import { Message } from "../queue/message";
import { Sender } from "../queue/sender";

interface Invoice {
  _id?: string;
  id?: string;
  invoiceNumber: string;
  invoiceDate: string;
  deleted?: boolean;
}

export class InvoiceService {
  private db: Database;
  private sender: Sender;

  constructor(db?: Database, sender?: Sender) {
    this.db = db || new Database("invoice");
    this.sender = sender || Sender.create();
  }

  get(invoiceNumber: string): Promise<Invoice | null> {
    return this.db.findOne({ invoiceNumber });
  }

  all(year: string): Promise<Invoice[]> {
    return this.db.find({
      invoiceDate: new RegExp(year),
      deleted: { $ne: true },
    });
  }

  async save(invoice: Invoice): Promise<string> {
    const savedInvoice = await this.db.insert(invoice);
    await this.sender.send(
      "invoice-created",
      Message.invoiceCreatedMessage(savedInvoice)
    );
    return savedInvoice.invoiceNumber;
  }

  update(invoice: Invoice): Promise<Invoice> {
    return this.db.update({ _id: invoice.id }, invoice);
  }
}
