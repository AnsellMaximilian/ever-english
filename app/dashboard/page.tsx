import DashboardModule from "@/components/DashboardModule";
import Header from "@/components/Header";
import LevelBar from "@/components/LevelBar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <main className="p-4 container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <DashboardModule className="col-span-8">
            <DashboardModule.Title>Title</DashboardModule.Title>
            <div>
              <Button className="font-bold">Start a Session</Button>
            </div>
          </DashboardModule>
          <DashboardModule className="col-span-4 flex flex-col gap-4">
            <DashboardModule.Title className="flex justify-between items-center">
              <span>Current Level</span>{" "}
              <span className="bg-secondPrimary text-secondPrimary-foreground w-10 h-10 flex items-center justify-center rounded-full">
                B2
              </span>
            </DashboardModule.Title>
            <div className="mx-auto">
              <LevelBar />
            </div>
            <div className="font-semibold">3000 more points to next level</div>
          </DashboardModule>
        </div>
      </main>
    </div>
  );
}
