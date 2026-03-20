export class Item {
  constructor({
    id,
    name,
    type, // 'weapon', 'armor', 'food', 'tool', 'magic'
    value = { pp: 0, gp: 0, sp: 0, cp: 0 }, // Wallet-like object
    weight = 0,
    properties = {},
    rarity = 'common',
    description = '',
    equipped = false,
  }) {
    if (!id || !name || !type) {
      throw new Error('Item must have id, name, and type');
    }

    this.id = id;
    this.name = name;
    this.type = type;
    this.value = { ...value };
    this.weight = weight;
    this.properties = { ...properties };
    this.rarity = rarity;
    this.description = description;
    this.equipped = equipped;

    Object.freeze(this);
  }

  // ==================== METHODS ====================
  canEquip() {
    return ['weapon', 'armor'].includes(this.type);
  }

  isEquipped() {
    return this.equipped;
  }

  equip() {
    if (!this.canEquip()) {
      throw new Error(`Cannot equip item of type: ${this.type}`);
    }
    return new Item({ ...this, equipped: true });
  }

  unequip() {
    return new Item({ ...this, equipped: false });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
      weight: this.weight,
      properties: this.properties,
      rarity: this.rarity,
      description: this.description,
      equipped: this.equipped,
    };
  }

  static fromJSON(data) {
    return new Item(data);
  }
}
