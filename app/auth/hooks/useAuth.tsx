"use client";

import { account } from "@/appwrite";
import { ID, Models } from "appwrite";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [currentAccount, setCurrentAccount] =
    useState<null | Models.User<Models.Preferences>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const getSession = async () => {
    try {
      const acc = await account.get();
      setCurrentAccount(acc);
    } catch (error) {
      console.log(error, { test: "Test" });
      if (!["/auth/login", "/auth/register", "/"].includes(pathname)) {
        router.push("/auth/register");
      }
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
