// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\Application\services\ItemShopService.js
import { updateCharacter as updateCharacterRepo } from "../../Infrastructure/database/CharacterRepository.js";
import { toItem } from "../../domain/Item/index.js";

function moneyToCopper({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
  return cp + sp * 10 + gp * 100 + pp * 1000;
}

export async function buyItem(character, itemId) {
  const item = toItem(itemId);
  if (!item) throw new Error("Item not found");

  if (!character.wallet.canAfford(item.value)) {
    throw new Error("Not enough funds");
  }

  character.pay(item.value);
  character.addItem(item);

  const updated = await updateCharacterRepo(character.charId, character);
  return updated;
}

export async function sellItem(character, itemId) {
  const item = character.inventory.find((i) => i.id === itemId);
  if (!item) {
    throw new Error("Item not in inventory");
  }

  character.removeItem(itemId);

  const saleCopper = Math.floor(moneyToCopper(item.value) / 2);
  const saleWallet = {
    pp: 0,
    gp: 0,
    sp: 0,
    cp: saleCopper,
  };

  character.earn(saleWallet);

  const updated = await updateCharacterRepo(character.charId, character);
  return updated;
}
