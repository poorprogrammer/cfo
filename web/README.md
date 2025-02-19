# Analysis model

Analysis model คือ model ที่สะท้อนความเป็นจริงใน domain ของปัญหานี้ จะต่างกับ Design model ที่สะท้อน design ของระบบ

## Billing archive

![BillingArchive](https://uc747fcbf814e89e6d708126b1df.previews.dropboxusercontent.com/p/thumb/AChiOi-SrSoQLorHMSdAvdLec_8eqMO_1hxE8fI3wWnvz-5D4NAzlyhoHBPWeqKwxa6wMvkQ2kMJwgpkeJzd-gQwyqms1jJEy4Lh_QMtptotFRNsOPfM5491PiKiZFh-z6zPQI4njp9lQPEvC_3ot4IwBvlsThJOJNtqD9w2Tm-jERPvIkHGCrwX6I1JQtrMTID9gwLQRYtSxV7SxEmm4Vz-WDzE_6zEKgg9uVCoWg65d3iPsf8sTUH4RGsKtsoW0YJSM7FvGVYOCQYk1VSzJzjuvM64TLysbQW8JAlih4O5Q065PVPagjpKsSSWNzqCHXfzI8OK62tN7TqM-fYhiZAC0n4FOggc2M57eSOQtBLk_D8-gq-0A-v9sTNdRBAJkX-d7n-8E4bu_6BvdUq7rRfA/p.png?is_prewarmed=true)

Billing archive เป็น collection ของ billing document หลาย ๆ ใบ ในระบบนี้เราจะแบ่งเก็บตามปี

## Billing document

![BillingDocument](https://uc3e555119eb3f96bed54ef4183b.previews.dropboxusercontent.com/p/thumb/AChzSQFrfxoRti3pOMesPUJvx_4c_pmqZzXtrQqLmm-MT4nrntloWvralGSuJ9IjHlvhJgVPUSWahi_jvVeB76gs6FQPQzwYs7UC-2tlazybVNcH4MDxFJIZl167auY7qlb_lixS4zMVQ9DgJ8LC_pfaay1YOLxBsySLaC8ap8K9KxOBq7R4_lLrcpY5QKq5Kh1fE3OvoinWIVZh6ErABni0lSvsa_OJKNGW0G3dd5QT8PPY1M5XQeMdEpc5rBGzGCbtWkeAKb0dwKFZxA3F4jYRzVl-8MX_zbny7N8opqdwmQx6DfSwf3Brw3H7gm59T1z6aMSV1dZOLRnZBD3coISLEnCKFrkAXr40XBVd4hb0d-OPnq2LBzUJ9_jDbgYecR-5-hJzmGYvROZW3WGG47Nm/p.png?is_prewarmed=true)

Billing document มี 3 ประเภท คือ
ใบเสนอราคา (Qutation), ใบแจ้งหนี้ (Invoice) และ ใบเสร็จ (Receipt)

บางครั้งใบเสร็จจะใช้เป็นใบกำกับภาษีในตัว (Tax Invoice) ซึ่งในองค์กรเราก็เลือกจะทำแบบนั้นเช่นกัน (Receipt / Tax Invoice)

