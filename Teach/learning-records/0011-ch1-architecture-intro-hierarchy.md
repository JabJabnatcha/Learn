# Learning Record: Chapter 1 — Architecture Introduction & Hierarchy

## Focus
Understanding why architecture matters, the dangers of the Big Ball of Mud anti-pattern, and distinguishing the 3-tier hierarchy: Architecture Style vs. Architecture Pattern vs. Design Pattern.

## Key Takeaways
- **The Big Ball of Mud Anti-Pattern:** Occurs when development proceeds without a deliberate architecture. Leads to brittle, highly-coupled systems that are difficult to change, scale, or reason about.
- **The 3-Tier Hierarchy:**
  1. *Architecture Style:* Defines the macro structure of the system (e.g., Layered, Microkernel, Event-Driven, Microservices, Space-Based).
  2. *Architecture Pattern:* Reusable structural building block within an architecture style to solve a specific problem (e.g., CQRS, Saga, Circuit Breaker).
  3. *Design Pattern:* Code-level structuring within classes and objects (e.g., Builder, Factory, Strategy).
- **Hybrid Styles:** Architecture styles in practice are frequently combined (e.g., Event-Driven Microservices, Space-Based Microservices).
