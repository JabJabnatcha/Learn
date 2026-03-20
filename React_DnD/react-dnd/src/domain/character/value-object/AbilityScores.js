const ABILITY_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

function normalizeKey(stat) {
  if (!stat) return null;
  const lowered = stat.toString().toLowerCase();
  return ABILITY_KEYS.includes(lowered) ? lowered : null;
}

function readValue(stats = {}, statName) {
  if (!statName) return 0;

  const candidates = [
    statName,
    statName.toLowerCase(),
    statName.toUpperCase(),
    statName[0]?.toUpperCase() + statName.slice(1).toLowerCase(),
  ];

  for (const candidate of candidates) {
    const value = stats?.[candidate];
    if (value !== undefined && value !== null && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }

  return 0;
}

export class AbilityScore {
  constructor(stats = {}) {
    this.stats = {};

    for (const key of ABILITY_KEYS) {
      this.stats[key] = readValue(stats, key);
    }
  }

  // ==================== GET ====================
  get(stat) {
    const key = normalizeKey(stat);
    if (!key) throw new Error(`Unknown ability stat: ${stat}`);
    return this.stats[key] ?? 0;
  }

  // ==================== ADD ====================
  add(stat, value) {
    const key = normalizeKey(stat);
    if (!key) throw new Error(`Unknown ability stat: ${stat}`);

    return new AbilityScore({
      ...this.stats,
      [key]: this.get(key) + Number(value),
    });
  }

  // ==================== ADD MANY ====================
  addMany(bonusObject) {
    let result = new AbilityScore(this.stats);

    for (const stat in bonusObject) {
      result = result.add(stat, bonusObject[stat]);
    }

    return result;
  }

  // ==================== MODIFIER ====================
  getModifier(stat) {
    return Math.floor((this.get(stat) - 10) / 2);
  }

  // ==================== MERGE ====================
  merge(other) {
    if (!(other instanceof AbilityScore)) {
      throw new Error("Can only merge with another AbilityScore");
    }
    return this.addMany(other.stats);
  }

  // ==================== SERIALIZE ====================
  toJSON() {
    return { ...this.stats };
  }
}