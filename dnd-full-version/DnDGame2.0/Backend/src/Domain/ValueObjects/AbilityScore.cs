namespace DnDGame.Domain.ValueObjects;

public class AbilityScore
{
    private readonly Dictionary<string, int> _stats = new()
    {
        { "strength", 10 },
        { "dexterity", 10 },
        { "constitution", 10 },
        { "intelligence", 10 },
        { "wisdom", 10 },
        { "charisma", 10 }
    };

    public AbilityScore() { }

    public AbilityScore(int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma)
    {
        _stats["strength"] = strength;
        _stats["dexterity"] = dexterity;
        _stats["constitution"] = constitution;
        _stats["intelligence"] = intelligence;
        _stats["wisdom"] = wisdom;
        _stats["charisma"] = charisma;
    }

    public int Get(string stat)
    {
        if (!_stats.ContainsKey(stat.ToLower()))
            throw new ArgumentException("Invalid stat", nameof(stat));

        return _stats[stat.ToLower()];
    }

    public void Set(string stat, int value)
    {
        if (value < 1 || value > 30) throw new ArgumentOutOfRangeException(nameof(value), "Ability score must be between 1 and 30.");
        if (!_stats.ContainsKey(stat.ToLower())) throw new ArgumentException("Invalid stat", nameof(stat));

        _stats[stat.ToLower()] = value;
    }

    public int GetModifier(string stat)
    {
        var value = Get(stat);
        return (value - 10) / 2;
    }

    // Convenience properties
    public int Strength => Get("strength");
    public int Dexterity => Get("dexterity");
    public int Constitution => Get("constitution");
    public int Intelligence => Get("intelligence");
    public int Wisdom => Get("wisdom");
    public int Charisma => Get("charisma");
}