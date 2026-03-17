import { db } from "./dexieConfig.js";
import { CharacterMapper } from "./CharacterMapper.js";

// ==================== CREATE ====================
export async function createCharacter(characterEntity) {
  try {
    const persistenceData = CharacterMapper.toPersistence(characterEntity);

    if (!persistenceData.charId) {
      throw new Error("Character must have charId before saving");
    }

    await db.characters.put(persistenceData);

    const saved = await db.characters.get(characterEntity.charId);

    if (!saved) {
      console.error(
        "Failed to retrieve saved character with charId:",
        characterEntity.charId,
      );
      return CharacterMapper.toDomain(persistenceData);
    }

    return CharacterMapper.toDomain(saved);
  } catch (error) {
    console.error("CharacterRepository.createCharacter error:", error);
    console.error("Character entity:", characterEntity);
    throw error;
  }
}

// ==================== READ ALL ====================
export async function getAllCharacters() {
  try {
    const characters = await db.characters
      .where("isDeleted")
      .equals(false)
      .toArray();

    return characters.map((char) => CharacterMapper.toDomain(char));
  } catch (error) {
    console.error("CharacterRepository.getAllCharacters error:", error);
    throw error;
  }
}

// ==================== READ ONE ====================
export async function getCharacterById(charId) {
  const character = await db.characters.get(charId);

  if (!character || character.isDeleted) return null;

  return CharacterMapper.toDomain(character);
}

// ==================== UPDATE ====================
export async function updateCharacter(charId, characterEntity) {
  const existing = await db.characters.get(charId);

  if (!existing) return null;

  await db.characters.update(
    charId,
    CharacterMapper.toPersistence(characterEntity),
  );

  return { charId, ...characterEntity };
}

// ==================== SOFT DELETE ====================
export async function deleteCharacterById(charId) {
  const existing = await db.characters.get(charId);

  if (!existing) return false;

  await db.characters.update(charId, {
    isDeleted: true,
  });

  return true;
}
