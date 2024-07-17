"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function TopicDetailsCard({
  topicDetails,
}: {
  topicDetails: any;
}) {
  const [isMarked, setIsMarked] = useState(false);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  console.log(links);
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
        console.log("Description Updated Successfully!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAdd = async () => {
    const allLinks = topicDetails[0].links;
    allLinks.push(newLink);
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
        console.log("Links Updated Successfully!");
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setNewLink("");
  };
  console.log(topicDetails[0].links.split(','))
  return (
    <Card className="w-[45vh] h-auto">
        <div className="flex flex-row m-4 space-x-20 justify-between items-center">
          <div>
            <p className="text-muted-foreground">TOPIC</p>
            <p className="font-bold">{topicDetails[0].name}</p>
          </div>
          <Button
            className={`${
              isMarked
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
            onClick={() => setIsMarked(true)}
            disabled={isMarked}
          >
            Mark as Completed
          </Button>
        </div>
        <Separator />
        <div  className="h-fit max-h-[63.5vh] overflow-y-auto relative">
        {isMarked && (
          <div>
            <p className="px-4 py-2">STATS</p>
            <div className="flex flex-row justify-between">
              <div className="px-4">
                <p className="font-semibold">CONFIDENCE</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  75%
                </h2>
              </div>
              <div className="px-4">
                <p className="font-semibold">IMPLEMENTATION</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  75%
                </h2>
              </div>
              <div className="px-4">
                <p className="font-semibold">UNDERSTOOD</p>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  75%
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
            <Textarea
              placeholder="Type Your Description"
              className="col-span-3 w-[100%] "
              value={topicDetails[0].description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button className="bg-green-600" onClick={handleSave}>
              Save
            </Button>
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
            {topicDetails[0].links.split(',')[0] !== '' ? (
              topicDetails[0].links.split(',').map((item: any, index: any) => (
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
        </div>
      </Card>

  );
}
