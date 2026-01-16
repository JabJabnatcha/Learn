// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\domain\character\createCharacter.js
import { applyBackgrounds } from "./characterBackground";
import { calculateMaxHP } from "./CharacterHP";
import { calculateSkill } from "./CharacterSkills";

export function buildCharacter(rawdata, backgrounds) {
    const character ={

    };

applyBackgrounds(character, backgrounds)

character.maxHP = calculateMaxHP(character);
character.currentHP = character.maxHP;

return character;
}