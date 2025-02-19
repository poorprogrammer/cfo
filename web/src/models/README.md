# Design model

Design model สะท้อนการออกแบบของระบบ ซึ่งจะได้แรงบันดาลใจจาก Analysis model โดยเฉพาะชื่อต่าง ๆ เพื่อให้เข้าใจง่าย อย่างไรก็ดี design model มักจะแตกต่างไป เพราะต้องออกแบบให้ระบบทำงานได้และบำรุงรักษาได้ง่ายเป็นหลัก

## LineItem

ใน Billing Document 1 ใบ จะมีหลาย ๆ รายการ (LineItems) ซึ่ง LineItem มี 4 ประเภท คือ

![LineItem Types](https://uc76f066f9b9f87bf4b6b4596ec3.previews.dropboxusercontent.com/p/thumb/ACjO-0450pe0P81wUzYyYgHJEY_jJkbm8Rcwg4bRiZDRyi07Q9dJf7wuYFh4KDbW9lTFcoEpLHT_HpoaNKAfyKOQYQ14ArDy2SVNmevTbamM9SmcEadG0iXa2l15lkr4DqhJVKwM5NPITwFtUJG4roHjvNve9ZelKjTHPxtTFM3AZJtoFFub8ebwPdCzCTeqk5OrXTPvtHJTglt29CO1Z8i32cwBR1dS4CnllOVcbwaoXDX51aF5Z9NpYNp_UorUk-XH2qFTmyR7L6uF9LJTkuwrQSBmrCLi9S6zzzUWE9JlDk1Nqd_t9MReRhQ2Uv_zpfJzQ6rlp2zD0Y6MGySU-SSquUG4HEMyAoRZP9H9DU4ctQP6khCAgqn45J9vkSi5uEcuTaWf1zIt9igXG6KxzlRr/p.png?is_prewarmed=true)

- Priced : Item ที่มีราคาต่อหน่วย
- Total : รวมค่าสินค้า / บริการจากทุก PricedLineItem ใน Billing Document นั้นๆ
- Tax : ค่าภาษีมูลค่าเพิ่ม 7% จากค่า Total
- GrandTotal : รวมค่า Total และ Tax

## การคำนวณ Total

