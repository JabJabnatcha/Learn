// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\CharacterSkills.js
const SKILL_MAPPING = {
    acrobatics: 'dexterity',
    animalHandling: 'wisdom',
    arcana: 'intelligence',
    athletics: 'strength',
    deception: 'charisma',
    history: 'intelligence',
    insight: 'wisdom',
    intimidation: 'charisma',
    investigation: 'intelligence',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    performance: 'charisma',
    persuasion: 'charisma',
    religion: 'intelligence',
    sleightOfHand: 'dexterity',
    stealth: 'dexterity',
    survival: 'wisdom',
};

function abilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

function calculateSkill(character, skill) {
    const ability = SKILL_MAPPING[skill];
    if (!ability) {
        throw new Error(`Unknown skill: ${skill}`);
    }
    if(!character.status || character.status[ability]== null) {
        throw new Error(`Missing ability score: ${ability}`);
    }

    const score = character.status[ability];
    const modifier = abilityModifier(character.status[ability]);
    const proficiencyBonus = character.skills[skill]
        ? character.proficiencyBonus
        : 0;

    console.log({
        skill,
        ability,
        score,
        modifier,
        proficiencyBonus
    });

    return modifier + proficiencyBonus;
}

module.exports = { calculateSkill };