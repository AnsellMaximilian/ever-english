const appwriteConfObj = {
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  mainDBId: String(process.env.NEXT_PUBLIC_MAIN_DATABASE_ID),
  userLevelsCollectionId: String(
    process.env.NEXT_PUBLIC_USER_LEVELS_COLLECTION_ID
  ),
};

export default appwriteConfObj;
