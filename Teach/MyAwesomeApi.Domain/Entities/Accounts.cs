namespace MyAwesomeApi.Domain.Entities;

// =========================================================================
// BAD CODE (Violates LSP - Liskov Substitution Principle)
// =========================================================================
public class BadBankAccount
{
    public double Balance { get; protected set; }
    public BadBankAccount(double initial) { Balance = initial; }
    public virtual void Withdraw(double amt) { if (Balance >= amt) Balance -= amt; }
}

public class BadFixedDepositAccount : BadBankAccount
{
    public BadFixedDepositAccount(double initial) : base(initial) {}

    public override void Withdraw(double amt)
    {
        // 🛑 CRASH! Fixed deposit cannot withdraw early, so we throw an exception.
        // This violates LSP because a caller holding a BadBankAccount reference 
        // expects it to work, but it crashes the application at runtime.
        throw new System.NotSupportedException("Fixed deposit accounts cannot withdraw money early!");
    }
}

// =========================================================================
// GOOD CODE (Conforms to LSP)
// =========================================================================
public interface IWithdrawable
{
    void Withdraw(double amt);
}

public class SavingsAccount : IWithdrawable
{
    public double Balance { get; private set; }
    public SavingsAccount(double initial) { Balance = initial; }
    public void Withdraw(double amt) { if (Balance >= amt) Balance -= amt; }
}

public class FixedDepositAccount
{
    public double Balance { get; private set; }
    public FixedDepositAccount(double initial) { Balance = initial; }
    // We DO NOT implement IWithdrawable here. 
    // The compiler will prevent any invalid call at compile-time instead of crashing at runtime.
}
