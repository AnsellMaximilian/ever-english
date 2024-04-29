import { Client, Databases, Permission, Role  } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);


  const databases = new Databases(client);

  const user = req.body;

  try {
    const createdUserLevelObj = await databases.createDocument(
        process.env.MAIN_DATABASE_ID,
        process.env.USER_LEVELS_COLLECTION_ID,
        user.$id,
        {
          level: "A1",
          xp: 0,
        },
        [
          Permission.read(Role.any()), Permission.update(Role.user(user.$id))
        ]



    )

    return res.json(createdUserLevelObj);
  } catch (e) {
    error("Failed to create document: " + e.message)
    return res.send("Failed to create document")
  }

};
