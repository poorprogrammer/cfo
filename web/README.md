# Analysis model

Analysis model คือ model ที่สะท้อนความเป็นจริงใน domain ของปัญหานี้ จะต่างกับ Design model ที่สะท้อน design ของระบบ

## Billing archive

```mermaid
classDiagram
  class BillingArchive {
    year
  }

  class InvoiceArchive
  class QuotationArchive
  class ReceiptArchive
  class BillingDocument

  InvoiceArchive --|> BillingArchive
  QuotationArchive --|> BillingArchive
  ReceiptArchive --|> BillingArchive

  BillingArchive *-- BillingDocument : contains many

  %% Note for model type
  note "Analysis model"
  end

```

Billing archive เป็น collection ของ billing document หลาย ๆ ใบ ในระบบนี้เราจะแบ่งเก็บตามปี

## Billing document

```mermaid
classDiagram
  direction LR
  class BillingDocument

  class Invoice
  class Quotation
  class Receipt

  class LineItem {
    name
    amount
    price
  }

  Invoice --|> BillingDocument
  Quotation --|> BillingDocument
  Receipt --|> BillingDocument

  BillingDocument *-- LineItem : contains many

  %% Note for model type
  note "Analysis model"
  end
```

Billing document มี 3 ประเภท คือ
ใบเสนอราคา (Qutation), ใบแจ้งหนี้ (Invoice) และ ใบเสร็จ (Receipt)

บางครั้งใบเสร็จจะใช้เป็นใบกำกับภาษีในตัว (Tax Invoice) ซึ่งในองค์กรเราก็เลือกจะทำแบบนั้นเช่นกัน (Receipt / Tax Invoice)

LineItem คือแต่ละรายการในใบเสร็จ ซึ่งจะมีชื่อ (name), จำนวน (amount) และ ราคาต่อหน่วย (price)
