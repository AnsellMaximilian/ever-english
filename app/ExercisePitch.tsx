import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

export default function ExercisePitch({
  src,
  title,
  desc,
  side = "LEFT",
}: {
  src: StaticImport;
  title: string;
  desc: string;
  side?: "LEFT" | "RIGHT";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-left",
        side === "RIGHT" ? "ml-auto flex-row-reverse text-right" : ""
      )}
    >
      <Image src={src} width={100} height={100} alt={title} />
      <div>
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-xl">{desc}</p>
      </div>
    </div>
  );
}
