import { RACES } from "../../gameData/races.js";
import { CLASSES } from "../../gameData/classes.js";
import { CharacterProfile } from "../value-object/CharacterProfile.js";
import { Wallet } from "../value-object/wallet.js";

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
    const raceData = RACES[rawData.race];
    const subRaceData = raceData?.subRaces?.[rawData.subRace];
    const classData = CLASSES[rawData.characterClass];

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

    this.baseStatus = this.#initializeBaseStatus(rawData.status);

    this.#applyRace(raceData.base, subRaceData);

    this.#applyClass(classData.base);
    this.backgroundModifiers = {};
    this.#applyBackgrounds(backgrounds);

    this.maxHP = this.#calculateMaxHP();

    this.currentHP = rawData.currentHP ?? this.maxHP;
    this.temporaryHP = 0;

    this.skillProficiencies = new Set(rawData.skillProficiencies ?? []);

    this.wallet =
      rawData.money instanceof Wallet
        ? rawData.money
        : new Wallet(rawData.money);

    this.status = "Alive";
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

  #initializeBaseStatus(status = {}) {
    const safe = (val) => {
      const num = Number(val);
      if (isNaN(num) || num < 1) return 10;
      if (num > 30) return 30;
      return num;
    };

    return {
      strength: safe(status.strength),
      dexterity: safe(status.dexterity),
      constitution: safe(status.constitution),
      intelligence: safe(status.intelligence),
      wisdom: safe(status.wisdom),
      charisma: safe(status.charisma),
    };
  }

  #applyRace(race, subRace) {
    this.features = [
      ...new Set([...(race.features ?? []), ...(subRace?.features ?? [])]),
    ];
    this.languages = [
      ...new Set([...(race.languages ?? []), ...(subRace?.languages ?? [])]),
    ];
    this.speed = subRace?.speed ?? race.speed ?? 30;

    const raceBonus = {
      ...(race.bonus ?? {}),
      ...(subRace?.bonus ?? {}),
    };
    for (const stat in raceBonus) {
      const key = stat.toLowerCase();

      if (this.baseStatus[key] !== undefined) {
        this.baseStatus[key] += raceBonus[stat];
      }
    }
  }

  #applyClass(classBase) {
    this.savingThrows = classBase.SavingThrows ?? [];
    this.armorProficiencies = classBase.ArmorProficiencies ?? [];
    this.weaponProficiencies = classBase.WeaponProficiencies ?? [];
    this.primaryStat = classBase.PrimaryStat ?? "None";

    this.hitDie = classBase.HitDie ?? 0;

    this.skillChoices = classBase.SkillChoices ?? null;
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
    const hitDie = this.hitDie;
    if (!hitDie) {
      throw new Error(`Unknown class: ${this.characterClass}`);
    }

    const conMod = Math.floor((this.getFinalStat("constitution") - 10) / 2);

    let maxHP = hitDie + conMod;

    const avgHitDie = Math.ceil(hitDie / 2) + 1;

    for (let lvl = 2; lvl <= this.level; lvl++) {
      maxHP += avgHitDie + conMod;
    }

    return Math.max(1, maxHP);
  }

  getFinalStat(statName) {
    return (
      this.baseStatus[statName] + (this.backgroundModifiers[statName] ?? 0)
    );
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
