# Design model

Design model สะท้อนการออกแบบของระบบ ซึ่งจะได้แรงบันดาลใจจาก Analysis model โดยเฉพาะชื่อต่าง ๆ เพื่อให้เข้าใจง่าย อย่างไรก็ดี design model มักจะแตกต่างไป เพราะต้องออกแบบให้ระบบทำงานได้และบำรุงรักษาได้ง่ายเป็นหลัก

## LineItem

ใน Billing Document 1 ใบ จะมีหลาย ๆ รายการ (LineItems) ซึ่ง LineItem มี 4 ประเภท คือ

```mermaid
classDiagram
  note "Design model"

  class BillingDocument

  class LineItem {
    <<abstract>>
    name
    value
    +getTotal()
  }

  class PricedLineItem {
    amount
    price
  }

  class TotalLineItem
  class TaxLineItem
  class GrandTotalLineItem

  BillingDocument *--> LineItem
  PricedLineItem --|> LineItem
  TotalLineItem --|> LineItem
  TaxLineItem --|> LineItem
  GrandTotalLineItem --|> LineItem

```

- Priced : Item ที่มีราคาต่อหน่วย
- Total : รวมค่าสินค้า / บริการจากทุก PricedLineItem ใน Billing Document นั้นๆ
- Tax : ค่าภาษีมูลค่าเพิ่ม 7% จากค่า Total
- GrandTotal : รวมค่า Total และ Tax

## การคำนวณ Total


```mermaid
classDiagram
direction LR
    class BillingDocument {
	    +getCurrentValueWithCurrency()
    }

    class LineItem {
	    name
	    value
	    +getTotal()
    }

    class TotalLineItem {
    }

	<<abstract>> LineItem

    BillingDocument *--> LineItem
    TotalLineItem --|> LineItem
    TotalLineItem ..> BillingDocument

	note "Design model"
```

การคำนวณ total ของใบแจ้งหนี้ ต้องเปลี่ยน real time ตามจำนวน LineItem ที่เพิ่มลดทันที และสะท้อน currency ที่เลือกใน Billing Document ด้วย ทำให้ LineItem ต้องมี dependency กับ Billing Document ด้วย
