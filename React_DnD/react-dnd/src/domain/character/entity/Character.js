import { CLASSES } from "../../gameData/classes.js";
import { CharacterProfile } from "../value-object/CharacterProfile.js";
import { Wallet } from "../value-object/wallet.js";
import { calculateMaxHP } from "../services/HpCalculator.js";
import { applyRace } from "../services/RaceApplier.js";
import { applyClass } from "../services/ClassApplier.js";
import { AbilityScore } from "../value-object/AbilityScores.js";

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

    const classData = CLASSES[rawData.characterClass];
    if (!classData) {
      throw new Error(`Unknown class: ${rawData.characterClass}`);
    }
    const classApplied = applyClass(classData.base);

    this.savingThrows = classApplied.savingThrows;
    this.armorProficiencies = classApplied.armorProficiencies;
    this.weaponProficiencies = classApplied.weaponProficiencies;
    this.primaryStat = classApplied.primaryStat;
    this.hitDie = classApplied.hitDie;
    this.skillChoices = classApplied.skillChoices;

    this.backgroundModifiers = {};
    this.#applyBackgrounds(backgrounds);

    this.maxHP = calculateMaxHP(
      this.level,
      this.hitDie,
      this.getFinalStat("constitution"),
    );

    this.currentHP = rawData.currentHP ?? this.maxHP;
    this.temporaryHP = 0;

    this.skillProficiencies = new Set(rawData.skillProficiencies ?? []);

    this.wallet =
      rawData.money instanceof Wallet
        ? rawData.money
        : new Wallet(rawData.money);

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
