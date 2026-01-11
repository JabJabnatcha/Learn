// src/scripts/testUpdateCharacterEZ.js
import { getAllCharacters, updateCharacter } from "../CharacterStore.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("=== TEST UPDATE CHARACTER ===");

  const allChars = await getAllCharacters();
  if (allChars.length === 0) {
    console.log("❌ No characters found. Create some first.");
    rl.close();
    return;
  }

  console.log("\n📜 All Characters:");
  allChars.forEach((char) => {
    console.log(`${char.charId} - ${char.name}`);
  });

  const charIdInput = await ask("\nEnter charId to update (e.g., 00001): ");
  const character = allChars.find((c) => c.charId === charIdInput);

  if (!character) {
    console.log("❌ Character not found!");
    rl.close();
    return;
  }

  console.log(`\nEditing character: ${character.name} (${character.charId})`);

  const newName = await ask("Enter new name (leave blank to skip): ");
  const newLevel = await ask("Enter new level (leave blank to skip): ");

  // เราแปลง input เป็น number ถ้าใส่ค่า level
  const updateData = {};
  if (newName.trim() !== "") updateData.name = newName;
  if (newLevel.trim() !== "") updateData.level = parseInt(newLevel);

  const updatedChar = await updateCharacter(character.id, updateData);

  console.log("\n✅ Character updated:");
  console.log(updatedChar);

  rl.close();
}

main();
