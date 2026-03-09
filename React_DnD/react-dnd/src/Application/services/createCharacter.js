// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Application\services\createCharacter.js

import { Character } from "../../domain/character/entity/Character.js";
import { CharacterProfile } from "../../domain/character/value-object/CharacterProfile.js";
import { Wallet } from "../../domain/character/value-object/wallet.js";

export function createCharacter(rawData, backgrounds = []) {
  // Generate charId if not provided
  const data = { ...rawData, charId: rawData.charId || crypto.randomUUID() };

  // 1️⃣ เตรียม Value Object: Profile
  const profile = new CharacterProfile({
    age: data.age,
    height: data.height,
    weight: data.weight,
    eyes: data.eyes,
    skin: data.skin,
    hair: data.hair,
  });

  // 2️⃣ เตรียม Value Object: Wallet
  const wallet = new Wallet(
    data.wallet ?? { pp: 0, gp: data.money ?? 0, sp: 0, cp: 0 },
  );

  // 3️⃣ สร้าง Entity
  const character = new Character(
    {
      ...data,
      profile,
      money: wallet,
    },
    backgrounds,
  );

  return character;
}
