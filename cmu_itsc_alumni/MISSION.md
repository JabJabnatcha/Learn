# Mission: Master the Architecture of CMU ITSC Alumni MIS

## Why
เข้าใจสถาปัตยกรรมและการทำงานของระบบ CMU Alumni MIS อย่างลึกซึ้ง โดยเฉพาะบทบาทของ Redis (Caching Layer & Resilient Fallback) และ Regex (Pattern Validation vs Span Optimization) เพื่อให้สามารถพัฒนา ตรวจสอบ และดูแลรักษาโค้ดได้อย่างถูกต้องตามข้อตกลงทางสถาปัตยกรรม

## Success looks like
- อธิบายบทบาทของ Redis ในระบบนี้ได้อย่างชัดเจน ทั้งสิ่งที่ใช้ (Report Caching) และสิ่งที่จงใจไม่ใช้ (Auth / Rate Limit) พร้อมกลไก Graceful Fallback
- อธิบายการใช้งาน Regex ในระบบนี้ (เช่น Email Template Placeholders) และเข้าใจว่าจุดใดที่ระบบจงใจไม่ใช้ Regex (เช่น Student Number Parsing) และเพราะเหตุใด
- สามารถชี้จุดใน Codebase (`RedisReportCache.cs`, `EmailTemplateValidator.cs`, `StudentNumber.cs`) ได้อย่างแม่นยำ

## Constraints
- ยึดตาม Codebase และข้อตกลงสถาปัตยกรรมจริงใน `docs/02-architecture.md`, `docs/adr/`, และโค้ดใน `Api/src/`

## Out of scope
- การคอนฟิก Redis Cluster ใน Production Kubernetes เชิงลึก
- ทฤษฎีคอมไพเลอร์เชิงลึกของ Regular Expression Engine
