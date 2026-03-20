import { Item } from "./Item.js";
import { WEAPONS } from "./weapons.js";
import { ARMOR } from "./armor.js";
import { TOOLS } from "./tools.js";
import { FOOD } from "./food.js";
import { MAGIC_ITEMS } from "./magicItems.js";

export const ITEM_DATA = {
  ...WEAPONS,
  ...ARMOR,
  ...TOOLS,
  ...FOOD,
  ...MAGIC_ITEMS,
};

export function getItemById(itemId) {
  return ITEM_DATA[itemId] ?? null;
}

export function toItem(itemId) {
  const data = getItemById(itemId);
  if (!data) {
    throw new Error(`Item not found: ${itemId}`);
  }
  return new Item(data);
}
