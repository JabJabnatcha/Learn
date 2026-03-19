export function applyClass(classData) {
  return {
    savingThrows: classData.SavingThrows ?? [],
    armorProficiencies: classData.ArmorProficiencies ?? [],
    weaponProficiencies: classData.WeaponProficiencies ?? [],
    primaryStat: classData.PrimaryStat ?? "None",
    hitDie: classData.HitDie ?? 0,
    skillChoices: classData.SkillChoices ?? null,
  };
}