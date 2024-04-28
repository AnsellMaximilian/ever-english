"use client";
import DashboardModule from "@/components/DashboardModule";
import Header from "@/components/Header";
import LevelBar from "@/components/LevelBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserLevelModule from "./UserLevelModule";

function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <DashboardModule className="col-span-8">
        <DashboardModule.Title>Title</DashboardModule.Title>
        <div>
          <Link
            href="/quiz-session"
            className={cn(buttonVariants(), "font-bold")}
          >
            Start a Session
          </Link>
        </div>
      </DashboardModule>
      <UserLevelModule />
    </div>
  );
}

export default Dashboard;
