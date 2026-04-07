using DnDGame.Domain.ValueObjects;

namespace DnDGame.Domain.Entities;

public class Character
{
    public int Id { get; private set; }
    public string Name { get; private set; } = string.Empty;

    // ===== Core Info =====
    public string Race { get; private set; } = string.Empty;
    public string SubRace { get; private set; } = string.Empty;
    public string Class { get; private set; } = string.Empty;
    public string SubClass { get; private set; } = string.Empty;
    public string Background { get; private set; } = string.Empty;
    public string Alignment { get; private set; } = string.Empty;

    // ===== Ability Scores =====
    public AbilityScore AbilityScores { get; private set; } = new();

    // ===== Economy =====
    public Money Money { get; private set; } = new();

    // ===== Inventory =====
    public List<string> Inventory { get; private set; } = new();

    // ===== Constructors =====
    private Character() { } // For EF Core

    public Character(
        string name,
        string race,
        string subRace,
        string @class,
        string subClass,
        string background,
        string alignment = "",
        AbilityScore? abilityScores = null,
        Money? money = null
    )
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Race = race ?? throw new ArgumentNullException(nameof(race));
        SubRace = subRace ?? string.Empty;
        Class = @class ?? throw new ArgumentNullException(nameof(@class));
        SubClass = subClass ?? string.Empty;
        Background = background ?? throw new ArgumentNullException(nameof(background));
        Alignment = alignment ?? string.Empty;
        AbilityScores = abilityScores ?? new AbilityScore();
        Money = money ?? new Money();
    }

    // ===== Methods =====
    public void SetId(int id)
    {
        if (Id != 0) throw new InvalidOperationException("Id can only be set once.");
        Id = id;
    }

    public void UpdateBasicInfo(
        string name,
        string race,
        string subRace,
        string @class,
        string subClass,
        string background,
        string alignment = ""
    )
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Race = race ?? throw new ArgumentNullException(nameof(race));
        SubRace = subRace ?? string.Empty;
        Class = @class ?? throw new ArgumentNullException(nameof(@class));
        SubClass = subClass ?? string.Empty;
        Background = background ?? throw new ArgumentNullException(nameof(background));
        Alignment = alignment ?? string.Empty;
    }

    public void SetAbilityScores(AbilityScore abilityScores)
    {
        AbilityScores = abilityScores ?? throw new ArgumentNullException(nameof(abilityScores));
    }

    public void AddMoney(Money amount)
    {
        Money = Money.Add(amount);
    }

    public void SubtractMoney(Money amount)
    {
        Money = Money.Subtract(amount);
    }

    public void AddToInventory(string item)
    {
        if (string.IsNullOrWhiteSpace(item)) throw new ArgumentException("Item cannot be empty.", nameof(item));
        Inventory.Add(item);
    }

    public void RemoveFromInventory(string item)
    {
        Inventory.Remove(item);
    }
}