import { account } from "@/appwrite";
import { Models } from "appwrite";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [currentAccount, setCurrentAccount] =
    useState<null | Models.User<Models.Preferences>>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const getSession = async () => {
    try {
      const acc = await account.get();
      setCurrentAccount(acc);
    } catch (error) {
      if (!["/auth/login", "/auth/register"].includes(pathname)) {
        router.push("/auth/register");
      }
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
    logout,
  };
}
