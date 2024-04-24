import Image from "next/image";
import React from "react";
import logofull from "@/assets/images/icon.svg";

export default function Header() {
  return (
    <header>
      <nav>
        <div>
          <Image src={logofull} width={300} height={300} alt="logo full" />
        </div>
      </nav>
    </header>
  );
}
