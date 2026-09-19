# Learning Record: Code Placement & Data Flow Across Architecture Layers

## Focus
Mastering code classification and end-to-end data flow: determining which layer each piece of code belongs to, what input it receives from whom, what responsibility it fulfills, and where/how it outputs data.

## Key Insights & Mental Model
1. **The 4 Golden Questions for Any File:**
   - *Where do I live?* (Presentation, Application, Domain, or Infrastructure?)
   - *What comes in, and from whom?* (HTTP JSON, DTO, Domain Entity, Method Params, Event payload?)
   - *What is my job?* (Protocol validation, Use-case orchestration, Invariant enforcement, or Database I/O?)
   - *What goes out, to whom, and how?* (HTTP status + JSON, Response DTO, State mutation, or SQL query?)

2. **Master Placement Mapping:**
   - **Controllers / Endpoints / Middlewares:** `Presentation` (HTTP / Protocol handling)
   - **Request/Response DTOs:** Boundary carriers between `Presentation` and `Application`
   - **Use Cases / Application Services:** `Application` (Orchestrates flow, coordinates domain and repositories)
   - **Interfaces (IRepositories, IGateways):** `Application` (Contracts owned by the use case)
   - **Domain Entities & Value Objects:** `Domain` (Pure business logic and invariants, zero external dependencies)
   - **Repository Implementations & Adapters (EF Core, Stripe, SMTP):** `Infrastructure` (Details, I/O, external systems)

3. **Inversion of Control (DIP in Practice):**
   - The Application layer owns the `IRepository` interface.
   - The Infrastructure layer implements the `IRepository`.
   - At runtime, Dependency Injection wires the infrastructure implementation into the application service.
