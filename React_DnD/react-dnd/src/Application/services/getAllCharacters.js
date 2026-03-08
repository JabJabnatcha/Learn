// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Application\services\getAllCharacters.js

import { getAllCharacters as getAllFromRepo } from "../../Infrastructure/database/CharacterRepository.js";

export async function getAllCharacters() {
  return await getAllFromRepo();
}