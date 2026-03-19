export function calculateMaxHP(level, hitDie, constitution) {
  const conMod = Math.floor((constitution - 10) / 2);

  let maxHP = hitDie + conMod;

  const avgHitDie = Math.ceil(hitDie / 2) + 1;

  for (let lvl = 2; lvl <= level; lvl++) {
    maxHP += avgHitDie + conMod;
  }

  return Math.max(1, maxHP);
}