"use client";

import Image from "next/image";
import React from "react";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import NavLink from "./NavLink";
import { Button } from "./ui/button";
import Link from "next/link";
import { account } from "@/appwrite";
import useAuth from "@/app/auth/hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header className="p-4">
      <nav className="flex items-center gap-8 justify-between">
        <Link href="/">
          <Image src={logofull} width={300} height={84.25} alt="logo full" />
        </Link>
        <div className="flex items-center gap-2">
          <Button className="font-semibold" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
