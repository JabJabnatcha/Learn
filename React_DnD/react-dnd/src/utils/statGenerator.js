import { rollDice } from "./Dice.js";

export function generateStats() {
    const rollStat = () => {
        // 4d6 drop lowest
        const rolls = Array.from({ length: 4 }, () => rollDice(6));
        rolls.sort((a, b) => b - a); // เรียงจากมากไปน้อย
        return rolls[0] + rolls[1] + rolls[2]; // เอา 3 ลูกสูงสุด
    };

    return {
        strength: rollStat(),
        dexterity: rollStat(),
        constitution: rollStat(),
        intelligence: rollStat(),
        wisdom: rollStat(),
        charisma: rollStat()
    };
}
