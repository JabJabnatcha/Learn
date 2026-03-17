import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCharacter as createCharacterService } from "../Application/services/createCharacter.js";
import { createCharacter as createCharacterRepo } from "../Infrastructure/database/CharacterRepository.js";
import { RACES } from "../domain/gameData/races.js";
import { CLASSES } from "../domain/gameData/classes.js";
import { ALIGNMENTS } from "../domain/gameData/alignments.js";

function CreateCharacter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    alignment: "",
    race: "",
    subRace: "",
    characterClass: "",
    characterSubClass: "",
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

  const raceData = RACES[formData.race];
  const classData = CLASSES[formData.characterClass];

  const subraceOptions =
    raceData?.subRaces && Object.keys(raceData.subRaces).length > 0
      ? Object.keys(raceData.subRaces)
      : [];

  const subclassOptions =
    classData?.subClasses && classData.subClasses.length > 0
      ? classData.subClasses
      : [];

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
        charId: crypto.randomUUID(),
        money: {
          gp: parseInt(formData.money) || 0,
        },
        status: formData.status,
      };

      const characterEntity = createCharacterService(rawData);
      const created = await createCharacterRepo(characterEntity);

      if (created && created.charId) {
        // reset form
        setFormData({
          name: "",
          alignment: "",
          race: "",
          subRace: "",
          characterClass: "",
          characterSubClass: "",
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
        navigate('/list');
      } else {
        throw new Error("Character creation returned invalid data");
      }
    } catch (error) {
      console.error("Error creating character:", error);
      alert("Failed to create character: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
              Alignment:
              <select
                name="alignment"
                value={formData.alignment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Alignment</option>
                {ALIGNMENTS.map((alignment) => (
                  <option key={alignment} value={alignment}>
                    {alignment}
                  </option>
                ))}
              </select>
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
              Subrace:
              <select
                name="subRace"
                value={formData.subRace}
                onChange={handleInputChange}
                disabled={!formData.race || subraceOptions.length === 0}
                required
              >
                <option value="">{subraceOptions.length === 0 ? "Select Race first" : "Select Subrace"}</option>
                {subraceOptions.map((subrace) => (
                  <option key={subrace} value={subrace}>
                    {subrace}
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
              SubClass:
              <select
                name="characterSubClass"
                value={formData.characterSubClass}
                onChange={handleInputChange}
                disabled={!formData.characterClass || subclassOptions.length === 0}
                required
              >
                <option value="">
                  {!formData.characterClass
                    ? "Select class first"
                    : subclassOptions.length === 0
                    ? "No subclasses available"
                    : "Select Subclass"}
                </option>
                {formData.characterClass &&
                  subclassOptions.map((subcls) => (
                    <option key={subcls} value={subcls}>
                      {subcls}
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
    </div>
  );
}

export default CreateCharacter;