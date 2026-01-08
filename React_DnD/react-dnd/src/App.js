import { useEffect, useState } from "react";
import { getAllCharacters, createCharacter } from "./CharacterStoreFirebase";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      const chars = await getAllCharacters();
      setCharacters(chars);
    }
    fetchCharacters();
  }, []);

  async function handleAddCharacter() {
    const newChar = {
      name: "Hero",
      race: "Human",
      characterClass: "Warrior",
      level: 1,
      status: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }
    };
    const created = await createCharacter(newChar);
    setCharacters(prev => [...prev, created]);
  }

  return (
    <div>
      <button onClick={handleAddCharacter}>Create Character</button>
      <ul>
        {characters.map(c => (
          <li key={c.id}>{c.name} - {c.characterClass}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
