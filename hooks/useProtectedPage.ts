import { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

export default function useProtectedPage() {
  const router = useRouter();
  const { currentAccount, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !currentAccount) {
      router.push("/auth/login");
    }
  }, [currentAccount, isLoading, router]);
}
