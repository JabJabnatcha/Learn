export function applyClass(classData, subClassName = null) {
  if (!classData) {
    throw new Error("Class data is required");
  }

  const base = {
    savingThrows: classData.SavingThrows ?? [],
    armorProficiencies: classData.ArmorProficiencies ?? [],
    weaponProficiencies: classData.WeaponProficiencies ?? [],
    primaryStat: classData.PrimaryStat ?? "None",
    hitDie: classData.HitDie ?? 0,
    skillChoices: classData.SkillChoices ?? null,
    startingEquipment: classData.startingEquipment ?? {},
  };

  // Placeholder for subclass features in future extensions
  const subClass =
    subClassName && classData.subClasses?.includes(subClassName)
      ? subClassName
      : null;

  return {
    ...base,
    subClass,
    subClassFeatures: subClass ? [] : [],
  };
}