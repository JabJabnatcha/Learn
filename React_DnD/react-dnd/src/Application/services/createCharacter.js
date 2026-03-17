import { Character } from "../../domain/character/entity/Character.js";
import { CharacterProfile } from "../../domain/character/value-object/CharacterProfile.js";
import { Wallet } from "../../domain/character/value-object/wallet.js";

export function createCharacter(rawData, backgrounds = []) {
  const data = { ...rawData, charId: rawData.charId || crypto.randomUUID() };
  const profile = new CharacterProfile({
    age: data.age,
    height: data.height,
    weight: data.weight,
    eyes: data.eyes,
    skin: data.skin,
    hair: data.hair,
  });

  const wallet = new Wallet(
    data.wallet ?? { pp: 0, gp: data.money ?? 0, sp: 0, cp: 0 },
  );

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
