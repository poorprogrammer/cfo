interface Company {
  name: string;
  address: string;
  taxId: string;
  tel: string;
}

interface Item {
  name: string;
  price: string;
  amount: number;
  getPrice(): string;
  getTotal(): string;
}

export default class Invoice {
  id?: string;
  invoiceNumber = "";
  invoiceDate = "";
  quotationNumber = "";
  purchaseOrderNumber = "";
  remark = "";
  projectName = "";
  fromCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  targetCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  items: Item[] = [];
  deleted?: boolean;
  currency = "THB";

  constructor(data: Partial<Invoice>) {
    Object.assign(this, data);
  }

  get hasInvoiceNumber() {
    return true;
  }

  getItems(): Item[] {
    return this.items;
  }

  addItemBefore(): void {
    this.items.push({ name: "", price: "", amount: 0 } as Item);
  }

  itemClass(): string {
    return this.items.length > 3 ? "small" : "";
  }

  currentTimestamp(): string {
    return Date.now().toString();
  }

  markAsDeleted(): void {
    this.deleted = true;
    this.invoiceNumber = `${
      this.invoiceNumber
    }-cancelled-${this.currentTimestamp()}`;
  }
}
