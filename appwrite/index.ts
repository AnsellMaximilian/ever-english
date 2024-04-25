import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)); // Replace with your project ID

export const account = new Account(client);
