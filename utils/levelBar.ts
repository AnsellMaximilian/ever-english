import englishLevels from "@/constants/englishLevels";
import { UserLevel } from "@/types/data";

export function getMaxXp(engLvls: typeof englishLevels) {
  let max = 0;

  engLvls.forEach((lvl) => {
    if (lvl.requiredXp >= max) {
      max = lvl.requiredXp;
    }
  });

  return max;
}

export function getPrevLvlXp(
  engLvls: typeof englishLevels,
  engLvl: (typeof englishLevels)[0]
) {
  let xp = 0;

  for (let i = 0; i < engLvls.length; i++) {
    if (engLvls[i].requiredXp < engLvl.requiredXp) {
      xp = engLvls[i].requiredXp;
      break;
    }
  }

  return xp;
}

export function getBarHeight(
  engLvls: typeof englishLevels,
  maxHeight: number = 250
) {
  const expSum = getMaxXp(engLvls);

  console.log({ expSum, maxHeight });

  if (expSum <= maxHeight) {
    return {
      height: expSum,
      scalingFactor: 1,
    };
  }

  const scalingFactor = maxHeight / expSum;

  const normalizedNumbers = engLvls.map(
    (lvl) => lvl.requiredXp * scalingFactor
  );

  return {
    height: normalizedNumbers.reduce((acc, num) => acc + num, 0),
    scalingFactor,
  };
}
