"use client";

import Image from "next/image";
import React from "react";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import NavLink from "./NavLink";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { account } from "@/appwrite";
import useAuth from "@/app/auth/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Header({ landing = false }: { landing?: boolean }) {
  const { logout, currentAccount } = useAuth();
  return (
    <header className="p-4">
      <nav className="flex items-center gap-8 justify-between">
        <Link href="/">
          <Image src={logofull} width={300} height={84.25} alt="logo full" />
        </Link>
        <div className="flex items-center gap-2">
          {landing ? (
            currentAccount ? (
              <Link
                href="/dashboard"
                className={cn(buttonVariants(), "font-semibold")}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "font-semibold"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={cn(buttonVariants(), "font-semibold")}
                >
                  Register
                </Link>
              </>
            )
          ) : (
            <Button className="font-semibold" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
