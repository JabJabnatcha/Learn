import { BACKGROUNDS } from "../../gameData/backgrounds.js";

export function applyBackgrounds(backgrounds = []) {
  if (!Array.isArray(backgrounds)) {
    throw new Error("Backgrounds must be an array");
  }

  const aggregated = {
    statModifiers: {},
    skills: new Set(),
    items: new Set(),
    wallet: {
      pp: 0,
      gp: 0,
      sp: 0,
      cp: 0,
    },
    features: new Set(),
  };

  for (const bg of backgrounds) {
    const raw = bg?.id ? BACKGROUNDS.find((b) => b.id === bg.id) : bg;
    if (!raw) continue;

    // ability bonuses
    for (const [key, value] of Object.entries(raw.bonus || {})) {
      aggregated.statModifiers[key] = (aggregated.statModifiers[key] ?? 0) + value;
    }

    // skill proficiencies
    for (const skill of raw.skills || []) {
      aggregated.skills.add(skill.toLowerCase());
    }

    // items
    for (const item of raw.items || []) {
      aggregated.items.add(item);
    }

    // money
    const money = raw.money || {};
    aggregated.wallet.pp += money.pp ?? 0;
    aggregated.wallet.gp += money.gp ?? 0;
    aggregated.wallet.sp += money.sp ?? 0;
    aggregated.wallet.cp += money.cp ?? 0;

    // features
    for (const feature of raw.features || []) {
      aggregated.features.add(feature);
    }
  }

  return {
    statModifiers: aggregated.statModifiers,
    skillProficiencies: Array.from(aggregated.skills),
    items: Array.from(aggregated.items),
    wallet: aggregated.wallet,
    features: Array.from(aggregated.features),
  };
}
