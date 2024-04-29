"use client";
import exerciseTypes from "@/constants/exerciseTypes";
import { cn } from "@/lib/utils";
import React from "react";
//  rounded-full border-border border-4  overflow-hidden gap-2
export default function QuizzSessionPage() {
  return (
    <div>
      <div className="grid grid-cols-2 w-[500px] h-[500px] gap-2">
        {exerciseTypes.map((type, index) => {
          return (
            <div
              key={type.type}
              className={cn(
                "border-border border-4 flex items-center justify-center rounded-md relative",
                index === 0
                  ? "rounded-tl-full"
                  : index === 1
                  ? "rounded-tr-full"
                  : index === 2
                  ? "rounded-bl-full"
                  : "rounded-br-full"
              )}
            >
              <div className="absolute font-bold text-xl right-8 bottom-8">
                {type.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
