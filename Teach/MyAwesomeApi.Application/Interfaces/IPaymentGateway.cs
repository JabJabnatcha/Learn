namespace MyAwesomeApi.Application.Interfaces;

public interface IPaymentGateway
{
    string Pay(double amount);
}
