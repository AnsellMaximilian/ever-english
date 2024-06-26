"use client";

import { account, databases } from "@/appwrite";
import appwriteConfObj from "@/appwrite/conf";
import { UserLevel } from "@/types/data";
import { ID, Models } from "appwrite";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface User extends Models.User<Models.Preferences> {
  userLevel: UserLevel;
}

export default function useAuth() {
  const [currentAccount, setCurrentAccount] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const getSession = async () => {
    try {
      setIsLoading(true);
      const acc = await account.get();

      const userLevel: UserLevel = await databases.getDocument(
        appwriteConfObj.mainDBId,
        appwriteConfObj.userLevelsCollectionId,
        acc.$id,
        []
      );

      setCurrentAccount({ ...acc, userLevel });
    } catch (error) {
      // if (!["/auth/login", "/auth/register", "/"].includes(pathname)) {
      //   router.push("/auth/register");
      // }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const session = await account.createEmailPasswordSession(email, password);
    setIsLoading(false);
    router.push("/dashboard");
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const res = await account.create(ID.unique(), email, password, name);
      await login(email, password);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const promise = await account.deleteSession("current");
    setCurrentAccount(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    getSession();
  }, []);

  return {
    currentAccount,
    isLoading,
    login,
    register,
    logout,
  };
}
