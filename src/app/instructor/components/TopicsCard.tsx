import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "@/components/icons/plus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "@/components/icons/check-circle";
import GetId from "@/components/GetId";
import { useEffect, useState } from "react";
import { calculateFeedback } from "./CalculateFeedback";
import { DialogMessage } from "@/components/dialog";
export default function TopicsCard({
  moduleId,
  courseId,
  currentTopicDetails,
  moduleName,
}: {
  moduleId: string;
  courseId: string;
  currentTopicDetails: any;
  moduleName: string;
}) {
  const [topicsData, setTopicsData] = useState([]);
  const [activeTopicId, setActiveTopicId] = useState("");
  const [feedback, setFeedback] = useState<{
    studentTopicCount: number;
    understand: number;
    implementation: number;
    confidence: number;
    completeCount: number;
    respondantsCount: number;
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      let count = 0;
      const url = `/api/instructor/get-topics/${moduleId}`;
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
          setFeedback(await response);
          setTopicsData(resp.data);
        } else {
          console.error("Topic Data retrieval failed!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [moduleId]);
  const handleClick = (id: any) => {
    setActiveTopicId(id);
    currentTopicDetails(id);
  };
  const updateTopicData = (topic: never) => {
    setTopicsData([...topicsData, topic]);
  };
  return (
    <div className="space-y-3">
      {
        //
        feedback && feedback.completeCount > 0 && feedback.respondantsCount !== 0 && (
          <Card className="w-[60vh] h-auto">
            <div>
              <div className="flex flex-row">
                <p className="px-4 py-2">MODULE STATS</p>
                <p className="px-4 py-2">
                  RESPONDANTS: {feedback.respondantsCount}/
                  {feedback.studentTopicCount} (
                  {Math.floor(feedback.implementation / feedback.completeCount)}
                  %)
                </p>
              </div>
              <Separator />
              <div className="flex flex-row justify-between">
                <div className="px-4">
                  <p className="font-semibold">CONFIDENCE</p>
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {Math.floor(feedback.confidence / feedback.completeCount)}%
                  </h2>
                </div>
                <div className="px-4">
                  <p className="font-semibold">IMPLEMENTATION</p>
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {Math.floor(
                      feedback.implementation / feedback.completeCount
                    )}
                    %
                  </h2>
                </div>
                <div className="px-4">
                  <p className="font-semibold">UNDERSTOOD</p>
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {Math.floor(feedback.understand / feedback.completeCount)}%
                  </h2>
                </div>
              </div>
            </div>
          </Card>
        )
      }
      <Card className="w-[60vh] h-auto">
        <p className="text-l text-muted-foreground p-4 font-semibold">
          {moduleName} TOPICS
        </p>
        <Separator />
        <div className="h-fit max-h-[60vh] overflow-y-auto relative">
          {topicsData.map((item: any, index) => (
            <div key={index}
              className={`${
                activeTopicId === item.topicId
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleClick(item.topicId)}
            >
              <div className="flex flex-row justify-between items-center p-2">
                <p className="font-bold pl-4 pt-2 pb-2">{item.name}</p>
                <CheckCircle
                  className={item.completed === "yes" ? "text-green-500" : ""}
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <AddTopicDialog
            courseId={courseId}
            moduleId={moduleId}
            updateTopicData={updateTopicData}
          />
        </div>
      </Card>
    </div>
  );
}
function AddTopicDialog({
  courseId,
  moduleId,
  updateTopicData,
}: {
  courseId: string;
  moduleId: string;
  updateTopicData: any;
}) {
  const topicId = GetId("t");
  const [topicName, setTopicName] = useState("");
  const token = GetId("COMMIT");
  const handleSubmit = async () => {
    const url = `/api/instructor/add-topic/${topicId}/${topicName}/${courseId}/${moduleId}/${token}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Topic Added Successfully!", response);
        setTopicName("");
        DialogMessage("Success", "Topic Added Successfully!!");
        updateTopicData({
          topicId: topicId,
          name: topicName,
          description: "",
          courseId: courseId,
          moduleId: moduleId,
          links: "",
          completed: "no",
          token: "",
        });
      } else {
        DialogMessage("Failed :(", "Could Not Add Topics! Try Again!!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="pl-10 pr-10 pt-2 pb-2">
          <Button variant={"outline"}>
            <Plus /> <p className="pl-1">Add Topic</p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-2 md:gap-4">
            <Label htmlFor="name" className="text-right">
              Topic Name
            </Label>
            <Input
              id="name"
              placeholder="Type Topic Name"
              className="col-span-3"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </div>
        </div>
        <DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Add Topic
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export const calModuleFeedback = async (topicsData: any) => {
  let implementation = 0;
  let understand = 0;
  let confidence = 0;
  let completeCount = 0;
  let studentTopicCount = 0;
  let respondantsCount = 0;
  let len = topicsData.length;
  for (let i = 0; i < len; i++) {
    if (topicsData[i].completed === "yes") {
      const resp = calculateFeedback(true, topicsData[i].topicId);
      implementation += (await resp).implementation;
      understand += (await resp).understand;
      confidence += (await resp).confidence;
      studentTopicCount = (await resp).studentTopicCount;
      respondantsCount += (await resp).respondantsCount;
      completeCount += 1;
    }
  }
  return {
    implementation,
    understand,
    confidence,
    completeCount,
    studentTopicCount,
    respondantsCount,
  };
};
