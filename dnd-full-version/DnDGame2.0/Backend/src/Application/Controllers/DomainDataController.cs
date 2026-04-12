using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace DnDGame.Application.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DomainDataController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public DomainDataController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpGet("options")]
    public IActionResult GetOptions()
    {
        var dataPath = FindDomainDataDirectory();
        if (dataPath is null)
        {
            return NotFound("Required domain data directory is missing.");
        }

        var racesPath = Path.Combine(dataPath, "races.json");
        var classesPath = Path.Combine(dataPath, "classes.json");
        var backgroundsPath = Path.Combine(dataPath, "backgrounds.json");

        var racesExists = System.IO.File.Exists(racesPath);
        var classesExists = System.IO.File.Exists(classesPath);
        var backgroundsExists = System.IO.File.Exists(backgroundsPath);

        if (!racesExists || !classesExists || !backgroundsExists)
        {
            return NotFound(new
            {
                message = "Required domain data files are missing.",
                dataPath,
                racesPath,
                classesPath,
                backgroundsPath,
                racesExists,
                classesExists,
                backgroundsExists,
            });
        }

        var racesJson = System.IO.File.ReadAllText(racesPath);
        var classesJson = System.IO.File.ReadAllText(classesPath);
        var backgroundsJson = System.IO.File.ReadAllText(backgroundsPath);

        using var racesDoc = JsonDocument.Parse(racesJson);
        using var classesDoc = JsonDocument.Parse(classesJson);
        using var backgroundsDoc = JsonDocument.Parse(backgroundsJson);

        var races = new List<string>();
        var subRaces = new Dictionary<string, string[]>();

        foreach (var raceProperty in racesDoc.RootElement.EnumerateObject())
        {
            races.Add(raceProperty.Name);
            if (raceProperty.Value.TryGetProperty("subRaces", out var subRacesProperty) && subRacesProperty.ValueKind == JsonValueKind.Object)
            {
                subRaces[raceProperty.Name] = subRacesProperty.EnumerateObject().Select(x => x.Name).ToArray();
            }
            else
            {
                subRaces[raceProperty.Name] = Array.Empty<string>();
            }
        }

        var classes = new List<string>();
        var subClasses = new Dictionary<string, string[]>();
        var ClassesData = new Dictionary<string, object>();
        foreach (var classProperty in classesDoc.RootElement.EnumerateObject())
        {
            var className = classProperty.Name;

            // ✅ list ชื่อ class
            classes.Add(className);

            // ✅ เก็บ data ทั้งก้อน (รวม startingEquipment)
            ClassesData[className] = JsonSerializer.Deserialize<object>(
                classProperty.Value.GetRawText()
            )!;

            // ✅ subClasses (ของเดิม)
            if (classProperty.Value.TryGetProperty("subClasses", out var subClassesProperty)
                && subClassesProperty.ValueKind == JsonValueKind.Array)
            {
                subClasses[className] = subClassesProperty
                    .EnumerateArray()
                    .Select(x => x.GetString() ?? string.Empty)
                    .Where(x => !string.IsNullOrWhiteSpace(x))
                    .ToArray();
            }
            else
            {
                subClasses[className] = Array.Empty<string>();
            }
        }

        var backgrounds = new List<string>();
        if (backgroundsDoc.RootElement.ValueKind == JsonValueKind.Array)
        {
            foreach (var backgroundElement in backgroundsDoc.RootElement.EnumerateArray())
            {
                if (backgroundElement.TryGetProperty("nameEN", out var nameEnProperty) && nameEnProperty.ValueKind == JsonValueKind.String)
                {
                    backgrounds.Add(nameEnProperty.GetString()!);
                }
                else if (backgroundElement.TryGetProperty("nameTH", out var nameThProperty) && nameThProperty.ValueKind == JsonValueKind.String)
                {
                    backgrounds.Add(nameThProperty.GetString()!);
                }
            }
        }

        var alignmentsPath = Path.Combine(dataPath, "alignment.json");
        var alignments = new List<string>();

        // Enhanced path search for alignment.json
        string? foundAlignmentPath = null;

        // First try the computed dataPath
        if (System.IO.File.Exists(alignmentsPath))
        {
            foundAlignmentPath = alignmentsPath;
        }
        else
        {
            // Build candidates from the base dataPath
            var baseDir = Path.GetDirectoryName(dataPath);
            var alignmentCandidates = new[]
            {
                Path.Combine(baseDir ?? string.Empty, "alignment.json"),
                Path.Combine(_environment.ContentRootPath, "Backend", "src", "Domain", "Data", "alignment.json"),
                Path.Combine(_environment.ContentRootPath, "src", "Domain", "Data", "alignment.json"),
                Path.Combine(_environment.ContentRootPath, "Domain", "Data", "alignment.json"),
                Path.Combine(AppContext.BaseDirectory, "Backend", "src", "Domain", "Data", "alignment.json"),
                Path.Combine(Directory.GetCurrentDirectory(), "Backend", "src", "Domain", "Data", "alignment.json"),
                Path.Combine(Directory.GetCurrentDirectory(), "src", "Domain", "Data", "alignment.json"),
            };

            foreach (var candidate in alignmentCandidates)
            {
                if (System.IO.File.Exists(candidate))
                {
                    foundAlignmentPath = candidate;
                    break;
                }
            }
        }

        if (foundAlignmentPath != null)
        {
            try
            {
                var alignmentsJson = System.IO.File.ReadAllText(foundAlignmentPath);
                using var alignmentsDoc = JsonDocument.Parse(alignmentsJson);
                if (alignmentsDoc.RootElement.ValueKind == JsonValueKind.Array)
                {
                    foreach (var alignmentElement in alignmentsDoc.RootElement.EnumerateArray())
                    {
                        if (alignmentElement.ValueKind == JsonValueKind.String)
                        {
                            var alignmentValue = alignmentElement.GetString();
                            if (!string.IsNullOrWhiteSpace(alignmentValue))
                            {
                                alignments.Add(alignmentValue);
                            }
                        }
                    }
                }
            }
            catch
            {
                // If parsing fails, alignment list remains empty
            }
        }

        return Ok(new
        {
            races,
            subRaces,
            classes,
            subClasses,
            ClassesData = ClassesData,
            backgrounds,
            alignments,
        });
    }

    private string? FindDomainDataDirectory()
    {
        string[] candidates = new[]
        {
            Path.Combine(_environment.ContentRootPath, "Backend", "src", "Domain", "Data"),
            Path.Combine(_environment.ContentRootPath, "src", "Domain", "Data"),
            Path.Combine(_environment.ContentRootPath, "..", "Backend", "src", "Domain", "Data"),
            Path.Combine(_environment.ContentRootPath, "..", "src", "Domain", "Data"),
            Path.Combine(_environment.ContentRootPath, "..", "..", "Backend", "src", "Domain", "Data"),
            Path.Combine(_environment.ContentRootPath, "..", "..", "src", "Domain", "Data"),
        };

        foreach (var candidate in candidates)
        {
            var normalized = Path.GetFullPath(candidate);
            if (Directory.Exists(normalized))
            {
                return normalized;
            }
        }

        var current = _environment.ContentRootPath;
        for (var i = 0; i < 5; i++)
        {
            current = Path.GetFullPath(Path.Combine(current, ".."));
            var parentCandidate = Path.Combine(current, "Backend", "src", "Domain", "Data");
            if (Directory.Exists(parentCandidate))
            {
                return parentCandidate;
            }

            parentCandidate = Path.Combine(current, "src", "Domain", "Data");
            if (Directory.Exists(parentCandidate))
            {
                return parentCandidate;
            }
        }

        return null;
    }
}
