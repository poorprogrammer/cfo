# Analysis model

Analysis model คือ model ที่สะท้อนความเป็นจริงใน domain ของปัญหานี้ จะต่างกับ Design model ที่สะท้อน design ของระบบ

## Billing archive

![BillingArchive](https://uc747fcbf814e89e6d708126b1df.previews.dropboxusercontent.com/p/thumb/AChiOi-SrSoQLorHMSdAvdLec_8eqMO_1hxE8fI3wWnvz-5D4NAzlyhoHBPWeqKwxa6wMvkQ2kMJwgpkeJzd-gQwyqms1jJEy4Lh_QMtptotFRNsOPfM5491PiKiZFh-z6zPQI4njp9lQPEvC_3ot4IwBvlsThJOJNtqD9w2Tm-jERPvIkHGCrwX6I1JQtrMTID9gwLQRYtSxV7SxEmm4Vz-WDzE_6zEKgg9uVCoWg65d3iPsf8sTUH4RGsKtsoW0YJSM7FvGVYOCQYk1VSzJzjuvM64TLysbQW8JAlih4O5Q065PVPagjpKsSSWNzqCHXfzI8OK62tN7TqM-fYhiZAC0n4FOggc2M57eSOQtBLk_D8-gq-0A-v9sTNdRBAJkX-d7n-8E4bu_6BvdUq7rRfA/p.png?is_prewarmed=true)

Billing archive เป็น collection ของ billing document หลาย ๆ ใบ ในระบบนี้เราจะแบ่งเก็บตามปี

## Billing document

![BillingDocument](https://uc6277f17c929d5d01d10204ce73.previews.dropboxusercontent.com/p/thumb/ACiDi_el5M3YkQoWnjTlQnkkaT3loR22GlAU_3SfrNrBhv0b8DkvL2Ra-72ylTVRTBtf6lYu7FiMm5Jzao-6XOzqEX1TiTWixUt7Tx8ejCdSjQsWpFgtI5qGrcxj7YIxxjGImQdBftrIgzPHYTZG1MIVo36qysLQFbdLbHAxvSpWHjtdAAwDE5QZhTls6syO1WUv64XqkW02m3L-xFXlVG3UXTqoteIQrSHOHTc-jRyROwjoGPTKRTXhNlWHyXh1uecrhuX_1NTXh3xBTYQYNibYb9utpGxPWEJB-Pc-Ywyb5jfbGNscDbxE5aZxwKuA7OyoBwBnS-C1AVOx6N3CqVd5pdiMTMsOv2P8IHg_Ulur4MmM2KGrhe-hn6PbVyeI0YxHF66gfEkyr5v_QVQWvAXy/p.png?is_prewarmed=true)

Billing document มี 3 ประเภท คือ
ใบเสนอราคา (Qutation), ใบแจ้งหนี้ (Invoice) และ ใบเสร็จ (Receipt)

บางครั้งใบเสร็จจะใช้เป็นใบกำกับภาษีในตัว (Tax Invoice) ซึ่งในองค์กรเราก็เลือกจะทำแบบนั้นเช่นกัน (Receipt / Tax Invoice)

LineItem คือแต่ละรายการในใบเสร็จ ซึ่งจะมีชื่อ (name), จำนวน (amount) และ ราคาต่อหน่วย (price)
