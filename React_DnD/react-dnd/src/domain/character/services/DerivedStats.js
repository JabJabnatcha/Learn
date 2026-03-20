export function calculateMaxHP(level, hitDie, constitution) {
  const conMod = Math.floor((constitution - 10) / 2);

  let maxHP = Math.max(1, hitDie + conMod);

  const avgHitDie = Math.ceil(hitDie / 2) + 1;

  for (let lvl = 2; lvl <= level; lvl++) {
    maxHP += avgHitDie + conMod;
  }

  return Math.max(1, maxHP);
}

export function calculateProficiencyBonus(level) {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  return 4;
}

export function calculateAbilityModifier(score) {
  return Math.floor((score - 10) / 2);
}

export function calculateSkillCheck(statValue, proficiency, proficiencyBonus) {
  const modifier = calculateAbilityModifier(statValue) + (proficiency ? proficiencyBonus : 0);
  return modifier;
}
