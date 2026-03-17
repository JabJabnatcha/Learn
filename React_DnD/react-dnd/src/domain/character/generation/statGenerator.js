import { rollDice } from "../dice/rollDice.js";

export function generateStats() {
  const rollStat = () => {
    const rolls = Array.from({ length: 4 }, () => rollDice(6));
    rolls.sort((a, b) => b - a);
    return rolls[0] + rolls[1] + rolls[2];
  };

  return {
    strength: rollStat(),
    dexterity: rollStat(),
    constitution: rollStat(),
    intelligence: rollStat(),
    wisdom: rollStat(),
    charisma: rollStat(),
  };
}
