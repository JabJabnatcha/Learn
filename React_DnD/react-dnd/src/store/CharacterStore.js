// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\CharacterStore.js
import { createCharacterEntity } from "../domain/character/createCharacter.js";

import { db } from "../firebase/firebaseConfig.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { BACKGROUNDS } from "../data/background.js";

export async function createCharacter(characterData) {

  // Sequente CharID
  const snapshot = await getDocs(collection(db, "characters"));

  let nextId = 1;
  if (!snapshot.empty) {
    const ids = snapshot.docs
      .map((d) => parseInt(d.data().charId))
      .filter((id) => !isNaN(id));

    if (ids.length > 0) {
      nextId = Math.max(...ids) + 1;
    }
  }

  const charId = nextId.toString().padStart(5, "0");

  const character = createCharacterEntity(
    /*Basic Info */
    {...characterData, charId}, // ID ตัวละครในรูปแบบ 00001, 00002, ...*/
    BACKGROUNDS
  );

  const docRef = await addDoc(collection(db, "characters"), character);

  return { id: docRef.id, ...character };
}

export async function getAllCharacters() {
  const q = query(
    collection(db, "characters"),
    where("isDeleted", "==", false)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCharacterById(id) {
  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().isDeleted) {
    return null;
  }
  return { id: docSnap.id, ...docSnap.data() };
}

export async function updateCharacter(id, updateData) {
  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().isDeleted) {
    return null;
  }
  const character = docSnap.data();
  const updatePayload = {};

  // === Basic Info ===
  if (updateData.name !== undefined) updatePayload.name = updateData.name;
  if (updateData.level !== undefined) {
    updatePayload.level = validateLevel(updateData.level);
  }

  if (updateData.race !== undefined) updatePayload.race = updateData.race;
  if (updateData.subRace !== undefined)
    updatePayload.subRace = updateData.subRace;
  if (updateData.characterClass !== undefined)
    updatePayload.characterClass = updateData.characterClass;
  if (updateData.characterSubClass !== undefined)
    updatePayload.characterSubClass = updateData.characterSubClass;
  if (updateData.alignment !== undefined)
    updatePayload.alignment = updateData.alignment;
  if (updateData.background !== undefined)
    updatePayload.background = updateData.background;
  if (updateData.experiencePoints !== undefined)
    updatePayload.experiencePoints = updateData.experiencePoints;
  if (updateData.language !== undefined)
    updatePayload.language = updateData.language;

  // === Bio info ===
  if (updateData.age !== undefined) updatePayload.age = updateData.age;
  if (updateData.height !== undefined) updatePayload.height = updateData.height;
  if (updateData.weight !== undefined) updatePayload.weight = updateData.weight;
  if (updateData.eyes !== undefined) updatePayload.eyes = updateData.eyes;
  if (updateData.skin !== undefined) updatePayload.skin = updateData.skin;
  if (updateData.hair !== undefined) updatePayload.hair = updateData.hair;

  let statusChanged = false;
  // === Status Stats ===
  if (updateData.status) {
    updatePayload.status = { ...character.status };

    for (const stat in updateData.status) {
      if (character.status.hasOwnProperty(stat)) {
        updatePayload.status[stat] = validateStatus(updateData.status[stat]);
        statusChanged = true;
      }
    }
  }
  if (statusChanged || updateData.level !== undefined) {
    const tempCharacter = {
      ...character,
      ...updatePayload,
    };
    updatePayload.maxHP = calculateMaxHP(tempCharacter);
    updatePayload.currentHP = Math.min(
      character.currentHP,
      updatePayload.maxHP
    );
  }
  // === Skills Status ===
  if (updateData.skills) {
    updatePayload.skills = { ...character.skills };
    for (const skill in updateData.skills) {
      if (updatePayload.skills.hasOwnProperty(skill)) {
        updatePayload.skills[skill] = !!updateData.skills[skill];
      }
    }
  }
  if (updateData.proficiencyBonus !== undefined)
    updatePayload.proficiencyBonus = updateData.proficiencyBonus;

  // === Combat Stats ===
  if (updateData.maxHP !== undefined) updatePayload.maxHP = updateData.maxHP;
  if (updateData.currentHP !== undefined) {
    const maxHP = updatePayload.maxHP ?? character.maxHP;
    updatePayload.currentHP = Math.min(updateData.currentHP, maxHP);
  }
  if (updateData.temporaryHP !== undefined)
    updatePayload.temporaryHP = updateData.temporaryHP;

  if (updateData.armorClass !== undefined)
    updatePayload.armorClass = updateData.armorClass;
  if (updateData.speed !== undefined) updatePayload.speed = updateData.speed;

  if (updateData.inventory !== undefined)
    updatePayload.inventory = updateData.inventory;
  if (updateData.equipment !== undefined)
    updatePayload.equipment = updateData.equipment;

  if (updateData.features !== undefined)
    updatePayload.features = updateData.features;
  if (updateData.traits !== undefined) updatePayload.traits = updateData.traits;

  if (updateData.spells !== undefined) updatePayload.spells = updateData.spells;
  if (updateData.notes !== undefined) updatePayload.notes = updateData.notes;

  if (updateData.personalityTraits !== undefined)
    updatePayload.personalityTraits = updateData.personalityTraits;
  if (updateData.ideals !== undefined) updatePayload.ideals = updateData.ideals;
  if (updateData.bonds !== undefined) updatePayload.bonds = updateData.bonds;
  if (updateData.flaws !== undefined) updatePayload.flaws = updateData.flaws;

  if (updateData.deathSaves) {
    updatePayload.deathSaves = { ...character.deathSaves };

    if (updateData.deathSaves.success !== undefined) {
      updatePayload.deathSaves.success = updateData.deathSaves.success;
    }
    if (updateData.deathSaves.failure !== undefined) {
      updatePayload.deathSaves.failure = updateData.deathSaves.failure;
    }
  }
  await updateDoc(docRef, updatePayload);

  return { id, ...character, ...updatePayload };
}

export async function deleteCharacterById(id) {
  if (!id) {
    return false;
  }

  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().isDeleted) {
    return false;
  }

  await updateDoc(docRef, {
    isDeleted: true,
  });

  return true;
}
