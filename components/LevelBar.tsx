import englishLevels from "@/constants/englishLevels";
import { cn } from "@/lib/utils";
import { getBarHeight, getMaxXp, getPrevLvlXp } from "@/utils/levelBar";
import React from "react";

export default function LevelBar({ totalXp = 0 }: { totalXp?: number }) {
  const barData = getBarHeight(englishLevels);

  const barHeight = 250;

  console.log({ barData });
  return (
    <div>
      <div
        className="w-[50px] rounded-md bg-gray-400 flex flex-col overflow-hidden relative"
        style={{ height: barHeight }}
      >
        <div
          className="absolute inset-x-0 bg-primary bottom-0 transition-all duration-200"
          style={{
            height: `${(totalXp / getMaxXp(englishLevels)) * 100}%`,
          }}
        ></div>
        <div className="relative w-full h-full">
          {englishLevels.map((level, index) => {
            return (
              <div
                key={level.level}
                className={cn(
                  "flex gap-1 justify-center items-center text-primary-foreground font-bold"
                )}
                style={{
                  height: `${
                    ((level.requiredXp - getPrevLvlXp(englishLevels, level)) /
                      getMaxXp(englishLevels)) *
                    100
                  }%`,
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
    </div>
  );
}
