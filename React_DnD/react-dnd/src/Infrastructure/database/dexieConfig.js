import Dexie from "dexie";

export class CharacterDatabase extends Dexie {
  characters;

  constructor() {
    super("CharacterDatabase");

    this.version(1).stores({
      characters: "charId, name, race, characterClass, level, isDeleted",
    });

    this.characters = this.table("characters");
  }
}

export const db = new CharacterDatabase();
