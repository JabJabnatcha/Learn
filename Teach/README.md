# Clean Architecture Playground - Run Guide

This repository contains a 4-project decoupled implementation of the **C#/.NET Clean Architecture** learning curriculum. 

---

## 📂 Project Structure Overview

The system is split into four distinct layers conforming to the Clean Architecture Dependency Rule (dependencies point inward):

1. **`MyAwesomeApi.Domain` (Core / Entities):** Contains business entities and pure business rules. No dependencies.
2. **`MyAwesomeApi.Application` (Use Cases / Contracts):** Contains repository interfaces, DTOs, and orchestrating services. Depends only on `Domain`.
3. **`MyAwesomeApi.Infrastructure` (Concretions / Adapters):** Contains implementations for database context, email sending, payments, and lifetimes. Depends on `Application`.
4. **`MyAwesomeApi` (Presentation / API):** Entry point of the application containing `Program.cs`, CORS policies, middlewares, and Minimal API routes. Depends on `Infrastructure` and `Application`.

---

## 🛠️ Prerequisites

- **.NET 10.0 SDK** (already installed on this machine).

---

## 🚀 How to Run the Project

### Step 1: Open Terminal
Open a PowerShell or Command Prompt terminal and navigate to the project root directory:
```bash
cd "c:\Users\Laptop-JAB\Desktop\Learn\Teach"
```

### Step 2: Build the Solution
Compile all 4 projects to verify that compilation boundaries are respected and there are no syntax errors:
```bash
dotnet build
```

### Step 3: Run the Web API
Navigate into the Presentation layer project (`MyAwesomeApi`) and start the server:
```bash
cd MyAwesomeApi
dotnet run
```
*(Alternatively, you can run `dotnet watch` to start the app in watcher mode, which automatically recompiles and hot-reloads the server on code changes).*

### Step 4: Open in Browser
Once started, the API will be listening on:
👉 **[http://localhost:5239](http://localhost:5239)**

Open this URL in your web browser to access the **Interactive Architecture Playground Dashboard** listing all available lesson examples.

---

## 🔗 Available Lesson Endpoints

Here is the directory of endpoints mapped to run the example code of each lesson:

| Lesson | Endpoint URL | Description |
|---|---|---|
| **Lesson 1** | `/lesson1/bankaccount?deposit=100` | Instantiates `BankAccount` class and prints balance flow. |
| **Lesson 2** | `/lesson2/product?price=-50` | Demonstrates <mark>Encapsulation</mark> validator (rejects negative numbers). |
| **Lesson 3** | `/lesson3/discount?type=VIP` | Runs polymorphic calculation based on Customer types. |
| **Lesson 4** | `/lesson4/report` | Executes abstract `ReportGenerator` Template Method workflow. |
| **Lesson 5** | `/lesson5/search?name=Laptop` | Minimal API query filtering. |
| **Lesson 5** | `/lesson5/secure-data` | **Secure endpoint:** requires header `X-Api-Key: Secret_123` to pass the custom `ApiKeyMiddleware`. |
| **Lesson 6** | `/lesson6/lsp?type=Fixed&amount=100` | LSP test. Fixed Accounts block withdrawals at compile-time instead of throwing runtime errors. |
| **Lesson 7** | `/lesson7/checkout?amount=250` | DIP constructor injection test via `IPaymentGateway`. |
| **Lesson 8** | `/lesson8/run-tests` | Runs a mock Unit Test runner executing assertions. |
| **Lesson 9 & 10** | `/lesson9/lifetimes` | Visual comparison of Transient, Scoped, and Singleton lifetimes. |
| **Lesson 11** | `/lesson11/structure` | Returns namespaces mapping and Clean Architecture rules. |
| **Lesson 12** | `/lesson12/products` | Simulates Repository database decoupling retrieval. |

---

## 🧪 Testing the ApiKeyMiddleware (Lesson 5)

To test the middleware pipeline short-circuit behavior:
1. Try accessing `/lesson5/secure-data` directly in your browser. You will receive a `401 Unauthorized` JSON error.
2. Use an API client (like Postman, curl, or VS Code HTTP client) to send a GET request with the validation header:
   - **Header key:** `X-Api-Key`
   - **Header value:** `Secret_123`
3. The middleware will authorize your request and return the secret data successfully.
