import englishLevels from "@/constants/englishLevels";
import { cn } from "@/lib/utils";
import React from "react";

export default function LevelBar() {
  return (
    <div>
      <div className="h-[250px] w-[50px] rounded-md bg-gray-400 flex flex-col overflow-hidden">
        {englishLevels.map((level, index) => {
          return (
            <div
              key={level.level}
              className={cn(
                "flex gap-1 justify-center items-center text-primary-foreground font-bold",
                index > 2 ? "bg-primary" : ""
              )}
              style={{
                height: 250 / englishLevels.length,
              }}
            >
              <div className="grow h-[1px] bg-white"></div>
              <div>{level.level}</div>
              <div className="grow h-[1px] bg-white"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
