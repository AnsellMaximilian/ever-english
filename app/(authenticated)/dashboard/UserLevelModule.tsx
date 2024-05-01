"use client";

import DashboardModule from "@/components/DashboardModule";
import LevelBar from "@/components/LevelBar";
import englishLevels from "@/constants/englishLevels";
import useAuth from "@/hooks/useAuth";
import { getNextLevel } from "@/utils/level";
import React from "react";

export default function UserLevelModule() {
  const { currentAccount } = useAuth();

  const nextLvl = currentAccount
    ? getNextLevel(currentAccount.userLevel.xp, englishLevels)
    : null;
  return (
    <DashboardModule className="flex flex-col gap-4">
      <DashboardModule.Title className="flex justify-between items-center">
        <span>Current Level</span>{" "}
        <span className="bg-secondPrimary text-secondPrimary-foreground w-10 h-10 flex items-center justify-center rounded-full">
          {currentAccount?.userLevel.level}
        </span>
      </DashboardModule.Title>
      <div className="mx-auto">
        <LevelBar totalXp={currentAccount?.userLevel.xp} />
      </div>
      <div className="font-semibold">
        {nextLvl && currentAccount
          ? nextLvl.requiredXp - currentAccount.userLevel.xp
          : 0}{" "}
        more points to next level {nextLvl?.level}
      </div>
    </DashboardModule>
  );
}
