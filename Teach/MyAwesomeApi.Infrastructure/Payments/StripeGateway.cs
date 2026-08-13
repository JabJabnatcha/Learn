using MyAwesomeApi.Application.Interfaces;

namespace MyAwesomeApi.Infrastructure.Payments;

public class StripeGateway : IPaymentGateway
{
    public string Pay(double amount) => $"[STRIPE SUCCESS] Processed charge of ${amount}";
}

public class PaypalGateway : IPaymentGateway
{
    public string Pay(double amount) => $"[PAYPAL SUCCESS] Processed charge of ${amount} via PayPal Express checkout.";
}

public class PromptPayGateway : IPaymentGateway
{
    public string Pay(double amount) => $"[PROMPTPAY SUCCESS] Generated QR Code for standard PromptPay amount of {amount} THB.";
}

