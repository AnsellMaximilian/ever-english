"use client";
import DashboardModule from "@/components/DashboardModule";
import Header from "@/components/Header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserLevelModule from "./UserLevelModule";
import hero from "@/assets/images/session-hero.svg";
import Image from "next/image";

function Dashboard() {
  return (
    <div>
      <Header />
      <main className="p-4 container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <DashboardModule className="col-span-8">
            <DashboardModule.Title>Sessions</DashboardModule.Title>
            <div>
              <p>Increase your Level and get better at English.</p>
              <div className="flex flex-col items-center gap-4 mt-8">
                <Image
                  src={hero}
                  width={300}
                  height={400}
                  alt="hero"
                  className="w-72"
                />
                <Link
                  href="/quiz-session"
                  className={cn(buttonVariants(), "font-bold")}
                >
                  Start a Session
                </Link>
              </div>
            </div>
          </DashboardModule>
          <div className="col-span-4 flex flex-col gap-4">
            <UserLevelModule />

            <DashboardModule>
              <DashboardModule.Title>Friends</DashboardModule.Title>
              <div>Your friends</div>
            </DashboardModule>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
