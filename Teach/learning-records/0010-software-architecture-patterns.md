# Learning Record: Software Architecture Patterns (2nd Edition) — Mark Richards

## Topic
Software Architecture Styles, Classification (Monolithic vs Distributed), Partitioning (Technical vs Domain), and Trade-off Analysis.

## Context & Key Insights
- เข้าใจความแตกต่างเชิงลำดับชั้นระหว่าง **Architecture Style** (ภาพรวมระดับระบบ เช่น Layered, Microservices), **Architecture Pattern** (บล็อกแก้ปัญหาระบบ เช่น CQRS, Saga), และ **Design Pattern** (การจัดโครงสร้างโค้ดระดับคลาส เช่น Factory, Strategy)
- ตระหนักถึงกับดัก **"The Big Ball of Mud"** เมื่อพัฒนาซอฟต์แวร์โดยไร้สถาปัตยกรรมที่ชัดเจน
- เข้าใจ 2 มิติของการจัดแบ่งระบบ:
  1. **Monolithic vs Distributed**: การแลกเปลี่ยนระหว่างความเรียบง่าย/ต้นทุนต่ำ กับการขยายตัว/ความทนทานต่อข้อผิดพลาด (และเข้าใจ 8 Fallacies of Distributed Computing)
  2. **Technical vs Domain Partitioning**: การจัดกลุ่มโค้ดตามหน้าที่ทางเทคนิค (Layered, Space-Based) เทียบกับการจัดกลุ่มตามขอบเขตธุรกิจ (Microservices) และความสอดคล้องกับกฎของ Conway (Conway's Law)
- วิเคราะห์ 5 รูปแบบสถาปัตยกรรมหลักพร้อม Trade-offs และ Scorecard:
  1. **Layered Architecture**: Closed/Open layers, Layers of Isolation, Sinkhole Anti-Pattern
  2. **Microkernel Architecture**: Core system, Plug-in modules, Registry, Contracts
  3. **Event-Driven Architecture**: Decoupled async event processors, Event-Driven vs Message-Driven, Pub/Sub channels
  4. **Microservices Architecture**: Single-purpose units, Bounded Context, Distributed Data, Operational Automation
  5. **Space-Based Architecture**: In-Memory Data Grid, Data Pumps, Data Writers/Readers, Virtualized Middleware, แก้ปัญหา Database Bottleneck
