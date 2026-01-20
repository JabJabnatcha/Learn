// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\domain\character\createCharacter.js
import { applyBackgrounds } from "./characterBackground";
import { calculateMaxHP } from "./CharacterHP";
/*import { calculateSkill } from "./CharacterSkills";*/
import { validateLevel, validateStatus } from "./CharacterValidate";

export function createCharacterEntity(rawData, backgrounds) {
    const skills = rawData.skills ?? {};

    const character ={
        charId: rawData.charId,
        name: rawData.name,
        race: rawData.race,
        subRace: rawData.subRace ?? "",
        characterClass: rawData.characterClass,
        characterSubClass: rawData.characterSubClass ?? "",
        alignment: rawData.alignment ?? "",
        level: validateLevel(rawData.level),
        background: rawData.background ?? [],
        experiencePoints: rawData.experiencePoints ?? 0,
        language: rawData.language ?? ["Common"],

        money: rawData.money ?? { pp: 0, gp: 0, sp: 0, cp: 0 },

        age: rawData.age ?? 0,
        height: rawData.height ?? "",
        weight: rawData.weight ?? "",
        eyes: rawData.eyes ?? "",
        skin: rawData.skin ?? "",
        hair: rawData.hair ?? "",

        status: {
            strength: validateStatus(rawData.status?.strength),
            dexterity: validateStatus(rawData.status?.dexterity),
            constitution: validateStatus(rawData.status?.constitution),
            intelligence: validateStatus(rawData.status?.intelligence),
            wisdom: validateStatus(rawData.status?.wisdom),
            charisma: validateStatus(rawData.status?.charisma),
        },

        skills: {
            acrobatics: skills.acrobatics ?? false,
            animalHandling: skills.animalHandling ?? false,
            arcana: skills.arcana ?? false,
            athletics: skills.athletics ?? false,
            deception: skills.deception ?? false,
            history: skills.history ?? false,
            insight: skills.insight ?? false,
            intimidation: skills.intimidation ?? false,
            medicine: skills.medicine ?? false,
            nature: skills.nature ?? false,
            perception: skills.perception ?? false,
            performance: skills.performance ?? false,
            persuasion: skills.persuasion ?? false,
            religion: skills.religion ?? false,
            sleightOfHand: skills.sleightOfHand ?? false,
            stealth: skills.stealth ?? false,
            survival: skills.survival ?? false,
        },
        proficiencyBonus: rawData.proficiencyBonus ?? 2,
        
        armorClass: rawData.armorClass ?? 0,
        speed: rawData.speed ?? 30,
        maxHP: 0,
        currentHP: 0,
        temporaryHP: 0,

        inventory: rawData.inventory ?? [],
        equipment: rawData.equipment ?? [],

        features: rawData.features ?? [],
        traits: rawData.traits ?? [],
        spells: rawData.spells ?? [],
        note: rawData.note ?? [],

        personalityTraits: rawData.personalityTraits ?? "",
        ideals: rawData.ideals ?? "",
        bonds: rawData.bonds ?? "",
        flaws: rawData.flaws ?? "",

        deathSave: { success: 0, failure: 0 },
        isDeleted: false,
    };

applyBackgrounds(character, backgrounds)

character.maxHP = calculateMaxHP(character);
character.currentHP = character.maxHP;

return character;
}