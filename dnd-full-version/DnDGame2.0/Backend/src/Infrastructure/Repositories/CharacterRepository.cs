using DnDGame.Domain.Entities;
using DnDGame.Application.Interfaces;
using System.Text.Json;

namespace DnDGame.Infrastructure.Repositories;

public class CharacterRepository : ICharacterRepository
{
    private readonly string _dataFilePath;
    private readonly object _lock = new();
    private List<Character> _characters = new();
    private int _nextId = 1;

    public CharacterRepository()
    {
        // Store data in the same directory as the JSON domain data
        var baseDir = AppDomain.CurrentDomain.BaseDirectory;
        var dataDir = Path.Combine(baseDir, "Backend", "src", "Domain", "Data");
        
        if (!Directory.Exists(dataDir))
        {
            dataDir = Path.Combine(baseDir, "src", "Domain", "Data");
            if (!Directory.Exists(dataDir))
            {
                dataDir = Path.Combine(baseDir, "Domain", "Data");
                if (!Directory.Exists(dataDir))
                {
                    Directory.CreateDirectory(dataDir);
                }
            }
        }
        
        _dataFilePath = Path.Combine(dataDir, "characters.json");
        LoadCharacters();
    }

    private void LoadCharacters()
    {
        lock (_lock)
        {
            if (File.Exists(_dataFilePath))
            {
                try
                {
                    var json = File.ReadAllText(_dataFilePath);
                    var characters = JsonSerializer.Deserialize<List<Character>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                    
                    if (characters != null)
                    {
                        _characters = characters;
                        _nextId = _characters.Count > 0 ? _characters.Max(c => c.Id) + 1 : 1;
                    }
                }
                catch
                {
                    // If deserialization fails, start with empty list
                    _characters = new List<Character>();
                    _nextId = 1;
                }
            }
        }
    }

    private void SaveCharacters()
    {
        lock (_lock)
        {
            try
            {
                var json = JsonSerializer.Serialize(_characters, new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                File.WriteAllText(_dataFilePath, json);
            }
            catch
            {
                // Log error in production
            }
        }
    }

    public Task<Character> AddAsync(Character character)
    {
        lock (_lock)
        {
            character.SetId(_nextId++);
            _characters.Add(character);
            SaveCharacters();
            return Task.FromResult(character);
        }
    }

    public Task<IEnumerable<Character>> GetAllAsync()
    {
        lock (_lock)
        {
            return Task.FromResult<IEnumerable<Character>>(_characters.ToList());
        }
    }

    public Task<Character?> GetByIdAsync(int id)
    {
        lock (_lock)
        {
            var character = _characters.FirstOrDefault(c => c.Id == id);
            return Task.FromResult(character);
        }
    }
}