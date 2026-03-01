// src/scripts/testSoftDeleteEZ.js
import readline from "readline";
import { getAllCharacters } from "../CharacterStore.js";
import { deleteCharacterById } from "../CharacterStore.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

async function main() {
  console.log("=== TEST SOFT DELETE CHARACTER ===");

  const allChars = await getAllCharacters();
  console.log("\n📜 All Characters:");
  allChars.forEach(char => console.log(`${char.charId} - ${char.name}`));

  const charIdInput = await ask("\nEnter charId to soft delete (e.g., 00001): ");
  const charToDelete = allChars.find(c => c.charId === charIdInput);

  if (!charToDelete) {
    console.log("\n❌ Character not found!");
    rl.close();
    return;
  }

  const result = await deleteCharacterById(charToDelete.id);
  console.log("\n✅", result);

  // ทดสอบดึงข้อมูลอีกครั้ง
  const updatedChars = await getAllCharacters();
  console.log("\n📜 Characters after soft delete:");
  updatedChars.forEach(c => console.log(`${c.charId} - ${c.name}`));

  rl.close();
}

main();
