import { CLASSES } from "../../gameData/classes.js";
// import { BACKGROUNDS } from "../../gameData/backgrounds.js";
import { CharacterProfile } from "../value-object/CharacterProfile.js";
import { Wallet } from "../value-object/wallet.js";
import { calculateMaxHP } from "../services/HpCalculator.js";
import { applyRace } from "../services/RaceApplier.js";
import { applyClass } from "../services/ClassApplier.js";
import { applyBackgrounds } from "../services/BackgroundApplier.js";
import { AbilityScore } from "../value-object/AbilityScores.js";
import { Item, toItem } from "../../Item/index.js";

const MAX_LEVEL = 10;

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

    this.charId = rawData.charId;
    this.name = rawData.name;
    this.alignment = rawData.alignment;
    this.race = rawData.race;
    this.subRace = rawData.subRace;
    this.characterClass = rawData.characterClass;
    this.characterSubClass = rawData.characterSubClass;
    this.level = this.#validateLevel(rawData.level ?? 1);
    this.experiencePoints = rawData.experiencePoints ?? 0;

    const baseStatusPayload = rawData.baseStatus ?? rawData.status ?? {};
    this.baseStatus = new AbilityScore(baseStatusPayload);

    const raceApplied = applyRace(
      this.baseStatus,
      rawData.race,
      rawData.subRace,
    );

    this.features = raceApplied.features;
    this.languages = raceApplied.languages;
    this.speed = raceApplied.speed;
    this.abilityScores = raceApplied.abilityScore;

    const classData = CLASSES[this.characterClass];
    if (!classData) {
      throw new Error(`Unknown class: ${this.characterClass}`);
    }

    const classApplied = applyClass(classData.base, this.characterSubClass);

    this.savingThrows = classApplied.savingThrows;
    this.armorProficiencies = classApplied.armorProficiencies;
    this.weaponProficiencies = classApplied.weaponProficiencies;
    this.primaryStat = classApplied.primaryStat;
    this.hitDie = classApplied.hitDie;
    this.skillChoices = classApplied.skillChoices;
    this.subClass = classApplied.subClass;
    this.subClassFeatures = classApplied.subClassFeatures;

    this.backgrounds = Array.isArray(backgrounds) ? backgrounds : [backgrounds];
    const backgroundApplied = applyBackgrounds(this.backgrounds);

    this.backgroundModifiers = backgroundApplied.statModifiers;
    this.features = [...new Set([...(this.features ?? []), ...backgroundApplied.features])];
    this.skillProficiencies = new Set([
      ...(rawData.skillProficiencies ?? []),
      ...backgroundApplied.skillProficiencies,
    ]);

    this.wallet =
      rawData.money instanceof Wallet ? rawData.money : new Wallet(rawData.money);
    this.wallet = this.wallet.add(backgroundApplied.wallet);

    this.inventory = Array.isArray(rawData.inventory)
      ? rawData.inventory.map((itemEntry) => {
          if (itemEntry instanceof Item) return itemEntry;
          if (typeof itemEntry === "string") return toItem(itemEntry);
          if (itemEntry?.id) return toItem(itemEntry.id);
          throw new Error("Invalid inventory item format");
        })
      : [];

    this.maxHP = calculateMaxHP(
      this.level,
      this.hitDie,
      this.getFinalStat("constitution"),
    );

    this.currentHP = rawData.currentHP ?? this.maxHP;
    this.temporaryHP = 0;
    this.status = "Alive";
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
  getSkillModifier(skill) {
    const ability = SKILL_MAPPING[skill];
    if (!ability) {
      throw new Error(`Unknown skill: ${skill}`);
    }

    const abilityMod = this.getAbilityModifier(ability);

    const proficiency = this.skillProficiencies.has(skill)
      ? this.proficiencyBonus
      : 0;

    return abilityMod + proficiency;
  }

  getAbilityModifier(statName) {
    return this.abilityScores.getModifier(statName);
  }

  getFinalStat(statName) {
    const value = this.abilityScores.get(statName);

    if (value === undefined || value === null) {
      throw new Error(`Unknown ability stat: ${statName}`);
    }

    return value + (this.backgroundModifiers[statName] ?? 0);
  }

  getTotalProficiencies() {
    return {
      armor: [...new Set([...(this.armorProficiencies || [])])],
      weapons: [...new Set([...(this.weaponProficiencies || [])])],
      savingThrows: [...new Set([...(this.savingThrows || [])])],
      skills: [...new Set([...this.skillProficiencies])],
      tools: [...new Set(this.inventory.filter((item) => item.type === "tool").map((item) => item.name))],
    };
  }

  getEquippedArmor() {
    return this.inventory.find((item) => item.type === "armor" && item.equipped);
  }

  getEquippedShield() {
    return this.inventory.find((item) => item.type === "armor" && item.equipped && item.id === "shield");
  }

  getArmorClass() {
    const dexterityMod = this.getAbilityModifier("dexterity");
    const armor = this.getEquippedArmor();
    const shield = this.getEquippedShield();

    let ac = 10;

    if (armor) {
      ac = armor.armorClass;
      if (armor.dexterityLimit !== null && armor.dexterityLimit !== undefined) {
        ac += Math.min(dexterityMod, armor.dexterityLimit);
      } else {
        ac += dexterityMod;
      }
    } else {
      ac += dexterityMod;
    }

    if (shield) {
      ac += shield.armorClass || 2;
    }

    return ac;
  }

  addItem(itemDataOrId) {
    const newItem = itemDataOrId instanceof Item ? itemDataOrId : toItem(itemDataOrId);
    this.inventory = [...this.inventory, newItem];
    return this;
  }

  removeItem(itemId) {
    this.inventory = this.inventory.filter((item) => item.id !== itemId);
    return this;
  }

  equipItem(itemId) {
    this.inventory = this.inventory.map((item) =>
      item.id === itemId ? item.equip() : item,
    );
    return this;
  }

  unequipItem(itemId) {
    this.inventory = this.inventory.map((item) =>
      item.id === itemId ? item.unequip() : item,
    );
    return this;
  }

  getInventoryWeight() {
    return this.inventory.reduce((sum, item) => sum + (item.weight || 0), 0);
  }

  takeDamage(amount) {
    if (this.status === "Dead") return;

    let remainingDamage = amount;

    if (this.temporaryHP > 0) {
      const tempUsed = Math.min(this.temporaryHP, remainingDamage);
      this.temporaryHP -= tempUsed;
      remainingDamage -= tempUsed;
    }

    if (remainingDamage > 0) {
      this.currentHP = Math.max(0, this.currentHP - remainingDamage);
    }

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
