namespace DnDGame.Domain.ValueObjects;

public class Money
{
    public int PP { get; private set; }
    public int GP { get; private set; }
    public int SP { get; private set; }
    public int CP { get; private set; }

    public Money(int pp = 0, int gp = 0, int sp = 0, int cp = 0)
    {
        PP = pp;
        GP = gp;
        SP = sp;
        CP = cp;

        Normalize();
    }

    // แปลงให้เป็นหน่วยเดียว (optional แต่โคตรดี)
    private void Normalize()
    {
        SP += CP / 10;
        CP %= 10;

        GP += SP / 10;
        SP %= 10;

        PP += GP / 10;
        GP %= 10;
    }

    public Money Add(Money other)
    {
        return new Money(
            PP + other.PP,
            GP + other.GP,
            SP + other.SP,
            CP + other.CP
        );
    }

    public Money Subtract(Money other)
    {
        var total = ToCopper() - other.ToCopper();
        if (total < 0)
            throw new InvalidOperationException("Not enough money");

        return FromCopper(total);
    }

    public long ToCopper()
    {
        return (long)PP * 1000 + GP * 100 + SP * 10 + CP;
    }

    public static Money FromCopper(long copper)
    {
        var pp = copper / 1000;
        copper %= 1000;
        var gp = copper / 100;
        copper %= 100;
        var sp = copper / 10;
        var cp = copper % 10;

        return new Money((int)pp, (int)gp, (int)sp, (int)cp);
    }

    public bool CanAfford(Money cost)
    {
        return ToCopper() >= cost.ToCopper();
    }

    public static Money FromCopper(int copper)
    {
        int pp = copper / 1000;
        copper %= 1000;

        int gp = copper / 100;
        copper %= 100;

        int sp = copper / 10;
        copper %= 10;

        int cp = copper;

        return new Money(pp, gp, sp, cp);
    }
}