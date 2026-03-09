// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Application\services\getAllCharacters.js

import { db } from "../../Infrastructure/database/dexieConfig.js";
import { CharacterMapper } from "../../Infrastructure/database/CharacterMapper.js";

export async function getAllCharacters() {
  try {

    const characters = await db.characters
      .filter(c => !c.isDeleted)
      .toArray();

    return characters.map((char) =>
      CharacterMapper.toDomain(char)
    );

  } catch (error) {
    console.error("CharacterRepository.getAllCharacters error:", error);
    throw error;
  }
}