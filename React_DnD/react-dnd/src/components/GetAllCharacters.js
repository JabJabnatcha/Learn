import { useEffect, useState } from "react";
import { getAllCharacters as getAllCharactersService } from "../Application/services/getAllCharacters.js";

const SKILLS = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

function GetAllCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      const chars = await getAllCharactersService();
      setCharacters(chars);
    }
    fetchCharacters();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>All Characters</h2>
      <div>{characters.length === 0 ? <p>No characters found.</p> : null}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {characters
          .filter((c) => c && c.charId)
          .map((c) => {
            return (
              <div
                key={c.charId}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3>{c.name}</h3>
                <p>
                  <strong>Alignment:</strong> {c.alignment}
                </p>
                <p>
                  <strong>Race:</strong> {c.race}
                </p>
                <p>
                  <strong>Subrace:</strong> {c.subRace || "Not Available"}
                </p>
                <p>
                  <strong>Class:</strong> {c.characterClass}
                </p>
                <p>
                  <strong>Subclass:</strong>{" "}
                  {c.characterSubClass || "Not Available"}
                </p>
                <p>
                  <strong>Level:</strong> {c.level}
                </p>
                <p>
                  <strong>HP:</strong> {c.currentHP}/{c.maxHP}
                </p>
                <p>
                  <strong>Speed:</strong> {c.speed} ft.
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {c.languages?.join(", ") || "Not Available"}
                </p>
                <p>
                  <strong>Saving Throws:</strong>{" "}
                  {c.savingThrows?.join(", ") || "None"}
                </p>
                <p>
                  <strong>Armor:</strong>{" "}
                  {c.armorProficiencies?.join(", ") || "None"}
                </p>
                <p>
                  <strong>Weapons:</strong>{" "}
                  {c.weaponProficiencies?.join(", ") || "None"}
                </p>
                <p>
                  <strong>AC:</strong> {c.getArmorClass ? c.getArmorClass() : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {c.status}
                </p>
                <div>
                  <strong>Inventory:</strong>
                  {c.inventory && c.inventory.length > 0 ? (
                    <ul>
                      {c.inventory.map((item) => (
                        <li key={item.id}>
                          {item.name} {item.equipped ? "(Equipped)" : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <em>No inventory</em>
                  )}
                </div>
                <p>
                  <strong>Strength:</strong> {c.getFinalStat("strength")} 
                  ({c.getAbilityModifier("strength")})
                </p>
                <p>
                  <strong>Dexterity:</strong> {c.getFinalStat("dexterity")} (
                  {c.getAbilityModifier("dexterity")})
                </p>
                <p>
                  <strong>Constitution:</strong>{" "}
                  {c.getFinalStat("constitution")} (
                  {c.getAbilityModifier("constitution")})
                </p>
                <p>
                  <strong>Intelligence:</strong>{" "}
                  {c.getFinalStat("intelligence")} (
                  {c.getAbilityModifier("intelligence")})
                </p>
                <p>
                  <strong>Wisdom:</strong> {c.getFinalStat("wisdom")} (
                  {c.getAbilityModifier("wisdom")})
                </p>
                <p>
                  <strong>Charisma:</strong> {c.getFinalStat("charisma")} (
                  {c.getAbilityModifier("charisma")})
                </p>
                <h4>Skills</h4>
                {SKILLS.map((skill) => {
                  return (
                    <p key={skill}>
                      <strong>{skill}:</strong> {c.getSkillModifier(skill)}
                      {c.skillProficiencies.has(skill) ? " (Proficient)" : ""}
                    </p>
                  );
                })}
                <h4>Features</h4>
                <ul>
                  {c.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || <li>No features available.</li>}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GetAllCharacters;
