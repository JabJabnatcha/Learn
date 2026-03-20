import { Character } from "../../domain/character/entity/Character.js";
import { CharacterProfile } from "../../domain/character/value-object/CharacterProfile.js";
import { Wallet } from "../../domain/character/value-object/wallet.js";

export class CharacterMapper {
  static toPersistence(character) {
    return {
      charId: character.charId,
      name: character.name,
      alignment: character.alignment,
      race: character.race,
      subRace: character.subRace,
      characterClass: character.characterClass,
      characterSubClass: character.characterSubClass,
      level: character.level,
      experiencePoints: character.experiencePoints,

      profile: character.profile?.toJSON?.() || {},
      wallet: character.wallet?.toJSON?.() || { pp: 0, gp: 0, sp: 0, cp: 0 },

      baseStatus: character.baseStatus?.toJSON?.() || {},
      status: character.status,

      currentHP: character.currentHP || 0,
      temporaryHP: character.temporaryHP || 0,

      isDeleted: character.isDeleted || false,
    };
  }

  static toDomain(rawData) {
    const dataWithCharId = {
      ...rawData,
      charId: rawData.charId || rawData.id || crypto.randomUUID(),
    };

    return new Character(
      {
        ...dataWithCharId,
        status: rawData.baseStatus || {},
        wallet: new Wallet(rawData.wallet || {}),
        profile: new CharacterProfile(rawData.profile || {}),
      },
      [],
    );
  }
}
