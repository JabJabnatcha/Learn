// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\scripts\createCharacterEZ.js
import readline from "readline";
import { createCharacter } from "../CharacterStore.js";
import { RACES } from "../data/races.js";
import { CLASSES } from "../data/classes.js";
import { ALIGNMENTS } from "../data/alignments.js";
import { generateStats } from "../utils/statGenerator.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = q => new Promise(res => rl.question(q, res));

async function selectFromList(title, options) {
    console.log(`\n${title}`);
    options.forEach((opt, i) => {
        console.log(`${i + 1}. ${opt}`);
    });

    while (true) {
        const input = await ask("Select number: ");
        const index = Number(input) - 1;

        if (index >= 0 && index < options.length) {
            return options[index];
        }
        console.log("❌ Invalid choice, try again.");
    }
}


async function main() {
    console.log("=== CREATE CHARACTER EZ ===");

    const name = await ask("Character name: ");

    // === Race ===
    const race = await selectFromList("Select Race", Object.keys(RACES));
    const subRace = RACES[race].subRaces.length
        ? await selectFromList("Select Subrace", RACES[race].subRaces)
        : "";

    // === Bio ===
    const age = Number(await ask("Age: "));
    const height = await ask("Height: ");
    const weight = await ask("Weight: ");
    const eyes = await ask("Eyes: ");
    const skin = await ask("Skin: ");
    const hair = await ask("Hair: ");

    // === Class ===
    const characterClass = await selectFromList("Select Class", Object.keys(CLASSES));
    const characterSubClass = CLASSES[characterClass].subClasses.length
        ? await selectFromList("Select Subclass", CLASSES[characterClass].subClasses)
        : "";

    // === Alignment ===
    const alignment = await selectFromList("Select Alignment", ALIGNMENTS);

    // === Auto stats ===
    const status = generateStats();
    console.log("\n🎲 Generated Stats:", status);

    // === Inventory ===
    const inventoryInput = await ask("Inventory (comma separated): ");
    const inventory = inventoryInput
        ? inventoryInput.split(",").map(i => i.trim())
        : [];

    // === Spells ===
    const spellsInput = await ask("Spells (comma separated): ");
    const spells = spellsInput
        ? spellsInput.split(",").map(s => s.trim())
        : [];

    const characterData = {
        name,
        race,
        subRace,
        age,
        height,
        weight,
        eyes,
        skin,
        hair,
        characterClass,
        characterSubClass,
        alignment,
        status,
        inventory,
        spells
    };

    const result = await createCharacter(characterData);

    console.log("\n✅ CHARACTER CREATED");
    console.log(result);

    rl.close();
}

main();
