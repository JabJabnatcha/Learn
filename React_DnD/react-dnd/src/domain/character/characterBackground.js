export function applyBackgrounds(backgroundIds, BACKGROUNDS) {
  const result = {
    abilityBonus: {},
    skillProficiencies: {},
    items: [],
    money: { pp: 0, gp: 0, sp: 0, cp: 0 },
  };

  for (const id of backgroundIds) {
    const bg = BACKGROUNDS.find(b => b.id === id);
    if (!bg) continue;

    // ability
    for (const [ability, value] of Object.entries(bg.bonus ?? {})) {
      result.abilityBonus[ability] =
        (result.abilityBonus[ability] ?? 0) + value;
    }

    // skills
    for (const skill of bg.skills ?? []) {
      result.skillProficiencies[skill] = true;
    }

    // money
    for (const k of ["pp", "gp", "sp", "cp"]) {
      result.money[k] += bg.money?.[k] ?? 0;
    }

    // items
    result.items.push(...(bg.items ?? []));
  }

  return result;
}
