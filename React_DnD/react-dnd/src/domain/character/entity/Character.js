// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\domain\character\entity\Character.js
import { CharacterProfile } from "../value-object/CharacterProfile.js";
import { Wallet } from "../value-object/wallet.js";

const MAX_LEVEL = 10;

const EXP_TABLE = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
};

const CLASS_HIT_DICE = {
  Fighter: 10,
  Wizard: 6,
  Rogue: 8,
  Cleric: 8,
  Paladin: 10,
  Ranger: 10,
  Barbarian: 12,
  Bard: 8,
  Monk: 8,
  Druid: 8,
  Sorcerer: 6,
  Warlock: 8,
};

const SKILL_MAPPING = {
  acrobatics: "dexterity",
  animalHandling: "wisdom",
  arcana: "intelligence",
  athletics: "strength",
  deception: "charisma",
  history: "intelligence",
  insight: "wisdom",
  intimidation: "charisma",
  investigation: "intelligence",
  medicine: "wisdom",
  nature: "intelligence",
  perception: "wisdom",
  performance: "charisma",
  persuasion: "charisma",
  religion: "intelligence",
  sleightOfHand: "dexterity",
  stealth: "dexterity",
  survival: "wisdom",
};

export class Character {
  constructor(rawData, backgrounds = []) {
    this.profile =
      rawData.profile instanceof CharacterProfile
        ? rawData.profile
        : new CharacterProfile({
            age: rawData.age,
            height: rawData.height,
            weight: rawData.weight,
            eyes: rawData.eyes,
            skin: rawData.skin,
            hair: rawData.hair,
          });

    this.#validateRequiredFields(rawData);

    // Identity
    this.charId = rawData.charId;
    this.name = rawData.name;
    this.race = rawData.race;
    this.characterClass = rawData.characterClass;

    // Progression
    this.level = this.#validateLevel(rawData.level ?? 1);
    this.experiencePoints = rawData.experiencePoints ?? 0;

    // Stats
    this.baseStats = this.#initializeBaseStats(rawData.status);
    this.backgroundModifiers = {};
    this.#applyBackgrounds(backgrounds);

    // HP System
    this.maxHP = this.#calculateMaxHP();
    this.currentHP = this.maxHP;
    this.temporaryHP = 0;
    // SkillsProficiency
    this.skillProficiencies = new Set(rawData.skillProficiencies ?? []);

    // wallet
    this.wallet =
      rawData.money instanceof Wallet
        ? rawData.money
        : new Wallet(rawData.money);

    // State
    this.status = "Alive"; // Alive | Unconscious | Dead
  }

  #validateStatScore(score) {
    if (typeof score !== "number") {
      throw new Error("Stat must be a number");
    }

    if (score < 1 || score > 30) {
      throw new Error("Stat must be between 1 and 30");
    }

    return score;
  }

  #validateRequiredFields(rawData) {
    if (!rawData?.charId) throw new Error("Character must have charId");
    if (!rawData?.name) throw new Error("Character must have name");
    if (!rawData?.race) throw new Error("Character must have race");
    if (!rawData?.characterClass) throw new Error("Character must have class");
  }

  #validateLevel(level) {
    if (typeof level !== "number") {
      throw new Error("Level must be a number");
    }

    if (level < 1 || level > MAX_LEVEL) {
      throw new Error(`Level must be between 1 and ${MAX_LEVEL}`);
    }

    return level;
  }

  #initializeBaseStats(status = {}) {
    return {
      strength: this.#validateStatScore(status.strength ?? 10),
      dexterity: this.#validateStatScore(status.dexterity ?? 10),
      constitution: this.#validateStatScore(status.constitution ?? 10),
      intelligence: this.#validateStatScore(status.intelligence ?? 10),
      wisdom: this.#validateStatScore(status.wisdom ?? 10),
      charisma: this.#validateStatScore(status.charisma ?? 10),
    };
  }

  #applyBackgrounds(backgrounds) {
    for (const bg of backgrounds) {
      if (bg.statModifiers) {
        for (const key in bg.statModifiers) {
          this.backgroundModifiers[key] =
            (this.backgroundModifiers[key] ?? 0) + bg.statModifiers[key];
        }
      }
    }
  }

  #getAbilityModifier(statName) {
    const score = this.getFinalStat(statName);
    return Math.floor((score - 10) / 2);
  }

  getSkillModifier(skill) {
    const ability = SKILL_MAPPING[skill];
    if (!ability) {
      throw new Error(`Unknown skill: ${skill}`);
    }

    const abilityMod = this.#getAbilityModifier(ability);

    const proficiency = this.skillProficiencies.has(skill)
      ? this.proficiencyBonus
      : 0;

    return abilityMod + proficiency;
  }

  #calculateMaxHP() {
    const hitDie = CLASS_HIT_DICE[this.characterClass];
    if (!hitDie) {
      throw new Error(`Unknown class: ${this.characterClass}`);
    }

    const conMod = Math.floor((this.getFinalStat("constitution") - 10) / 2);

    // Level 1
    let maxHP = hitDie + conMod;

    // Level 2+
    const avgHitDie = Math.ceil(hitDie / 2) + 1;

    for (let lvl = 2; lvl <= this.level; lvl++) {
      maxHP += avgHitDie + conMod;
    }

    return Math.max(1, maxHP);
  }

  getFinalStat(statName) {
    return this.baseStats[statName] + (this.backgroundModifiers[statName] ?? 0);
  }

  takeDamage(amount) {
    if (this.status === "Dead") return;

    let remainingDamage = amount;

    // 1. หัก temporaryHP ก่อน
    if (this.temporaryHP > 0) {
      const tempUsed = Math.min(this.temporaryHP, remainingDamage);
      this.temporaryHP -= tempUsed;
      remainingDamage -= tempUsed;
    }

    // 2. หัก currentHP
    if (remainingDamage > 0) {
      this.currentHP = Math.max(0, this.currentHP - remainingDamage);
    }

    // 3. เช็คสถานะ
    if (this.currentHP === 0) {
      this.status = "Unconscious";
    }
  }

  heal(amount) {
    if (this.status === "Dead") return;

    this.currentHP = Math.min(this.maxHP, this.currentHP + amount);

    if (this.currentHP > 0) {
      this.status = "Alive";
    }
  }

  applyTemporaryHP(amount) {
    this.temporaryHP = Math.max(this.temporaryHP, amount);
  }

  get proficiencyBonus() {
    if (this.level <= 4) return 2;
    if (this.level <= 8) return 3;
    return 4;
  }

  pay(cost) {
    if (!this.wallet.canAfford(cost)) {
      throw new Error("Not enough gold");
    }

    this.wallet = this.wallet.subtract(cost);
  }

  earn(amount) {
    this.wallet = this.wallet.add(amount);
  }

  isAlive() {
    return this.status === "Alive";
  }

  isUnconscious() {
    return this.status === "Unconscious";
  }

  isDead() {
    return this.status === "Dead";
  }

  markDead() {
    this.status = "Dead";
  }
}
