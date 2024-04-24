"use client";

import { cn } from "@/lib/utils";
import NextJsLink, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const NavLink = ({ ...props }: PropsWithChildren<LinkProps>) => {
  const currentRoute = usePathname();
  const { href, children } = props;
  const isActive = new RegExp(`^${href}`).test(currentRoute);
  return (
    <NextJsLink
      {...props}
      className={cn(
        "font-bold",
        isActive
          ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondPrimary"
          : "text-black"
      )}
    >
      {children}
    </NextJsLink>
  );
};

export default NavLink;
