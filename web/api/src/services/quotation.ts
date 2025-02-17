import { Database } from "../persistence/nedb";
import { Message } from "../queue/message";
import { Sender } from "../queue/sender";

interface Quotation {
  _id?: string;
  id?: string;
  quotationNumber: string;
  quotationDate: string;
  deleted?: boolean;
}

export class QuotationService {
  private db: Database;
  private sender: Sender;

  constructor(db?: Database, sender?: Sender) {
    this.db = db || new Database("quotation");
    this.sender = sender || Sender.create();
  }

  get(quotationNumber: string): Promise<Quotation | null> {
    return this.db.findOne({ quotationNumber });
  }

  all(year: string): Promise<Quotation[]> {
    return this.db.find({
      quotationDate: new RegExp(year),
      deleted: { $ne: true },
    });
  }

  async save(quotation: Quotation): Promise<string> {
    const savedQuotation = await this.db.insert(quotation);
    await this.sender.send(
      "quotation-created",
      Message.quotationCreatedMessage(savedQuotation)
    );
    return savedQuotation.quotationNumber;
  }

  update(quotation: Quotation): Promise<Quotation> {
    return this.db.update({ _id: quotation.id }, quotation);
  }
}
