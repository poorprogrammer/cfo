import { Database } from "../persistence/nedb";
import { Message } from "../queue/message";
import { Sender } from "../queue/sender";

interface Receipt {
  _id?: string;
  id?: string;
  receiptNumber: string;
  receiptDate: string;
  deleted?: boolean;
}

export class ReceiptService {
  private db: Database;
  private sender: Sender;

  constructor(db?: Database, sender?: Sender) {
    this.db = db || new Database("receipt");
    this.sender = sender || Sender.create();
  }

  get(receiptNumber: string): Promise<Receipt | null> {
    return this.db.findOne({ receiptNumber });
  }

  all(year: string): Promise<Receipt[]> {
    return this.db.find({
      receiptDate: new RegExp(year),
      deleted: { $ne: true },
    });
  }

  async save(receipt: Receipt): Promise<string> {
    const savedReceipt = await this.db.insert(receipt);
    await this.sender.send(
      "receipt-created",
      Message.receiptCreatedMessage(savedReceipt)
    );
    return savedReceipt.receiptNumber;
  }

  update(receipt: Receipt): Promise<Receipt> {
    return this.db.update({ _id: receipt.id }, receipt);
  }
}
