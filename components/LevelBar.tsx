import englishLevels from "@/constants/englishLevels";
import { cn } from "@/lib/utils";
import { getBarHeight, getMaxXp, getPrevLvlXp } from "@/utils/levelBar";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSortedLevels } from "@/utils/level";

const sortedLevels = getSortedLevels(englishLevels);

export default function LevelBar({ totalXp = 0 }: { totalXp?: number }) {
  const barHeight = 250;
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="w-[50px] rounded-md bg-gray-400 flex flex-col overflow-hidden relative cursor-pointer"
              style={{ height: barHeight }}
            >
              <div
                className="absolute inset-x-0 bg-primary bottom-0 transition-all duration-200"
                style={{
                  height: `${(totalXp / getMaxXp(sortedLevels)) * 100}%`,
                }}
              ></div>
              <div className="relative w-full h-full">
                {sortedLevels.map((level, index) => {
                  return (
                    <div
                      key={level.level}
                      className={cn(
                        "flex gap-1 justify-center items-center text-primary-foreground font-bold"
                      )}
                      style={{
                        height: `${
                          ((level.requiredXp -
                            getPrevLvlXp(sortedLevels, level)) /
                            getMaxXp(sortedLevels)) *
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
          </TooltipTrigger>
          <TooltipContent>
            <p>{totalXp} xp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
