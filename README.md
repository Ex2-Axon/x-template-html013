# x-template-html013

คำอธิบาย
---------
เทมเพลตหมายเลข 013 — หน้า Landing Page แบบสำเร็จรูป พร้อมไฟล์ตัวอย่างเพื่อแก้ไขและปรับแต่ง

สิ่งที่มีในโฟลเดอร์นี้
-----------------------
- index.html         — หน้าเว็บหลักของเทมเพลต
- css/styles.css     — สไตล์หลัก
- js/main.js         — โค้ด JavaScript ของเทมเพลต
- screenshot.mjs     — สคริปต์ Puppeteer สำหรับถ่ายภาพหน้าจอ
- assets/images/x-template-html013.png — รูปตัวอย่าง (placeholder ถ้ายังไม่แทนที่)
- assets/images/x-template-html013.md  — คำอธิบาย (แก้ไขเพื่ออัปเดตข้อมูลใน gallery)

วิธีพรีวิว (เครื่องคุณ)
------------------------
1. เปิด terminal ในโฟลเดอร์นี้
2. รัน HTTP server (ตัวอย่างด้วย Python):
`python -m http.server 8775`
3. เปิดเบราว์เซอร์ที่:
`http://localhost:8775`

ถ้าต้องการใช้สคริปต์ถ่ายภาพ:
- เรียก server ตามข้อ 2 ใน terminal แรก
- แล้วรัน:
`node screenshot.mjs`
(สคริปต์จะเข้าถึง `http://localhost:8775` ดังนั้น server ต้องรันบนพอร์ตนั้น)

วิธีอัปเดตข้อมูลใน gallery
---------------------------
- แก้ไขคำอธิบายใน `assets/images/x-template-html013.md`
- แทนที่ `assets/images/x-template-html013.png` ด้วยภาพจริงของเทมเพลต
- การเพิ่มเทมเพลตใหม่ใน gallery จะจัดการจากไฟล์ `x-template-html000/add-template.py` ซึ่งจะอัปเดต `js/main.js` ให้ (สคริปต์ควรแทรก ID ใหม่ไว้หน้าแรกตามที่ต้องการ)

หมายเหตุสำหรับผู้พัฒนา
---------------------
- หากต้องการให้เทมเพลตปรากฏใน gallery ให้แน่ใจว่า `x-template-html000/js/main.js` มี ID `013` ใน `TEMPLATE_IDS` (สคริปต์ `add-template.py` จะช่วยจัดการให้)
- รัน `python add-template.py` จากโฟลเดอร์ `x-template-html000` เพื่อสร้าง placeholder และเพิ่ม ID อัตโนมัติ
