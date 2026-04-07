using DnDGame.Domain.ValueObjects;

namespace DnDGame.Application.Services;

public class MoneyService
{
    public Money Earn(Money current, Money income)
    {
        return current.Add(income);
    }

    public Money Spend(Money current, Money cost)
    {
        return current.Subtract(cost);
    }
}