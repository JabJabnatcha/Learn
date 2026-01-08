// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\CharacterStore.js
const { validateLevel, validateStatus } = require("../../CharacterValidate");
const { calculateMaxHP} = require("./CharacterHP");


let characters = [];
let charactersId = 1;


function createCharacter(characterData)
{
    const skills = characterData.skills ?? {};

    const character = {
        charactersId, // ID ของตัวละคร 
        /*Basic Info */
        name: characterData.name,// ชื่อของตัวละคร
        race: characterData.race,// เช่น มนุษย์, เอลฟ์, คนแคระ
        subRace: characterData.subRace,// บางเผ่าอาจไม่มี subrace
        characterClass: characterData.characterClass,// เช่น นักรบ, นักเวทย์, นักฆ่า
        level: validateLevel(characterData.level), // ค่าเริ่มต้นเป็น 1
        characterSubClass: characterData.characterSubClass || '', // บาง class อาจไม่มี subclass
        alignment: characterData.alignment || '', // มีให้เลือก 9 Alignment
        background: characterData.background || [], //แต่ละ background อาจมีรายละเอียดแตกต่างกัน และจะให้ bonus ต่าง ๆ แก่ตัวละคร เลือกได้เมากน้อยสุดแค่ 1-3 background เลือกซ้ำไม่ได้
        experiencePoints: characterData.experiencePoints || 0, // ค่าเริ่มต้นเป็น 0
        language: characterData.language ?? ['Common'], // ค่าเริ่มต้นเป็น Common +ภาษาของเผ่าที่ไม่ใช่ Common เช่น Elvish, Dwarvish, Orcish+สามารถเพิ่มภาษาได้ตาม background หรือ เรียนรู้เพิ่มเติม

        /*Status Stats */        
        status:{
            strength: validateStatus(characterData.status?.strength), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
            dexterity: validateStatus(characterData.status?.dexterity), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
            constitution: validateStatus(characterData.status?.constitution), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
            intelligence: validateStatus(characterData.status?.intelligence), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
            wisdom: validateStatus(characterData.status?.wisdom), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
            charisma: validateStatus(characterData.status?.charisma), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
        },
        /*Skills Status */
        skills: {
            acrobatics: skills.acrobatics ?? false,//อิงกับ Dexterity
            animalHandling: skills.animalHandling ?? false,//อิงกับ Wisdom
            arcana: skills.arcana ?? false,//อิงกับ Intelligence
            athletics: skills.athletics ?? false,//อิงกับ Strength
            deception: skills.deception ?? false,//อิงกับ Charisma
            history: skills.history ?? false,//อิงกับ Intelligence
            insight: skills.insight ?? false,//อิงกับ Wisdom
            intimidation: skills.intimidation ?? false,//อิงกับ Charisma
            investigation: skills.investigation ?? false,//อิงกับ Intelligence
            medicine: skills.medicine ?? false,//อิงกับ Wisdom
            nature: skills.nature ?? false,//อิงกับ Intelligence
            perception: skills.perception ?? false,//อิงกับ Wisdom
            performance: skills.performance ?? false,//อิงกับ Charisma
            persuasion: skills.persuasion ?? false,//อิงกับ Charisma
            religion: skills.religion ?? false,//อิงกับ Intelligence
            sleightOfHand: skills.sleightOfHand ?? false,//อิงกับ Dexterity
            stealth: skills.stealth ?? false,//อิงกับ Dexterity
            survival: skills.survival ?? false,//อิงกับ Wisdom
        },
        proficiencyBonus: characterData.proficiencyBonus ?? 2,// จะ refactor ในอนาคต

        /*Combat Stats */
        maxHP: 0,//บาง class อาจมี HP เริ่มต้นไม่เท่ากับ 10 
        currentHP: 0,//HP ปัจจุบัน
        temporaryHP: 0,//HP ชั่วคราว
        
        armorClass: characterData.armorClass ?? 10,//บาง race /class อาจมี ArmorClass ไม่เท่ากับ 10
        speed: characterData.speed ?? 30,//บาง race อาจมี speed ไม่เท่ากับ 30
        /*Inventory and Equipment */
        inventory: characterData.inventory ?? [  ],
        equipment: characterData.equipment ?? [  ],
        /*Features and Traits */
        features: characterData.features ?? [  ],
        traits: characterData.traits ?? [  ],
        /*Spells */
        spells: characterData.spells ?? [  ],
        notes: characterData.notes ?? "",
        /*Personality Traits, Ideals, Bonds, and Flaws */
        personalityTraits: characterData.personalityTraits || "",
        ideals: characterData.ideals || "",
        bonds: characterData.bonds || "",
        flaws: characterData.flaws || "",

        /*Death Saves */
        deathSaves: {
            success: 0, // จำนวนครั้งที่ทอยสำเร็จ มากสุด 3 ครั้ง
            failure: 0, // จำนวนครั้งที่ทอยล้มเหลว มากสุด 3 ครั้ง
        },
        /*is Deleted */
        isDeleted: false,
    };
    character.maxHP = calculateMaxHP(character);
    character.currentHP = character.maxHP;

    characters.push(character);

    saveCharacters({ 
        characters 
    });

    return character;
}

function getAllCharacters() {
    return characters.filter(char => !char.isDeleted);
}

function getCharacterById(id) {
    return characters.find(char => char.id === id && !char.isDeleted);
}

function updateCharacter(id, updateData) {
    const character = characters.find(char => char.id === id && !char.isDeleted);

    if (!character) {
        return null;
    }

    // === Basic Info ===
    if (updateData.name !== undefined) character.name = updateData.name;
    if (updateData.level !== undefined) 
        {character.level = validateLevel(updateData.level);
        character.maxHP = calculateMaxHP(character);
        character.currentHP = Math.min(character.currentHP, character.maxHP);
    }
    if (updateData.race !== undefined) character.race = updateData.race;
    if (updateData.subRace !== undefined) character.subRace = updateData.subRace;
    if (updateData.characterClass !== undefined) character.characterClass = updateData.characterClass;
    if (updateData.characterSubClass !== undefined) character.characterSubClass = updateData.characterSubClass;
    if (updateData.alignment !== undefined) character.alignment = updateData.alignment;
    if (updateData.background !== undefined) character.background = updateData.background;
    if (updateData.experiencePoints !== undefined) character.experiencePoints = updateData.experiencePoints;
    if (updateData.language !== undefined) character.language = updateData.language;

    let statusChanged = false;
    // === Status Stats ===
    if (updateData.status) {
        for (const stat in updateData.status) {
            if (character.status.hasOwnProperty(stat)) {
                character.status[stat] = validateStatus(updateData.status[stat]);
                statusChanged = true;
            }
        }
    }
    if (statusChanged && updateData.level === undefined) {
        character.maxHP = calculateMaxHP(character);
        character.currentHP = Math.min(character.currentHP, character.maxHP);
    }
    // === Skills Status ===
    if (updateData.skills) {
        for (const skill in updateData.skills) {
            if (character.skills.hasOwnProperty(skill)) {
                character.skills[skill] = !!updateData.skills[skill];
            }
        }
    }
    if (updateData.proficiencyBonus !== undefined) character.proficiencyBonus = updateData.proficiencyBonus;

    // === Combat Stats ===
    if (updateData.maxHP !== undefined) character.maxHP = updateData.maxHP;
    if (updateData.currentHP !== undefined) character.currentHP = Math.min(updateData.currentHP, character.maxHP);
    if (updateData.temporaryHP !== undefined) character.temporaryHP = updateData.temporaryHP;
    
    if (updateData.armorClass !== undefined) character.armorClass = updateData.armorClass;
    if (updateData.speed !== undefined) character.speed = updateData.speed;

    if (updateData.inventory !== undefined) character.inventory = updateData.inventory;
    if (updateData.equipment !== undefined) character.equipment = updateData.equipment;
    
    if (updateData.features !== undefined) character.features = updateData.features;
    if (updateData.traits !== undefined) character.traits = updateData.traits;
    
    if (updateData.spells !== undefined) character.spells = updateData.spells;
    if (updateData.notes !== undefined) character.notes = updateData.notes;

    if (updateData.personalityTraits !== undefined) character.personalityTraits = updateData.personalityTraits;
    if (updateData.ideals !== undefined) character.ideals = updateData.ideals;
    if (updateData.bonds !== undefined) character.bonds = updateData.bonds;
    if (updateData.flaws !== undefined) character.flaws = updateData.flaws;

    if (updateData.deathSaves) {
        if (updateData.deathSaves.success !== undefined) {
            character.deathSaves.success = updateData.deathSaves.success;
        }
        if (updateData.deathSaves.failure !== undefined) {
            character.deathSaves.failure = updateData.deathSaves.failure;
        }
    }
    saveCharacters({

        characters
    });

    return character;
}

function deleteCharacterById(id) {
    const character = characters.find(
        char => char.id === id && !char.isDeleted
    );
    if (!character) {
        return false;
    }
    character.isDeleted = true;

    saveCharacters({
        characters
    });

    return true;
}

module.exports = { createCharacter, getAllCharacters, getCharacterById, updateCharacter, deleteCharacterById };