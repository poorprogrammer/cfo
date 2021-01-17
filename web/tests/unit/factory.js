import Invoice from "../../src/models/Invoice";

export class Factory {
  static json = {
    amount: 130000,
    projectName: "React",
    fromCompany: {
      name: "ODDS HQ",
      address: "69 We are not hiring",
      taxId: "0100000000000",
      tel: "+66896669999",
    },
    targetCompany: {
      name: "Facebook HQ",
      address: "1601 Willow Rd Menlo Park, California",
      taxId: "0100008000007",
      tel: "+1 650-960-1300",
    },
    invoiceDate: "2020-01-03",
    invoiceNumber: "202001-001",
    quotationNumber: "201912-060",
    purchaseOrderNumber: "PO 20034910343",
    remark: "Dec 2019",
    items: [
      {
        name: "Developer",
        price: 20000,
        amount: 20,
      },
      {
        name: "Scrum master",
        price: 80,
        amount: 10,
      },
    ],
    _id: "oRFlyXTZX9cV6hIS",
  };

  static createInvoice() {
    return new Invoice(Factory.json);
  }
}
