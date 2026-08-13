# 🚗 Ride-Sharing Dispatch & Billing Challenge

ยินดีต้อนรับสู่โปรเจกต์ภาคปฏิบัติสำหรับการประเมินทักษะบทเรียนที่ 1-14 ครับ โปรเจกต์นี้จะให้คุณเขียนโค้ดด้วยตัวเองทั้งหมด โดยมีคู่มือนี้บอกโครงสร้าง ความต้องการทางธุรกิจ และอ้างอิงหลักการออกแบบ โดย**ไม่มีการเฉลย Syntax หรือโค้ด C# ให้คัดลอก** 

คุณมีเวลาแนะนำในการทำโปรเจกต์นี้ **1 - 2 ชั่วโมง**

---

## 📂 โครงสร้างการแยก Layers (Clean Architecture)

โปรเจกต์นี้จะถูกแยกออกจากโฟลเดอร์บทเรียนทั่วไป โดยสร้างขึ้นมาในโฟลเดอร์ใหม่ทั้งหมด เพื่อทดสอบกฎความสัมพันธ์แบบชี้เข้าด้านใน (Inward Dependency Rule) เท่านั้น:

```text
RideSharingPractice/
├── RideSharing.Domain/            # เก็บ Entity แกนหลักธุรกิจ (ไร้ Dependencies)
├── RideSharing.Application/       # เก็บ Use Cases & Interfaces
├── RideSharing.Infrastructure/    # เก็บ Adapter ปลายทาง (InMemory DB, Console Out)
├── RideSharing.Presentation/      # Minimal API (Program.cs) & Custom Middleware
└── RideSharing.Tests/             # xUnit Test Suite สำหรับตรวจสอบโค้ด
```

---

## 🎯 รายละเอียด Milestone และหัวข้อบทเรียนที่ใช้ควบคุม

### 1. Milestone 1: Domain Modeling (บทเรียนที่ 1-3)
*   **เป้าหมาย:** สร้างโครงร่าง Class ธุรกิจสำหรับการคำนวณราคาและเก็บรายละเอียดการเดินทาง
*   **สิ่งที่ต้องทำ:**
    *   สร้างคลาสหลักสำหรับการเดินทาง ชื่อว่า `Ride`
    *   **กฎ Encapsulation (Lesson 2):** ตัวแปรระยะทาง (Distance) และยอดเงิน (Fare) ต้อง**ห้ามเป็นค่าลบโดยเด็ดขาด** หากมีการระบุระยะทางต่ำกว่าหรือเท่ากับศูนย์ ให้ปฏิเสธผ่านการโยน Exception (เช่น `ArgumentException`)
    *   **กฎ Polymorphism (Lesson 3):** สร้างคลาสย่อยที่สืบทอดเพื่อคิดราคาตามประเภทของรถโดยสาร:
        *   `StandardRide`: ค่าบริการเริ่มต้น 5 USD บวก 1.5 USD ต่อระยะทาง 1 ไมล์
        *   `PremiumRide`: ค่าบริการเริ่มต้น 10 USD บวก 3.0 USD ต่อระยะทาง 1 ไมล์

### 2. Milestone 2: Application Interfaces & Use Cases (บทเรียนที่ 4, 6, 7)
*   **เป้าหมาย:** กำหนดสัญญาการเชื่อมต่อ (Contract) และขั้นตอนการทำงาน (Use Cases)
*   **สิ่งที่ต้องทำ:**
    *   สร้าง Interface `IRideRepository` เพื่อเป็นข้อตกลงในการค้นหาและบันทึกข้อมูล `Ride`
    *   สร้าง Interface `INotificationService` สำหรับใช้ส่งข้อความแจ้งเตือนผู้ใช้งานเมื่อทำการจองสำเร็จ
    *   สร้างคลาสบริการทำงาน ชื่อว่า `RideBookingService` โดยใช้ **Constructor Injection (Lesson 7)** เพื่อรับ Interfaces ด้านบนเข้ามาทำงาน
    *   สร้างวิธีทำงาน (Method) สำหรับกดจองรถ ซึ่งจะคอยรับข้อมูลระยะทาง, ชื่อผู้โดยสาร, และสร้าง Object รถประเภทต่าง ๆ จากข้อแรก บันทึกลง Repository แล้วส่งข้อความยืนยัน

### 3. Milestone 3: Infrastructure Adapters (บทเรียนที่ 12)
*   **เป้าหมาย:** เขียนคลาสทำงานจริงที่อยู่นอกสุดของสถาปัตยกรรม
*   **สิ่งที่ต้องทำ:**
    *   สร้างคลาส `InMemoryRideRepository` ที่สืบทอดมาจาก Interface Repository ใน Layer Application โดยใช้ List ในการเก็บข้อมูลชั่วคราว
    *   สร้างคลาส `ConsoleNotificationService` เพื่อสืบทอดแจ้งเตือน โดยทำการพิมพ์ผลลัพธ์ผ่านหน้าจอ Console (`Console.WriteLine`)

### 4. Milestone 4: Presentation API & Middleware (บทเรียนที่ 5, 9, 10, 13)
*   **เป้าหมาย:** ทำระบบรับ Request จากเว็บ, ควบคุมสิทธิ์ และจัดสรรทรัพยากร
*   **สิ่งที่ต้องทำ:**
    *   สร้าง Minimal API รองรับเส้นทาง:
        *   `POST /rides/book` รับข้อมูลการจอง
        *   `GET /rides/{id}` ดึงประวัติการจองจาก Repository
    *   **Middleware Guard (Lesson 5):** เขียนตัวคั่นกลางสำหรับตรวจหา Header ชื่อ `X-Passenger-Token` หากไม่มีหรือส่งข้อมูลไม่ถูกต้อง ให้ส่งสถานะ `401 Unauthorized` กลับทันที
    *   **Dependency Injection (Lesson 9 & 10):** เลือกลงทะเบียน Lifetimes ให้เหมาะสม:
        *   Repository ข้อมูลลูกค้าควรเก็บแบบ **Singleton** เพื่อให้จองแล้วข้อมูลยังคงอยู่เมื่อเปิดเว็บบนเบราว์เซอร์ต่างหน้าต่างกัน
        *   คลาส Use Case อื่น ๆ ควรเลือกใช้แบบ **Scoped** หรือ **Transient**ตามเหมาะสม
    *   **CORS (Lesson 13):** เปิดใช้งาน CORS เพื่ออนุญาตให้ Frontend เรียกใช้ได้โดยไม่ถูกบล็อก

### 5. Milestone 5: Verification (บทเรียนที่ 8)
*   **เป้าหมาย:** ตรวจสอบความสมบูรณ์ของระบบผ่านการเทสต์อัตโนมัติ
*   **สิ่งที่ต้องทำ:**
    *   ใช้ xUnit สร้าง Test Cases:
        1.  ทดสอบว่าหากใส่ระยะทางเป็น `-10.0` จะต้องเกิด Exception จริงเพื่อยืนยันว่า Encapsulation ทำงานได้ถูกต้อง
        2.  ทดสอบค่าโดยสารของ `StandardRide` และ `PremiumRide` ว่าได้ผลลัพธ์ตรงตามสูตรคำนวณทางธุรกิจจริงหรือไม่

---

## 📊 เกณฑ์การประเมินผลระดับทักษะ (Scoring Rubric)

คุณจะได้รับคะแนนตามความสมบูรณ์ของโค้ดสถาปัตยกรรมดังนี้:

| หัวข้อเกณฑ์ประเมิน | ยอดเยี่ยม (10 คะแนน) | ปรับปรุง (5 คะแนน) |
| :--- | :--- | :--- |
| **1. SOLID: LSP Guard** | คลาสลูกคำนวณผลลัพธ์ได้สมบูรณ์โดยที่ API หรือ Client Loop ไม่เกิด Runtime Exception ล้มเหลวกลางคัน | คลาสลูกโยน `NotImplementedException` หรือพึ่งพาการเช็คประเภทภายนอก |
| **2. SOLID: DIP Separation** | คลาส Use Case ไม่รู้จักและไม่ใช้คำสั่ง `new` เพื่อเรียกใช้คลาสใด ๆ ใน Infrastructure เลย | มีการเรียกใช้คลาส InMemory หรือ Console ตรง ๆ ใน Application |
| **3. Layer Boundaries** | Project References ชี้เข้าหา `Domain` และ `Application` เท่านั้น โดย `Domain` ไม่มี Dependency ใดเลย | Domain หรือ Application มี Reference ชี้ออกไปหา Infrastructure |
| **4. DI Lifetime Strategy** | ข้อมูลประวัติการจองคงอยู่ตลอดช่วงที่โปรแกรมเปิดทำหน้าที่และแยกเซสชันได้ถูกต้อง | ข้อมูลหายไปทุกครั้งที่สิ้นสุด API Request เพราะใช้ Transient ผิดที่ |
| **5. Error Handling & Guard** | Middleware คัดกรอง Header Token สำเร็จ และ Domain ปัดป้องข้อมูลระยะทางผิดกฎอย่างทันท่วงที | ระบบปล่อยให้บันทึกข้อมูลติดลบได้ หรือ API พังแบบ 500 |
