namespace MyAwesomeApi.Domain.Entities;

public class BankAccount
{
    private double _balance;
    public BankAccount(double initialBalance) { _balance = initialBalance; }
    public void Deposit(double amount) { if (amount > 0) _balance += amount; }
    public double GetBalance() => _balance;
}
