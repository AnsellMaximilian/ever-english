import englishLevels from "@/constants/englishLevels";
import { XP_MULTIPLIER } from "@/constants/level";
import { SessionResult } from "@/types/helpers";

export const getXpFromSessionResult = (sessionResult: SessionResult) => {
  const totalExercies = sessionResult.resultDetails.length;
  const totalCorrect = sessionResult.resultDetails.filter(
    (d) => d.isCorrect
  ).length;

  const accuracy = totalCorrect / totalExercies;

  return accuracy * XP_MULTIPLIER;
};

export const getUpdatedLevel = (xp: number, engLvls: typeof englishLevels) => {
  let level = "A1";
  let currentLevelXpReq = 0;

  engLvls.forEach((lvl) => {
    if (lvl.requiredXp > currentLevelXpReq && xp >= lvl.requiredXp) {
      currentLevelXpReq = lvl.requiredXp;
      level = lvl.level;
    }
  });

  return level;
};
