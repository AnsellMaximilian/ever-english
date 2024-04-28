import { Models } from "appwrite";

export interface UserLevel extends Models.Document {
  level: string;
  xp: number;
}
