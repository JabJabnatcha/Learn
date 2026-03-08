namespace DndGame.Api.Entities;

public class Character
{
    private const int MAX_LEVEL = 10;

    private static readonly Dictionary<int, int> EXP_TABLE = new()
    {
        {1,0},{2,300},{3,900},{4,2700},{5,6500},
        {6,14000},{7,23000},{8,34000},{9,48000},{10,64000}
    };

    private static readonly Dictionary<string, int> CLASS_HIT_DICE = new()
    {
        {"Fighter",10},
        {"Wizard",6},
        {"Rogue",8},
        {"Cleric",8},
        {"Paladin",10},
        {"Ranger",10},
        {"Barbarian",12},
        {"Bard",8},
        {"Monk",8},
        {"Druid",8},
        {"Sorcerer",6},
        {"Warlock",8}
    };

    private static readonly Dictionary<string,string> SKILL_MAPPING = new()
    {
        {"acrobatics","Dexterity"},
        {"animalHandling","Wisdom"},
        {"arcana","Intelligence"},
        {"athletics","Strength"},
        {"deception","Charisma"},
        {"history","Intelligence"},
        {"insight","Wisdom"},
        {"intimidation","Charisma"},
        {"investigation","Intelligence"},
        {"medicine","Wisdom"},
        {"nature","Intelligence"},
        {"perception","Wisdom"},
        {"performance","Charisma"},
        {"persuasion","Charisma"},
        {"religion","Intelligence"},
        {"sleightOfHand","Dexterity"},
        {"stealth","Dexterity"},
        {"survival","Wisdom"}
    };

    public int Id { get; set; }

    public string Name { get; set; } = "";
    public string Race { get; set; } = "";
    public string CharacterClass { get; set; } = "";

    public int Level { get; private set; }
    public int ExperiencePoints { get; private set; }

    public int Strength { get; private set; }
    public int Dexterity { get; private set; }
    public int Constitution { get; private set; }
    public int Intelligence { get; private set; }
    public int Wisdom { get; private set; }
    public int Charisma { get; private set; }

    public int MaxHP { get; private set; }
    public int CurrentHP { get; private set; }
    public int TemporaryHP { get; private set; }

    public CharacterLiveStatus Status { get; private set; } = CharacterLiveStatus.Alive;

    public HashSet<string> SkillProficiencies { get; private set; } = new();

    public CharacterProfile CharacterProfile { get; private set; } = new();

    public Wallet Wallet { get; private set; } = new();

    public Character() {}

    public Character(
        string name,
        string race,
        string characterClass,
        int level,
        int strength,
        int dexterity,
        int constitution,
        int intelligence,
        int wisdom,
        int charisma
    )
    {
        ValidateRequiredFields(name,race,characterClass);

        Name = name;
        Race = race;
        CharacterClass = characterClass;

        Level = ValidateLevel(level);

        Strength = ValidateStatScore(strength);
        Dexterity = ValidateStatScore(dexterity);
        Constitution = ValidateStatScore(constitution);
        Intelligence = ValidateStatScore(intelligence);
        Wisdom = ValidateStatScore(wisdom);
        Charisma = ValidateStatScore(charisma);

        MaxHP = CalculateMaxHP();
        CurrentHP = MaxHP;
    }

    private void ValidateRequiredFields(string name,string race,string characterClass)
    {
        if(string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Character must have name");

        if(string.IsNullOrWhiteSpace(race))
            throw new ArgumentException("Character must have race");

        if(string.IsNullOrWhiteSpace(characterClass))
            throw new ArgumentException("Character must have class");
    }

    private int ValidateStatScore(int score)
    {
        if(score < 1 || score > 30)
            throw new ArgumentException("Stat must be between 1 and 30");

        return score;
    }

    private int ValidateLevel(int level)
    {
        if(level < 1 || level > MAX_LEVEL)
            throw new ArgumentException("Level must be between 1 and 10");

        return level;
    }

    private int GetAbilityModifier(int stat)
    {
        return (int)Math.Floor((stat - 10) / 2.0);
    }

    public int GetFinalStat(string statName)
    {
        return statName switch
        {
            "Strength" => Strength,
            "Dexterity" => Dexterity,
            "Constitution" => Constitution,
            "Intelligence" => Intelligence,
            "Wisdom" => Wisdom,
            "Charisma" => Charisma,
            _ => throw new Exception("Unknown stat")
        };
    }

    public int GetSkillModifier(string skill)
    {
        if(!SKILL_MAPPING.ContainsKey(skill))
            throw new Exception($"Unknown skill: {skill}");

        var ability = SKILL_MAPPING[skill];
        int stat = GetFinalStat(ability);

        int abilityMod = GetAbilityModifier(stat);

        int proficiency = SkillProficiencies.Contains(skill)
            ? ProficiencyBonus
            : 0;

        return abilityMod + proficiency;
    }

    private int CalculateMaxHP()
    {
        if(!CLASS_HIT_DICE.ContainsKey(CharacterClass))
            throw new Exception($"Unknown class: {CharacterClass}");

        int hitDie = CLASS_HIT_DICE[CharacterClass];

        int conMod = GetAbilityModifier(Constitution);

        int maxHP = hitDie + conMod;

        int avgHitDie = (int)Math.Ceiling(hitDie / 2.0) + 1;

        for(int lvl = 2; lvl <= Level; lvl++)
        {
            maxHP += avgHitDie + conMod;
        }

        return Math.Max(1,maxHP);
    }

    public int ProficiencyBonus
    {
        get
        {
            if(Level <= 4) return 2;
            if(Level <= 8) return 3;
            return 4;
        }
    }

    public void ApplyTemporaryHP(int amount)
    {
        TemporaryHP = Math.Max(TemporaryHP, amount);
    }

    public void TakeDamage(int amount)
    {
        if(Status == CharacterLiveStatus.Dead) return;

        int remainingDamage = amount;

        if(TemporaryHP > 0)
        {
            int tempUsed = Math.Min(TemporaryHP, remainingDamage);
            TemporaryHP -= tempUsed;
            remainingDamage -= tempUsed;
        }

        if(remainingDamage > 0)
        {
            CurrentHP = Math.Max(0, CurrentHP - remainingDamage);
        }

        if(CurrentHP == 0)
        {
            Status = CharacterLiveStatus.Unconscious;
        }
    }

    public void Heal(int amount)
    {
        if(Status == CharacterLiveStatus.Dead) return;

        CurrentHP = Math.Min(MaxHP, CurrentHP + amount);

        if(CurrentHP > 0)
        {
            Status = CharacterLiveStatus.Alive;
        }
    }

    public void Pay(int cost)
    {
        if(!Wallet.CanAfford(cost))
            throw new Exception("Not enough gold");

        Wallet = Wallet.Subtract(cost);
    }

    public void Earn(int amount)
    {
        Wallet = Wallet.Add(amount);
    }

    public void MarkDead()
    {
        Status = CharacterLiveStatus.Dead;
    }

    public bool IsAlive() => Status == CharacterLiveStatus.Alive;
    public bool IsUnconscious() => Status == CharacterLiveStatus.Unconscious;
    public bool IsDead() => Status == CharacterLiveStatus.Dead;
}