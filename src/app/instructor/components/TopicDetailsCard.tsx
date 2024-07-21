"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { calculateFeedback } from "./CalculateFeedback";
import { DialogMessage } from "@/components/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TopicDetailsCard({
  topicDetails,
}: {
  topicDetails: any;
}) {
  // console.log(topicDetails[0]);
  const [isMarked, setIsMarked] = useState(false);
  const [description, setDescription] = useState(
    isMarked ? topicDetails[0].description : ""
  );
  const [links, setLinks] = useState(topicDetails[0].links);
  const [newLink, setNewLink] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<{
    understand: number;
    implementation: number;
    confidence: number;
    studentTopicCount: number;
    respondantsCount: number;
  } | null>(null);
  useEffect(() => {
    setIsMarked(topicDetails[0].completed === "yes");
    setLinks(topicDetails[0].links)
    console.log(isMarked);
  }, [topicDetails]);
  useEffect(() => {
    const getFeedback = async () => {
      const response = calculateFeedback(isMarked, topicDetails[0].topicId);
      setFeedback(await response);
    };
    if (isMarked || topicDetails[0].completed === "yes") getFeedback();
  }, [topicDetails]);
  const handleSave = async () => {
    const url = `/api/instructor/update-description/${topicDetails[0].topicId}/${description}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        DialogMessage("Success", "Description Updated Successfully!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAdd = async () => {
    const allLinks = topicDetails[0].links.split(",");
    allLinks.push(newLink);
    setLinks(links+","+newLink);
    const url = `/api/instructor/update-links/${
      topicDetails[0].topicId
    }/${encodeURIComponent(allLinks)}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        DialogMessage("Success", "Links Added Successfully!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setNewLink("");
  };
  const markAsComplete = async () => {
    setIsMarked(true);
    const url = `/api/instructor/update-complete/${topicDetails[0].topicId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        DialogMessage("Success", "Topic Marked as Complete!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const enableQuiz = async () => {
    const url = `/api/instructor/enable-quiz/${topicDetails[0].topicId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        DialogMessage("Success", "Quiz Enabled!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Card className="w-[60vh] h-auto">
      <div className="flex flex-row m-4 space-x-20 justify-between items-center">
        <div>
          <p className="text-muted-foreground">TOPIC</p>
          <p className="font-bold">{topicDetails[0].name}</p>
        </div>
        <div className="space-x-2">
          <Button
            className={`${
              isMarked
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
            onClick={markAsComplete}
            disabled={isMarked}
          >
            Mark as Completed
          </Button>
          <Button
            className={"bg-blue-600 hover:bg-blue-500"}
            onClick={enableQuiz}
          >
            Enable Quiz
          </Button>
        </div>
      </div>
      <Separator />
      <div className="h-fit max-h-[63.5vh] overflow-y-auto relative">
        {(isMarked && feedback?.respondantsCount !== 0) && (
          <div>
            <div className="flex flex-row">
              <p className="px-4 py-2">TOPIC STATS</p>
              <p className="px-4 py-2 text-gray-500">
                RESPONDANTS: {feedback?.respondantsCount}/
                {feedback?.studentTopicCount} (
                {feedback && feedback.implementation}%)
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="px-4">
                <p className="font-semibold">CONFIDENCE</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {feedback && feedback.confidence}%
                </h2>
              </div>
              <div className="px-4">
                <p className="font-semibold">IMPLEMENTATION</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {feedback && feedback.implementation}%
                </h2>
              </div>
              <div className="px-4">
                <p className="font-semibold">UNDERSTOOD</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {feedback && feedback.understand}%
                </h2>
              </div>
            </div>
          </div>
        )}
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="items-center gap-2 md:gap-4 space-y-2">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            {!isMarked ? (
              <>
                <Textarea
                  placeholder="Type Your Description"
                  className="col-span-3 w-[100%]"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Button className="bg-green-600" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <p>{topicDetails[0].description}</p>
            )}
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label htmlFor="username" className="text-left pb-3">
              Add Resources
            </Label>
            <Label htmlFor="username" className="text-left">
              Resource Link
            </Label>
            <div className="flex flex-row space-x-2">
              <Input
                value={newLink}
                placeholder="URL"
                onChange={(e) => setNewLink(e.target.value)}
              />
              <Button onClick={handleAdd}>Add</Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label htmlFor="username" className="text-left pb-3">
              Resources Added
            </Label>
            {topicDetails[0].links.split(",")[0] !== "" ? (
              topicDetails[0].links.split(",").map((item: any, index: any) => (
                <div key={index}>
                  {/* <Label>Introduction</Label>
                  <p className="text-gray-400">
                    Reusable Components Built using Radix UI and Tailwind CSS
                  </p> */}
                  <a href={item}>{item}</a>
                </div>
              ))
            ) : (
              <p>No Resources Added</p>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex justify-center p-2">
          <QuizStats topicId={topicDetails[0].topicId} />
        </div>
      </div>
    </Card>
  );
}
function QuizStats({ topicId }: { topicId: string }) {
  const [scoreData, setScoreData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let count = 0;
      const url = `/api/instructor/get-student-score/${topicId}`;
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
          setScoreData(resp.data);
          console.log("Score Data", resp.data);
        } else {
          console.error("Score Data retrieval failed!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Quiz Stats</Button>
      </SheetTrigger>
      <SheetContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scoreData.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell>{item.studentid}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
