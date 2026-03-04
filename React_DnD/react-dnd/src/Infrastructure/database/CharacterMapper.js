// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Infrastructure\database\CharacterMapper.js

import { Character } from "../../domain/character/entity/Character.js";
import { CharacterProfile } from "../../domain/character/value-object/CharacterProfile.js";
import { Wallet } from "../../domain/character/value-object/wallet.js";

export class CharacterMapper {
  static toPersistence(character) {
    return {
      charId: character.charId,
      name: character.name,
      race: character.race,
      characterClass: character.characterClass,
      level: character.level,
      experiencePoints: character.experiencePoints,

      profile: character.profile.toJSON(),
      wallet: character.wallet.toJSON(),

      baseStats: character.baseStats,
      status: character.status,

      currentHP: character.currentHP,
      temporaryHP: character.temporaryHP,

      isDeleted: character.isDeleted || false,
    };
  }

  static toDomain(rawData) {
    return new Character(
      {
        ...rawData,
        money: new Wallet(rawData.wallet),
        profile: new CharacterProfile(rawData.profile),
      },
      [],
    );
  }
}
