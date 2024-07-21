"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons/arrow-left";
import ModulesCard from "../components/ModulesCard";
import TopicsCard from "../components/TopicsCard";
import TopicDetailsCard from "../components/TopicDetailsCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function CourseDetails({
  params,
}: {
  params: { courseName: string };
}) {
  const {data : session,status} = useSession();
  const router = useRouter();
  const course = decodeURIComponent(params.courseName).split("@");
  const [moduleId, setModuleId] = useState("");
  const [showTopics, setShowTopics] = useState(false);
  const [topicDetails, setTopicDetails] = useState([]);
  const [currentModuleName, setCurrentModuleName] = useState("");
  const coursename = course[0];
  const courseId = course[1];
  const collegeId = course[2];
  useEffect(()=>{
    if(status !== "authenticated")
      router.push("/student");
  },[])
  const currentModuleId = (id: string,name:string) => {
    setModuleId(id);
    console.log(moduleId);
    setShowTopics(true);
    setCurrentModuleName(name);
  };
  const currentTopicDetails = async (TopicId: string) => {
    const url = `/api/instructor/get-topic-details/${TopicId}`;
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
        console.log("Topic Details retrieval successful!", resp.data);
        setTopicDetails(resp.data);
      } else {
        console.error("Topic Details retrieval failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between p-4 space-x-4 space-y-3">
        <div className="flex space-x-4 space-y-3">
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
            {coursename}
          </h1>
          {/* <Button
            variant={"default"}
            onClick={() => router.push(`/instructor/${coursename}/leaderboard`)}
          >
            Leaderboard
          </Button> */}
          <Button variant={"outline"} onClick={() => router.back()}>
            <ArrowLeft />
            <p className="pl-2">Go Back</p>
          </Button>
        </div>
      </div>
      <div className="flex-row items-center p-4 inline-flex">
        Below is the List of Modules
      </div>
      <div className="flex flex-col sm:flex-row space-x-4 px-4">
        <div>
        <ModulesCard courseId={courseId} currentModuleId={currentModuleId} />
        </div>
        <div>
        {showTopics && (
          <TopicsCard
            moduleId={moduleId}
            courseId={courseId}
            currentTopicDetails={currentTopicDetails}
            moduleName={currentModuleName}
          />
        )}
        </div>
        <div>
        {topicDetails.length !== 0 && (
          <TopicDetailsCard topicDetails={topicDetails} collegeId={collegeId} courseName={params.courseName}/>
        )}
        </div>
      </div>
    </div>
  );
}
