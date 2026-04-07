using DnDGame.Domain.Entities;

namespace DnDGame.Application.Interfaces;

public interface ICharacterRepository
{
    Task<Character> AddAsync(Character character);
    Task<IEnumerable<Character>> GetAllAsync();
    Task<Character?> GetByIdAsync(int id);
}