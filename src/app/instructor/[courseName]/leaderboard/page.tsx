"use client";
import { Button } from "@/components/ui/button";
import LeaderboardTable from "../../components/LeaderboardTable";
import  RadialChartCard  from "../../components/RadialChartCard";

export default function Leaderboard() {
  return (
    <div>
      <div className="flex flex-row p-4 space-x-4 space-y-3">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Full Stack Development
        </h1>
        <Button>View Course</Button>
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold text-gray-500 py-2">SUMMARY</p>
        <div className="flex flex-row justify-between">
          <RadialChartCard/>
          <RadialChartCard/>
          <RadialChartCard/>
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold text-gray-500 py-2">LEADERBOARD</p>
        <LeaderboardTable />
      </div>
    </div>
  );
}


