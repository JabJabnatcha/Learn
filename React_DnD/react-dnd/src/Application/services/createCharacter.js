// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Application\services\createCharacter.js

// src/Application/services/createCharacter.js

import { Character } from "../../domain/character/entity/Character.js";
import { CharacterProfile } from "../../domain/character/value-object/CharacterProfile.js";
import { Wallet } from "../../domain/character/value-object/wallet.js";

export function createCharacter(rawData, backgrounds = []) {

  // 1️⃣ เตรียม Value Object: Profile
  const profile = new CharacterProfile({
    age: rawData.age,
    height: rawData.height,
    weight: rawData.weight,
    eyes: rawData.eyes,
    skin: rawData.skin,
    hair: rawData.hair,
  });

  // 2️⃣ เตรียม Value Object: Wallet
  const wallet = new Wallet(rawData.money);

  // 3️⃣ สร้าง Entity
  const character = new Character(
    {
      ...rawData,
      profile,
      money: wallet,
    },
    backgrounds
  );

  return character;
}