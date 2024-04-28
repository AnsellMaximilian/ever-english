"use client";

import DashboardModule from "@/components/DashboardModule";
import LevelBar from "@/components/LevelBar";
import useAuth from "@/hooks/useAuth";
import React from "react";

export default function UserLevelModule() {
  const { currentAccount } = useAuth();
  return (
    <DashboardModule className="col-span-4 flex flex-col gap-4">
      <DashboardModule.Title className="flex justify-between items-center">
        <span>Current Level</span>{" "}
        <span className="bg-secondPrimary text-secondPrimary-foreground w-10 h-10 flex items-center justify-center rounded-full">
          {currentAccount?.userLevel.level}
        </span>
      </DashboardModule.Title>
      <div className="mx-auto">
        <LevelBar totalXp={currentAccount?.userLevel.xp} />
      </div>
      <div className="font-semibold">3000 more points to next level</div>
    </DashboardModule>
  );
}
