namespace MyAwesomeApi.Application.Services;

// =========================================================================
// BAD CODE (Violates SRP - Single Responsibility Principle)
// =========================================================================
public class BadOrderService
{
    public string PlaceOrder(string orderId, double amount, string email)
    {
        // 1. Tax calculation logic
        double tax = amount * 0.07;
        double total = amount + tax;

        // 2. Database saving logic (hardcoded simulate)
        string dbLog = $"[DB] Saved order {orderId} with total {total} to PostgreSQL Database.";

        // 3. Email notification sending logic (hardcoded simulate)
        string emailLog = $"[EMAIL] Sent invoice details to {email}.";

        return $"{dbLog} | {emailLog} | Status: Success (SRP Violated because this class has 3 reasons to change: Tax, DB, or Email configurations)";
    }
}

// =========================================================================
// GOOD CODE (Conforms to SRP)
// =========================================================================
public class TaxCalculator
{
    public double Calculate(double amt) => amt * 0.07;
}

public class OrderRepository
{
    public string Save(string orderId, double total) => $"[DB] Saved order {orderId} with total {total} cleanly.";
}

public class EmailService
{
    public string Send(string to) => $"[EMAIL] Cleanly sent notification email to {to}.";
}

public class GoodOrderService
{
    private readonly TaxCalculator _tax;
    private readonly OrderRepository _repo;
    private readonly EmailService _email;

    public GoodOrderService(TaxCalculator tax, OrderRepository repo, EmailService email)
    {
        _tax = tax;
        _repo = repo;
        _email = email;
    }

    public string PlaceOrder(string orderId, double amount, string email)
    {
        double tax = _tax.Calculate(amount);
        double total = amount + tax;
        
        string dbResult = _repo.Save(orderId, total);
        string emailResult = _email.Send(email);

        return $"{dbResult} | {emailResult} | Status: Success (SRP followed - each class has exactly 1 reason to change)";
    }
}
