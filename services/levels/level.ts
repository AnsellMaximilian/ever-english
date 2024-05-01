import { databases } from "@/appwrite";
import appwriteConfObj from "@/appwrite/conf";
import englishLevels from "@/constants/englishLevels";
import { UserLevel } from "@/types/data";
import { SessionResult } from "@/types/helpers";
import { getUpdatedLevel, getXpFromSessionResult } from "@/utils/level";

export const updateXpAndLevel = async (
  sessionResult: SessionResult,
  userId: string,
  engLvls: typeof englishLevels
) => {
  const userLevel: UserLevel = await databases.getDocument(
    appwriteConfObj.mainDBId,
    appwriteConfObj.userLevelsCollectionId,
    userId
  );

  const newXp = userLevel.xp + getXpFromSessionResult(sessionResult);

  const newUserLevel: UserLevel = await databases.updateDocument(
    appwriteConfObj.mainDBId,
    appwriteConfObj.userLevelsCollectionId,
    userId,
    {
      xp: newXp,
      level: getUpdatedLevel(newXp, engLvls),
    }
  );

  return newUserLevel;
};
