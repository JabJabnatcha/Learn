using MyAwesomeApi.Application.Interfaces;

namespace MyAwesomeApi.Application.Services;

// =========================================================================
// BAD CODE (Violates DIP & OCP)
// =========================================================================
public class BadCheckoutService
{
    // 🛑 Tight coupling: directly instantiating StripeGateway using 'new'
    private readonly StripeGatewayMock _gateway = new StripeGatewayMock();

    public string ProcessCheckout(string gatewayType, double amount)
    {
        // 🛑 OCP Violated: Using if-else to choose gateway. 
        // Adding any new payment method (like PromptPay) requires editing this code!
        if (gatewayType.Equals("Stripe", System.StringComparison.OrdinalIgnoreCase))
        {
            return _gateway.PayWithStripe(amount);
        }
        else
        {
            throw new System.NotSupportedException($"Payment method '{gatewayType}' is not supported in the hardcoded BadCheckoutService!");
        }
    }
}

public class StripeGatewayMock
{
    public string PayWithStripe(double amount) => $"[STRIPE] Charged ${amount} via Stripe SDK directly.";
}

// =========================================================================
// GOOD CODE (Conforms to DIP & OCP)
// =========================================================================
public class CheckoutService
{
    private readonly IPaymentGateway _gateway;

    // DIP followed: Depend on interface contract, not concrete class details
    public CheckoutService(IPaymentGateway gateway)
    {
        _gateway = gateway;
    }

    public string CompleteCheckout(double amount)
    {
        // OCP followed: Zero if-else checks. 
        // We can add infinite new payment methods by writing new classes, no edits here!
        return _gateway.Pay(amount);
    }
}
