export const FOOD = {
  rations: {
    id: "rations",
    name: "Rations (1 day)",
    type: "food",
    value: { gp: 0.5 },
    weight: 2,
    properties: ["edible"],
    description: "Preserved food that lasts six days."
  },
  potion_of_healing: {
    id: "potion_of_healing",
    name: "Potion of Healing",
    type: "food",
    value: { gp: 50 },
    weight: 0.5,
    properties: ["consumable"],
    description: "Restores 2d4+2 HP when consumed."
  },
  bread: {
    id: "bread",
    name: "Bread",
    type: "food",
    value: { cp: 5 },
    weight: 1,
    properties: ["edible"],
    description: "Simple food for travel."
  },
  meal_kit: {
    id: "meal_kit",
    name: "Meal Kit",
    type: "food",
    value: { gp: 1 },
    weight: 3,
    properties: ["edible"],
    description: "Cooked meal for one."
  }
};