// src/scripts/deleteAllCharacters.js
import { db } from "../firebaseConfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

async function deleteAllCharacters() {
  const charCollection = collection(db, "characters");
  const querySnapshot = await getDocs(charCollection);

  if (querySnapshot.empty) {
    console.log("No characters to delete.");
    return;
  }

  for (const docSnap of querySnapshot.docs) {
    await deleteDoc(doc(db, "characters", docSnap.id));
    console.log(`Deleted character: ${docSnap.id}`);
  }

  console.log("✅ All characters have been deleted.");
}

deleteAllCharacters();
