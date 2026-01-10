// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\CharacterStore.js
import { validateLevel, validateStatus } from "./CharacterValidate.js";
import { calculateMaxHP } from "./CharacterHP.js";

import { db } from "./firebaseConfig.js";
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

export async function createCharacter(characterData) {
  const skills = characterData.skills ?? {};
  // สร้างเอกสารใหม่ใน Firestore เป็น object

  // Sequente CharID
  const charCollection = collection(db, "characters");
  const q = query(charCollection);
  const querySnapshot = await getDocs(q);

  let nextId = 1;
  if (!querySnapshot.empty) {
    const ids = querySnapshot.docs
      .map((doc) => parseInt(doc.id))
      .filter((id) => !isNaN(id));

    if (ids.length > 0) {
      const maxId = Math.max(...ids);
      nextId = maxId + 1;
    }
  }

  const newCharId = nextId.toString().padStart(5, "0");

  const character = {
    /*Basic Info */
    charId: newCharId, // ID ตัวละครในรูปแบบ 00001, 00002, ...
    name: characterData.name, // ชื่อของตัวละคร
    race: characterData.race, // เช่น มนุษย์, เอลฟ์, คนแคระ
    subRace: characterData.subRace, // บางเผ่าอาจไม่มี subrace
    characterClass: characterData.characterClass, // เช่น นักรบ, นักเวทย์, นักฆ่า
    level: validateLevel(characterData.level), // ค่าเริ่มต้นเป็น 1
    characterSubClass: characterData.characterSubClass || "", // บาง class อาจไม่มี subclass
    alignment: characterData.alignment || "", // มีให้เลือก 9 Alignment
    background: characterData.background || [], //แต่ละ background อาจมีรายละเอียดแตกต่างกัน และจะให้ bonus ต่าง ๆ แก่ตัวละคร เลือกได้เมากน้อยสุดแค่ 1-3 background เลือกซ้ำไม่ได้
    experiencePoints: characterData.experiencePoints || 0, // ค่าเริ่มต้นเป็น 0
    language: characterData.language ?? ["Common"], // ค่าเริ่มต้นเป็น Common +ภาษาของเผ่าที่ไม่ใช่ Common เช่น Elvish, Dwarvish, Orcish+สามารถเพิ่มภาษาได้ตาม background หรือ เรียนรู้เพิ่มเติม

    /*Bio info */
    age: characterData.age || 0,
    height: characterData.height || "", // รูปแบบเช่น 5'8" หรือ 172 cm
    weight: characterData.weight || "", // รูปแบบเช่น 150 lbs หรือ 68 kg
    eyes: characterData.eyes || "",
    skin: characterData.skin || "",
    hair: characterData.hair || "",

    /*Status Stats */
    status: {
      strength: validateStatus(characterData.status?.strength), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
      dexterity: validateStatus(characterData.status?.dexterity), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
      constitution: validateStatus(characterData.status?.constitution), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
      intelligence: validateStatus(characterData.status?.intelligence), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
      wisdom: validateStatus(characterData.status?.wisdom), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
      charisma: validateStatus(characterData.status?.charisma), // สุ่มด้วย Dice 6 4 ลูก แล้วเอาค่าที่มากที่สุด 3 ลูกมาบวกกัน
    },
    /*Skills Status */
    skills: {
      acrobatics: skills.acrobatics ?? false, //อิงกับ Dexterity
      animalHandling: skills.animalHandling ?? false, //อิงกับ Wisdom
      arcana: skills.arcana ?? false, //อิงกับ Intelligence
      athletics: skills.athletics ?? false, //อิงกับ Strength
      deception: skills.deception ?? false, //อิงกับ Charisma
      history: skills.history ?? false, //อิงกับ Intelligence
      insight: skills.insight ?? false, //อิงกับ Wisdom
      intimidation: skills.intimidation ?? false, //อิงกับ Charisma
      investigation: skills.investigation ?? false, //อิงกับ Intelligence
      medicine: skills.medicine ?? false, //อิงกับ Wisdom
      nature: skills.nature ?? false, //อิงกับ Intelligence
      perception: skills.perception ?? false, //อิงกับ Wisdom
      performance: skills.performance ?? false, //อิงกับ Charisma
      persuasion: skills.persuasion ?? false, //อิงกับ Charisma
      religion: skills.religion ?? false, //อิงกับ Intelligence
      sleightOfHand: skills.sleightOfHand ?? false, //อิงกับ Dexterity
      stealth: skills.stealth ?? false, //อิงกับ Dexterity
      survival: skills.survival ?? false, //อิงกับ Wisdom
    },
    proficiencyBonus: characterData.proficiencyBonus ?? 2, // จะ refactor ในอนาคต

    /*Combat Stats */
    maxHP: 0, //บาง class อาจมี HP เริ่มต้นไม่เท่ากับ 10
    currentHP: 0, //HP ปัจจุบัน
    temporaryHP: 0, //HP ชั่วคราว

    armorClass: characterData.armorClass ?? 10, //บาง race /class อาจมี ArmorClass ไม่เท่ากับ 10
    speed: characterData.speed ?? 30, //บาง race อาจมี speed ไม่เท่ากับ 30
    /*Inventory and Equipment */
    inventory: characterData.inventory ?? [],
    equipment: characterData.equipment ?? [],
    /*Features and Traits */
    features: characterData.features ?? [],
    traits: characterData.traits ?? [],
    /*Spells */
    spells: characterData.spells ?? [],
    notes: characterData.notes ?? "",
    /*Personality Traits, Ideals, Bonds, and Flaws */
    personalityTraits: characterData.personalityTraits || "",
    ideals: characterData.ideals || "",
    bonds: characterData.bonds || "",
    flaws: characterData.flaws || "",

    /*Death Saves */
    deathSaves: {
      success: 0, // จำนวนครั้งที่ทอยสำเร็จ มากสุด 3 ครั้ง
      failure: 0, // จำนวนครั้งที่ทอยล้มเหลว มากสุด 3 ครั้ง
    },
    /*is Deleted */
    isDeleted: false,
  };
  character.maxHP = calculateMaxHP(character);
  character.currentHP = character.maxHP;

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
