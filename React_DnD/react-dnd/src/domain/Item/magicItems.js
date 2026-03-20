export const MAGIC_ITEMS = {
  plus_one_sword: {
    id: "plus_one_sword",
    name: "+1 Sword",
    type: "magic",
    value: { gp: 500 },
    weight: 3,
    properties: ["weapon", "+1 attack"],
    description: "A sword that grants +1 to attack and damage rolls."
  },
  cloak_of_protection: {
    id: "cloak_of_protection",
    name: "Cloak of Protection",
    type: "magic",
    value: { gp: 5000 },
    weight: 1,
    properties: ["+1 AC", "+1 saving throws"],
    description: "Grants +1 bonus to AC and saving throws."
  },
  bag_of_holding: {
    id: "bag_of_holding",
    name: "Bag of Holding",
    type: "magic",
    value: { gp: 4000 },
    weight: 15,
    properties: ["extra-dimensional storage"],
    description: "Can hold far more than its size suggests."
  },
  potion_of_greater_healing: {
    id: "potion_of_greater_healing",
    name: "Potion of Greater Healing",
    type: "magic",
    value: { gp: 150 },
    weight: 0.5,
    properties: ["consumable"],
    description: "Restores 4d4+4 HP when consumed."
  }
};