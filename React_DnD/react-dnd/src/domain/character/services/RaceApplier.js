import { RACES } from "../../gameData/races.js";
import { AbilityScore } from "../value-object/AbilityScores.js";

export function applyRace(baseStatus, raceName, subRaceName) {
  const raceData = RACES[raceName];
  const subRaceData = raceData?.subRaces?.[subRaceName];

  const features = [
    ...new Set([
      ...(raceData?.features ?? []),
      ...(subRaceData?.features ?? []),
    ]),
  ];

  const languages = [
    ...new Set([
      ...(raceData?.languages ?? []),
      ...(subRaceData?.languages ?? []),
    ]),
  ];

  const speed = subRaceData?.speed ?? raceData?.speed ?? 30;

  const updatedStatus = {
    strength: baseStatus.get("strength"),
    dexterity: baseStatus.get("dexterity"),
    constitution: baseStatus.get("constitution"),
    intelligence: baseStatus.get("intelligence"),
    wisdom: baseStatus.get("wisdom"),
    charisma: baseStatus.get("charisma"),
  };

  const raceBonus = {
    ...(raceData?.bonus ?? {}),
    ...(subRaceData?.bonus ?? {}),
  };

  for (const stat in raceBonus) {
    const key = stat.toLowerCase();

    if (updatedStatus[key] !== undefined) {
      updatedStatus[key] += raceBonus[stat];
    }
  }

  return {
    features,
    languages,
    speed,
    abilityScore: new AbilityScore(updatedStatus),
  };
}