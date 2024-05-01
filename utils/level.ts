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
  let level = "A0";
  let currentLevelXpReq = 0;

  engLvls.forEach((lvl) => {
    if (lvl.requiredXp > currentLevelXpReq && xp >= lvl.requiredXp) {
      currentLevelXpReq = lvl.requiredXp;
      level = lvl.level;
    }
  });

  return level;
};

export const getSortedLevels = (
  engLvls: typeof englishLevels,
  asc: boolean = false
) => {
  return [...engLvls].sort(
    (a, b) => (b.requiredXp - a.requiredXp) * (asc ? -1 : 1)
  );
};

export const getNextLevel = (
  currentXp: number,
  engLvls: typeof englishLevels
) => {
  const sortedLevels = getSortedLevels(engLvls, true);
  let nextLevel: null | (typeof engLvls)[number] = null;

  for (let i = 0; i < sortedLevels.length; i++) {
    const lvl = sortedLevels[i];
    if (nextLevel === null && lvl.requiredXp > currentXp) {
      nextLevel = lvl;
    }
  }

  return nextLevel;
};

export const getLvlByName = (name: string, engLvls: typeof englishLevels) => {
  const beginnerLvl: (typeof englishLevels)[number] = {
    concepts: [
      "Introduction to English Letters",
      "Greetings and Simple Phrases",
      "Numbers 1-10",
      "Colors and Shapes",
      "Everyday Objects",
      "Basic Commands",
      "Personal Pronouns",
      "Introduction to Simple Present Tense",
      "Family Members",
      "Introduction to Days of the Week",
    ],
    level: "A0",
    requiredXp: 0,
  };

  const foundLvl = engLvls.find((lvl) => lvl.level === name);
  return foundLvl ? foundLvl : beginnerLvl;
};
