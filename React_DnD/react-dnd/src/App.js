import { useEffect, useState } from "react";
import { getAllCharacters as getAllCharactersService } from "./Application/services/getAllCharacters.js";
import { createCharacter as createCharacterService } from "./Application/services/createCharacter.js";
import { createCharacter as createCharacterRepo } from "./Infrastructure/database/CharacterRepository.js";
import { RACES } from "./domain/gameData/races.js";
import { CLASSES } from "./domain/gameData/classes.js";

function App() {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    characterClass: "",
    level: 1,
    status: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    age: 20,
    height: 170,
    weight: 70,
    eyes: "Brown",
    skin: "Fair",
    hair: "Black",
    money: 0,
  });

  useEffect(() => {
    async function fetchCharacters() {
      const chars = await getAllCharactersService();
      setCharacters(chars);
    }
    fetchCharacters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("status.")) {
      const stat = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        status: { ...prev.status, [stat]: parseInt(value) || 0 },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rawData = {
        ...formData,

        // Character ต้องมี id
        charId: crypto.randomUUID(),

        // Wallet VO ต้องการ object
        money: {
          gp: parseInt(formData.money) || 0,
        },
        status: formData.status, // ส่ง status object ตรงๆ ให้ createCharacterService จัดการ
      };

      const characterEntity = createCharacterService(rawData);

      const created = await createCharacterRepo(characterEntity);

      if (created && created.charId) {
        setCharacters((prev) => [...prev, created]);
      } else {
        throw new Error("Character creation returned invalid data");
      }

      // reset form
      setFormData({
        name: "",
        race: "",
        characterClass: "",
        level: 1,
        status: {
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
        },
        age: 20,
        height: 170,
        weight: 70,
        eyes: "Brown",
        skin: "Fair",
        hair: "Black",
        money: 0,
      });
    } catch (error) {
      console.error("Error creating character:", error);
      alert("Failed to create character: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>D&D Character Manager</h1>

      <h2>Create New Character</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "40px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <div>
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Race:
              <select
                name="race"
                value={formData.race}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Race</option>
                {Object.keys(RACES).map((race) => (
                  <option key={race} value={race}>
                    {race}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Class:
              <select
                name="characterClass"
                value={formData.characterClass}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Class</option>
                {Object.keys(CLASSES).map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Level:{" "}
              <input
                type="number"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </label>
          </div>
          <div>
            <label>
              Age:{" "}
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Height (cm):{" "}
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Weight (kg):{" "}
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Eyes:{" "}
              <input
                type="text"
                name="eyes"
                value={formData.eyes}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Skin:{" "}
              <input
                type="text"
                name="skin"
                value={formData.skin}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Hair:{" "}
              <input
                type="text"
                name="hair"
                value={formData.hair}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Money (gp):{" "}
              <input
                type="number"
                name="money"
                value={formData.money}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <h3>Ability Scores</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          <label>
            Strength:{" "}
            <input
              type="number"
              name="status.strength"
              value={formData.status.strength}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
          <label>
            Dexterity:{" "}
            <input
              type="number"
              name="status.dexterity"
              value={formData.status.dexterity}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
          <label>
            Constitution:{" "}
            <input
              type="number"
              name="status.constitution"
              value={formData.status.constitution}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
          <label>
            Intelligence:{" "}
            <input
              type="number"
              name="status.intelligence"
              value={formData.status.intelligence}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
          <label>
            Wisdom:{" "}
            <input
              type="number"
              name="status.wisdom"
              value={formData.status.wisdom}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
          <label>
            Charisma:{" "}
            <input
              type="number"
              name="status.charisma"
              value={formData.status.charisma}
              onChange={handleInputChange}
              min="1"
              max="30"
            />
          </label>
        </div>

        <button
          type="submit"
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Create Character
        </button>
      </form>

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
                  <strong>Race:</strong> {c.race}
                </p>
                <p>
                  <strong>Class:</strong> {c.characterClass}
                </p>
                <p>
                  <strong>Level:</strong> {c.level}
                </p>
                <p>
                  <strong>HP:</strong> {c.currentHP}/{c.maxHP}
                </p>
                <p>
                  <strong>Status:</strong> {c.status}
                </p>
                <p>
                  <strong>Strength:</strong> {c.getFinalStat("strength")} (
                  {Math.floor((c.getFinalStat("strength") - 10) / 2)})
                </p>
                <p>
                  <strong>Dexterity:</strong> {c.getFinalStat("dexterity")} (
                  {Math.floor((c.getFinalStat("dexterity") - 10) / 2)})
                </p>
                <p>
                  <strong>Constitution:</strong>{" "}
                  {c.getFinalStat("constitution")} (
                  {Math.floor((c.getFinalStat("constitution") - 10) / 2)})
                </p>
                <p>
                  <strong>Intelligence:</strong>{" "}
                  {c.getFinalStat("intelligence")} (
                  {Math.floor((c.getFinalStat("intelligence") - 10) / 2)})
                </p>
                <p>
                  <strong>Wisdom:</strong> {c.getFinalStat("wisdom")} (
                  {Math.floor((c.getFinalStat("wisdom") - 10) / 2)})
                </p>
                <p>
                  <strong>Charisma:</strong> {c.getFinalStat("charisma")} (
                  {Math.floor((c.getFinalStat("charisma") - 10) / 2)})
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
