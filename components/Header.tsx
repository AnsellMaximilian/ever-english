import Image from "next/image";
import React from "react";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import NavLink from "./NavLink";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="p-4">
      <nav className="flex items-center gap-8 justify-between">
        <div>
          <Image src={logofull} width={300} height={84.25} alt="logo full" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Login</Button>
          <Button className="font-semibold">Register</Button>
        </div>
      </nav>
    </header>
  );
}
