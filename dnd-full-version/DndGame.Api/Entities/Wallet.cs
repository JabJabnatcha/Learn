namespace DndGame.Api.Entities;

public class Wallet
{
    public int Gold { get; private set; }

    public Wallet(int gold = 0)
    {
        Gold = gold;
    }

    public bool CanAfford(int cost)
    {
        return Gold >= cost;
    }

    public Wallet Add(int amount)
    {
        return new Wallet(Gold + amount);
    }

    public Wallet Subtract(int amount)
    {
        return new Wallet(Gold - amount);
    }
}