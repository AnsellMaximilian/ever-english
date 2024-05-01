"use client";

import exerciseTypes from "@/constants/exerciseTypes";
import { cn } from "@/lib/utils";
import React from "react";

export default function ExerciseTypeWheel({
  types,
  currentDisplayedSelectedIndex,
  selectedTypeIndex,
}: {
  types: typeof exerciseTypes;
  currentDisplayedSelectedIndex: number;
  selectedTypeIndex: null | number;
}) {
  return (
    <div className="grid grid-cols-2 w-[500px] h-[500px] gap-2">
      {types.map((type, index) => {
        return (
          <div
            key={type.type}
            className={cn(
              " border-border border-4 flex items-center justify-center rounded-md relative transition-all duration-100 cursor-pointer",
              index === 0
                ? "rounded-tl-full"
                : index === 1
                ? "rounded-tr-full"
                : index === 2
                ? "rounded-bl-full"
                : "rounded-br-full",
              "bg-secondPrimary text-secondPrimary-foreground",
              (currentDisplayedSelectedIndex === index &&
                selectedTypeIndex === null) ||
                selectedTypeIndex === index
                ? "bg-primary"
                : ""
            )}
          >
            <div
              className={cn(
                "absolute font-bold text-xl",

                index === 0
                  ? "right-8 bottom-8 text-right"
                  : index === 1
                  ? "left-8 bottom-8 text-left"
                  : index === 2
                  ? "right-8 top-8 text-right"
                  : "left-8 top-8 text-left"
              )}
            >
              {type.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
