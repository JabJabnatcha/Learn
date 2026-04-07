using Microsoft.AspNetCore.Mvc;
using DnDGame.Domain.Entities;
using DnDGame.Application.Services;

namespace DnDGame.Application.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharacterController : ControllerBase
{
    private readonly CharacterService _characterService;

    public CharacterController(CharacterService characterService)
    {
        _characterService = characterService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCharacter([FromBody] CreateCharacterRequest request)
    {
        try
        {
            var character = await _characterService.CreateCharacterAsync(
                request.Name,
                request.Race,
                request.SubRace,
                request.Class,
                request.SubClass,
                request.Background,
                request.Alignment,
                request.Strength,
                request.Dexterity,
                request.Constitution,
                request.Intelligence,
                request.Wisdom,
                request.Charisma,
                request.Gold
            );

            return CreatedAtAction(nameof(GetAllCharacters), new { id = character.Id }, character);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCharacters()
    {
        var characters = await _characterService.GetAllCharactersAsync();
        return Ok(characters);
    }
}

public class CreateCharacterRequest
{
    public string Name { get; set; } = string.Empty;
    public string Race { get; set; } = string.Empty;
    public string SubRace { get; set; } = string.Empty;
    public string Class { get; set; } = string.Empty;
    public string SubClass { get; set; } = string.Empty;
    public string Background { get; set; } = string.Empty;
    public string Alignment { get; set; } = string.Empty;
    public int Strength { get; set; } = 10;
    public int Dexterity { get; set; } = 10;
    public int Constitution { get; set; } = 10;
    public int Intelligence { get; set; } = 10;
    public int Wisdom { get; set; } = 10;
    public int Charisma { get; set; } = 10;
    public int Gold { get; set; } = 0;
}