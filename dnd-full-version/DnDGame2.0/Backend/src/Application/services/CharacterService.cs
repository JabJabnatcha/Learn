using DnDGame.Domain.Entities;
using DnDGame.Domain.ValueObjects;
using DnDGame.Application.Interfaces;

namespace DnDGame.Application.Services;

public class CharacterService
{
    private readonly ICharacterRepository _characterRepository;

    public CharacterService(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Character> CreateCharacterAsync(
        string name,
        string race,
        string subRace,
        string @class,
        string subClass,
        string background,
        string alignment = "",
        int strength = 10,
        int dexterity = 10,
        int constitution = 10,
        int intelligence = 10,
        int wisdom = 10,
        int charisma = 10,
        int gp = 0)
    {
        var abilityScores = new AbilityScore(strength, dexterity, constitution, intelligence, wisdom, charisma);
        var money = new Money(gp: gp);
        var character = new Character(name, race, subRace, @class, subClass, background, alignment, abilityScores, money);

        return await _characterRepository.AddAsync(character);
    }

    public async Task<IEnumerable<Character>> GetAllCharactersAsync()
    {
        return await _characterRepository.GetAllAsync();
    }
}