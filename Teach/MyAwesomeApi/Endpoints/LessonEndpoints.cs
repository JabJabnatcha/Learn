using Microsoft.AspNetCore.Mvc;
using MyAwesomeApi.Domain.Entities;
using MyAwesomeApi.Application.Interfaces;
using MyAwesomeApi.Application.Services;
using MyAwesomeApi.Infrastructure.Payments;

namespace MyAwesomeApi.Endpoints;

public static class LessonEndpoints
{
    public static void MapLessons(this IEndpointRouteBuilder app)
    {
        // Root Route: Dashboard (Serves interactive wwwroot/index.html)
        app.MapGet("/", () => {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            if (System.IO.File.Exists(path))
            {
                return Results.Content(System.IO.File.ReadAllText(path), "text/html");
            }
            return Results.Content("<h1>Clean Architecture Playground</h1><p>index.html not found in wwwroot!</p>", "text/html");
        });

        // =========================================================================
        // SOLID COMPARISON ENDPOINTS
        // =========================================================================

        // --- SRP (Single Responsibility Principle) ---
        app.MapGet("/lessons/srp/bad", (string orderId, double amount, string email, BadOrderService service) =>
        {
            var result = service.PlaceOrder(orderId, amount, email);
            return Results.Ok(new
            {
                Title = "Violates SRP: PlaceOrder() calculates tax, saves to DB, and sends email all in one class service.",
                Result = result
            });
        });

        app.MapGet("/lessons/srp/good", (string orderId, double amount, string email, GoodOrderService service) =>
        {
            var result = service.PlaceOrder(orderId, amount, email);
            return Results.Ok(new
            {
                Title = "Conforms to SRP: GoodOrderService delegates tasks to TaxCalculator, OrderRepository, and EmailService classes.",
                Result = result
            });
        });

        // --- OCP (Open/Closed Principle) ---
        app.MapGet("/lessons/ocp/bad", (string gateway, double amount) =>
        {
            try
            {
                var badService = new BadCheckoutService();
                var result = badService.ProcessCheckout(gateway, amount);
                return Results.Ok(new { Title = "Violates OCP", Result = result });
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    statusCode: 500,
                    title: "Runtime Request Failure (OCP Violated)",
                    detail: $"PromptPay or PayPal fails because the class only has Stripe hardcoded in if-else branch! Exception: {ex.Message}"
                );
            }
        });

        app.MapGet("/lessons/ocp/good", (string gateway, double amount) =>
        {
            // OCP followed: We can support new gateways dynamically 
            // by implementing IPaymentGateway interface without editing core logic.
            IPaymentGateway gatewayInstance = gateway.ToLower() switch
            {
                "paypal" => new PaypalGateway(),
                "promptpay" => new PromptPayGateway(),
                _ => new StripeGateway()
            };

            var checkout = new CheckoutService(gatewayInstance);
            var result = checkout.CompleteCheckout(amount);

            return Results.Ok(new
            {
                Title = "Conforms to OCP: We injected a new gateway adapter class implementing IPaymentGateway contract directly, requiring zero changes to CheckoutService logic.",
                GatewayInjected = gatewayInstance.GetType().Name,
                Result = result
            });
        });

        // --- LSP (Liskov Substitution Principle) ---
        app.MapGet("/lessons/lsp/bad", () =>
        {
            var accounts = new List<BadBankAccount>
            {
                new BadBankAccount(1000),
                new BadFixedDepositAccount(2000) // Fixed Deposit overrides Withdraw to throw NotSupportedException
            };
            
            var results = new List<string>();
            try
            {
                foreach (var acc in accounts)
                {
                    acc.Withdraw(100); // Expecting it to work for all BadBankAccount instances!
                    results.Add($"Withdrew $100. New balance: {acc.Balance}");
                }
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    statusCode: 500,
                    title: "Runtime Application Crash (LSP Violated!)",
                    detail: $"A subclass (Fixed Deposit) broke the contract of the base class (BankAccount) by throwing an exception. Crash detail: {ex.Message}"
                );
            }
        });

        app.MapGet("/lessons/lsp/good", () =>
        {
            var savings = new SavingsAccount(1000);
            var fixedDep = new FixedDepositAccount(2000);
            
            // fixedDep cannot call Withdraw() at compile-time! 
            // The compiler guarantees type safety because FixedDepositAccount does not implement IWithdrawable.
            savings.Withdraw(100);
            
            return Results.Ok(new
            {
                Title = "Conforms to LSP: Only withdrawable accounts implement the IWithdrawable interface. Fixed deposit account was safely skipped, avoiding compilation errors and runtime crashes.",
                SavingsAccountBalanceAfterWithdrawal = savings.Balance,
                FixedDepositAccountBalance = fixedDep.Balance
            });
        });

        // --- DIP (Dependency Inversion Principle) ---
        app.MapGet("/lessons/dip/bad", (double amount) =>
        {
            var service = new BadCheckoutService();
            // Process checkout with hardcoded Stripe gateway
            var result = service.ProcessCheckout("Stripe", amount);
            return Results.Ok(new
            {
                Title = "Violates DIP: BadCheckoutService uses 'new StripeGatewayMock()' internally. Tightly coupled.",
                Result = result
            });
        });

        app.MapGet("/lessons/dip/good", (double amount, CheckoutService service) =>
        {
            // CheckoutService resolved via DI container with registered StripeGateway
            var result = service.CompleteCheckout(amount);
            return Results.Ok(new
            {
                Title = "Conforms to DIP: CheckoutService receives IPaymentGateway via its constructor (Constructor DI). Loosely coupled.",
                Result = result
            });
        });

        // =========================================================================
        // OTHER LESSON DEMOS
        // =========================================================================

        // Lesson 1: OOP Introduction (Class/Object instantiation)
        app.MapGet("/lesson1/bankaccount", (double? deposit) =>
        {
            var account = new BankAccount(1000.0);
            double depositAmount = deposit ?? 150.0;
            account.Deposit(depositAmount);

            return Results.Ok(new
            {
                Lesson = "Lesson 1: Introduction to OOP",
                Class = "BankAccount",
                InitialBalance = 1000.0,
                Deposited = depositAmount,
                CurrentBalance = account.GetBalance()
            });
        });

        // Lesson 2: Encapsulation (Guarding class fields via properties)
        app.MapGet("/lesson2/product", (double price) =>
        {
            var product = new Product();
            product.Price = price; // This calls the guarded 'set' property

            return Results.Ok(new
            {
                Lesson = "Lesson 2: Encapsulation & Properties",
                AttemptedPriceAssignment = price,
                StoredProductPrice = product.Price,
                Note = price < 0 ? "Negative price is guarded and set to 0." : "Price is valid and accepted."
            });
        });

        // Lesson 3: Inheritance & Polymorphism (Overriding base method behavior)
        app.MapGet("/lesson3/discount", (string? type) =>
        {
            string customerType = type ?? "Regular";
            Customer customer = customerType.ToUpper() switch
            {
                "VIP" => new VipCustomer("Somchai"),
                "GOLD" => new GoldCustomer("Somsri"),
                _ => new Customer("General User")
            };

            return Results.Ok(new
            {
                Lesson = "Lesson 3: Inheritance & Polymorphism",
                CustomerName = customer.Name,
                CustomerType = customerType,
                CalculatedDiscountRate = customer.GetDiscountRate(),
                PolymorphicBindingType = customer.GetType().Name
            });
        });

        // Lesson 4: Interfaces & Abstract Classes (Template Method Pattern workflow)
        app.MapGet("/lesson4/report", () =>
        {
            var generator = new FinancialReportGenerator();
            
            // We capture the Console write flows in a memory list for demonstration
            var executionLogs = new List<string>();
            generator.OnLog = (log) => executionLogs.Add(log);
            
            generator.GenerateReport();

            return Results.Ok(new
            {
                Lesson = "Lesson 4: Abstract Classes & Template Method",
                ReportWorkflowExecution = executionLogs,
                Structure = "OpenConnection() -> FetchData() [abstract] -> FormatReport() [abstract] -> CloseConnection()"
            });
        });

        // Lesson 5: Real-World Minimal API (Filtering Query and Route Parameters)
        app.MapGet("/lesson5/search", (string? name, double? minPrice) =>
        {
            var dummyProducts = new[] {
                new { Name = "Laptop", Price = 25000.00 },
                new { Name = "Mouse", Price = 500.00 },
                new { Name = "Keyboard", Price = 1200.00 }
            };

            var results = dummyProducts.Where(p => 
                (string.IsNullOrEmpty(name) || p.Name.Contains(name, StringComparison.OrdinalIgnoreCase)) &&
                (!minPrice.HasValue || p.Price >= minPrice.Value)
            );

            return Results.Ok(results);
        });

        app.MapGet("/lesson5/secure-data", () => Results.Ok(new
        {
            Message = "Success! You successfully bypassed the custom ApiKeyMiddleware by providing the correct X-Api-Key header.",
            Data = "Top-secret enterprise stats: C# performance is 100%"
        }));

        // Lesson 8: Unit Testing & TDD (Live mock test execution via code)
        app.MapGet("/lesson8/run-tests", () =>
        {
            int passedCount = 0;
            int failedCount = 0;
            var reports = new List<string>();

            // Test 1: Verify Calculator Add functionality
            try
            {
                var calculator = new Calculator();
                int res = calculator.Add(5, 10);
                if (res == 15) { passedCount++; reports.Add("Test_Calculator_Add: Passed (result equals 15)"); }
                else { failedCount++; reports.Add("Test_Calculator_Add: Failed (result was not 15)"); }
            }
            catch (Exception ex)
            {
                failedCount++;
                reports.Add($"Test_Calculator_Add: Threw exception: {ex.Message}");
            }

            // Test 2: Verify Encapsulation Price rules
            try
            {
                var product = new Product();
                product.Price = -50;
                if (product.Price == 0) { passedCount++; reports.Add("Test_Product_Encapsulation: Passed (negative price assigned to 0)"); }
                else { failedCount++; reports.Add("Test_Product_Encapsulation: Failed"); }
            }
            catch (Exception ex)
            {
                failedCount++;
                reports.Add($"Test_Product_Encapsulation: Threw exception: {ex.Message}");
            }

            return Results.Ok(new
            {
                Lesson = "Lesson 8: Unit Testing & TDD",
                MockTestRunnerStatus = "Completed Execution of Local Test Suite",
                TotalTests = passedCount + failedCount,
                Passed = passedCount,
                Failed = failedCount,
                Details = reports
            });
        });

        // Lesson 9 & 10: Service Lifetimes Visual Demonstration
        app.MapGet("/lesson9/lifetimes", (
            ITransientService t1, ITransientService t2,
            IScopedService s1, IScopedService s2,
            ISingletonService si1, ISingletonService si2) =>
        {
            return Results.Ok(new[] {
                new {
                    Lifetime = "Transient (New instance every time injected)",
                    Instance1 = t1.InstanceId,
                    Instance2 = t2.InstanceId,
                    Status = t1.InstanceId == t2.InstanceId ? "Same (Unexpected)" : "Different (Correct! Two separate instances created in one request)"
                },
                new {
                    Lifetime = "Scoped (Same instance within HTTP request, new instance on refresh)",
                    Instance1 = s1.InstanceId,
                    Instance2 = s2.InstanceId,
                    Status = s1.InstanceId == s2.InstanceId ? "Same (Correct! Reused within the request)" : "Different (Unexpected)"
                },
                new {
                    Lifetime = "Singleton (Same instance shared across the entire app lifespan)",
                    Instance1 = si1.InstanceId,
                    Instance2 = si2.InstanceId,
                    Status = si1.InstanceId == si2.InstanceId ? "Same (Correct! Reused across all requests)" : "Different (Unexpected)"
                }
            });
        });

        // Lesson 11: Clean Architecture Layer Structure Information
        app.MapGet("/lesson11/structure", () => Results.Ok(new
        {
            Lesson = "Lesson 11: Clean Architecture Structure",
            CoreRule = "Source code dependencies must always point inwards.",
            NamespacesDefinedInPlayground = new[] {
                "MyProject.Domain (Entities, Value Objects - Stable, Zero Dependencies)",
                "MyProject.Application (Use cases, Interfaces, DTOs - Depends on Domain)",
                "MyProject.Infrastructure (Database Context, API SDK Implementations - Depends on Application)",
                "MyProject.Presentation (API Endpoints, Program.cs Configurations - Outer wrapper)"
            }
        }));

        // Lesson 12: Repository Pattern (Database Decoupling)
        app.MapGet("/lesson12/products", (IProductRepository repository) =>
        {
            // Retrieve all products
            var allProducts = repository.GetAll();
            return Results.Ok(new
            {
                Lesson = "Lesson 12: Repository Pattern",
                DatabaseDialect = "In-Memory Collection Mock",
                Products = allProducts
            });
        });
    }
}
