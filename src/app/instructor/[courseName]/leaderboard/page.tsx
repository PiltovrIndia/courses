"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import LeaderboardTable from "../../components/LeaderboardTable";
import RadialChartCard from "../../components/RadialChartCard";
import { useEffect, useState } from "react";
import { calModuleFeedback } from "../../components/TopicsCard";

export default function Leaderboard({
  params,
}: {
  params: { courseName: string };
}) {
  const course = decodeURIComponent(params.courseName).split("@");
  const coursename = course[0];
  const courseId = course[1];
  const moduleData = JSON.parse(decodeURIComponent(course[2]));
  const [implementation, setImplementation] = useState(0);
  const [understand, setUnderstand] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [total,setTotal] = useState(0);
  useEffect(() => {
    const fetchTopicData = async (i: any) => {
      const url = `/api/instructor/get-topics/${moduleData[i].moduleId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const resp = await response.json();
        if (response.status === 200) {
          console.log("Topic Data retrieval successfull!", resp.data);
          const response = calModuleFeedback(resp.data);
          if((await response).completeCount > 0 ){
            setImplementation(implementation+(await response).implementation);
            setUnderstand(understand+(await response).understand);
            setConfidence(confidence+(await response).confidence);
            setTotal(total+(await response).completeCount);
            console.log(total);
          }
        } else {
          console.error("Topic Data retrieval failed!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    for (let i = 0; i < moduleData.length; i++) fetchTopicData(i);
  }, []);
  return (
    <div>
      <div className="flex flex-row p-4 space-x-4 space-y-3">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          {coursename}
        </h1>
        <Button>View Course</Button>
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold text-gray-500 py-2">SUMMARY</p>
        <div className="flex flex-row justify-between">
          <RadialChartCard parameter={"CONFIDENCE"} val={Math.floor(confidence/total)}/>
          <RadialChartCard parameter={"IMPLEMENTATION"} val={Math.floor(implementation/total)}/>
          <RadialChartCard parameter={"UNDERSTOOD"} val={Math.floor(understand/total)}/>
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold text-gray-500 py-2">LEADERBOARD</p>
        <LeaderboardTable />
      </div>
    </div>
  );
}
