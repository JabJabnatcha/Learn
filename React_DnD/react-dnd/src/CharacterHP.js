const CLASS_HIT_DICE = {
    Fighter: 10,
    Wizard: 6,
    Rogue: 8,
    Cleric: 8,
    Paladin: 10,
    Ranger: 10,
    Barbarian: 12,
    Bard: 8,
    Monk: 8,
    Druid: 8,
    Sorcerer: 6,
    Warlock: 8,
};

function abilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

function calculateMaxHP(character) {
    const hitDie = CLASS_HIT_DICE[character.characterClass];
    if (!hitDie) {
        throw new Error(`Unknown class: ${character.characterClass}`);
    }

    const conMod = abilityModifier(character.status.constitution);

    // Level 1: hitDie + CON
    let maxHP = hitDie + conMod;

    // Level 2+
    for (let lvl = 2; lvl <= character.level; lvl++) {
        const avgHitDie = Math.ceil(hitDie / 2) + 1; // RAW average
        maxHP += avgHitDie + conMod;
    }

    return Math.max(1, maxHP); // HP อย่างน้อยต้อง 1
}

module.exports = { calculateMaxHP };
