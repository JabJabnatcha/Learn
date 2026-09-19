# CMU ITSC Alumni MIS Resources

## Knowledge

- [System Architecture (docs/02-architecture.md)](file:///c:/Users/Laptop-JAB/Desktop/Learn/cmu_itsc_alumni/cmu_itsc_alumni/docs/02-architecture.md)
  เอกสารสถาปัตยกรรมหลักของระบบ อธิบาย Caching Strategy ใน §3.4 และภาพรวมสถาปัตยกรรมทั้งหมด
- [ADR 0003: Refresh-token-only Revocation](file:///c:/Users/Laptop-JAB/Desktop/Learn/cmu_itsc_alumni/cmu_itsc_alumni/docs/adr/0003-refresh-token-only-revocation.md)
  การตัดสินใจยกเลิก Redis ออกจาก Authentication Critical Path เพื่อรักษา Availability 99%
- [Redis Report Cache (RedisReportCache.cs)](file:///c:/Users/Laptop-JAB/Desktop/Learn/cmu_itsc_alumni/cmu_itsc_alumni/Api/src/Cmu.Alumni.Api/Reports/Caching/RedisReportCache.cs)
  โค้ดการทำงานของ Redis Caching พร้อม Resilient Non-blocking Fallback เมื่อ Redis ดาวน์
- [Email Template Validator (EmailTemplateValidator.cs)](file:///c:/Users/Laptop-JAB/Desktop/Learn/cmu_itsc_alumni/cmu_itsc_alumni/Api/src/Cmu.Alumni.Api/Infrastructure/Email/EmailTemplateValidator.cs)
  การใช้ Source-Generated Regex `[GeneratedRegex]` ในการตรวจสอบ placeholder ของอีเมล
- [Student Number Parser (StudentNumber.cs)](file:///c:/Users/Laptop-JAB/Desktop/Learn/cmu_itsc_alumni/cmu_itsc_alumni/Api/src/Cmu.Alumni.Api/Alumni/StudentNumber.cs)
  ตัวอย่างการประมวลผลข้อความที่จงใจไม่ใช้ Regex โดยใช้ `ReadOnlySpan<char>` เพื่อประสิทธิภาพและความแม่นยำทางโดเมน

## Wisdom (Communities)

- [.NET Architecture & Distributed Caching Best Practices](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/distributed)
  แนวทางการออกแบบ Resilient Caching ใน ASP.NET Core
- [StackExchange.Redis Official Documentation](https://stackexchange.github.io/StackExchange.Redis/)
  คู่มือและการตั้งค่า Client Redis สำหรับ .NET
