// src/Infrastructure/database/CharacterRepository.js

import { createCharacterEntity } from "../../domain/character/createCharacter.js";
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

const COLLECTION_NAME = "characters";

// ==================== CREATE ====================
export async function createCharacter(characterEntity) {
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME),
    characterEntity
  );

  return { id: docRef.id, ...characterEntity };
}

// ==================== READ ALL ====================
export async function getAllCharacters() {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isDeleted", "==", false)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// ==================== READ ONE ====================
export async function getCharacterById(id) {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  if (data.isDeleted) return null;

  return {
    id: docSnap.id,
    ...data,
  };
}

// ==================== UPDATE ====================
export async function updateCharacter(id, characterEntity) {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  await updateDoc(docRef, characterEntity);

  return { id, ...characterEntity };
}

// ==================== SOFT DELETE ====================
export async function deleteCharacterById(id) {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return false;

  await updateDoc(docRef, {
    isDeleted: true,
  });

  return true;
}