export class AbilityScore {
  constructor(stats) {
    this.stats = {
      Strength: stats.Strength ?? 0,
      Dexterity: stats.Dexterity ?? 0,
      Constitution: stats.Constitution ?? 0,
      Intelligence: stats.Intelligence ?? 0,
      Wisdom: stats.Wisdom ?? 0,
      Charisma: stats.Charisma ?? 0,
    };
  }

  // ==================== GET ====================
  get(stat) {
    return this.stats[stat] ?? 0;
  }

  // ==================== ADD ====================
  add(stat, value) {
    return new AbilityScore({
      ...this.stats,
      [stat]: this.get(stat) + value,
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
    return this.addMany(other.stats);
  }

  // ==================== SERIALIZE ====================
  toJSON() {
    return { ...this.stats };
  }
}