// src/scripts/testGetAllEZ.js
import { getAllCharacters, getCharacterById } from "../CharacterStore.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

async function main() {
    console.log("=== TEST GET CHARACTERS ===");

    // 1. ทดสอบ getAllCharacters
    const allChars = await getAllCharacters();
    console.log("\n📜 All Characters:");
    allChars.forEach(char => {
        console.log(`${char.charId} - ${char.name}`);
    });

    // 2. ทดสอบ getCharacterById (charId sequential)
    const charIdInput = await ask("\nEnter charId to fetch (e.g., 00001): ");
    const character = allChars.find(c => c.charId === charIdInput);

    if (character) {
        console.log("\n✅ Character Found:");
        console.log(character);
    } else {
        console.log("\n❌ Character not found!");
    }

    rl.close();
}

main();
