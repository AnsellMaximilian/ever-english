import Image from "next/image";
import React from "react";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import NavLink from "./NavLink";

const linkItems = [
  { name: "Landing", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Dashboard", href: "/" },
];

export default function Header() {
  return (
    <header className="p-4">
      <nav className="flex items-center gap-8">
        <div>
          <Image src={logofull} width={300} height={84.25} alt="logo full" />
        </div>
        <ul className="flex gap-2 items-center text-xl">
          {linkItems.map((link, index) => (
            <li key={link.href + index}>
              <NavLink href={link.href}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
