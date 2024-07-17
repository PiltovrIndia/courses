"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import dayjs from "dayjs";
import { Check } from "@/components/icons/check";
export default function TopicDetailsCard({
  topicDetails,
  collegeId
}: {
  topicDetails: any,
  collegeId: string
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session } = useSession();
  const [repoName, setRepoName] = useState("");
  const GitUserName = session?.user?.name;
  const [isCommitted, setIsCommitted] = useState(false);
  const [understand, setUnderstand] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);
  const description = topicDetails[0].description;
  const shortLength = 20;
  const shortDescription =
    description.length > shortLength
      ? description.substring(0, shortLength) + "..."
      : description;
  const [links, setLinks] = useState(
    topicDetails[0].links !== "" ? topicDetails[0].links.split(",") : []
  );
  const verifyCommit = async () => {
    const startDate = dayjs().format("YYYY-MM-DD") + "T00:00:00Z";
    const endDate = dayjs().format("YYYY-MM-DD") + "T23:59:59Z";
    const url = `https://api.github.com/search/commits?q=repo:${GitUserName}/${repoName}+author:${GitUserName}+committer-date:${startDate}..${endDate}
`;
    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.cloak-preview+json",
    };

    const response = await fetch(url, { headers });
    const commits = await response.json();
    const len = Object.keys(commits.items).length;
    const reqMessage = "ComponentsFSD2024";
    console.log(commits, len);
    if (commits && len > 0) {
      const LastCommit = commits.items[len - 1];
      const LastMessage = LastCommit.commit.message;
      if (LastMessage === reqMessage) {
        setIsCommitted(true);
      }
    }
  };
  const HandleSave = async () => {
    console.log(isCommitted);
    console.log(understand);
    console.log(confidence);
    if (isCommitted && understand && confidence) {
      const url = `/api/student/add-feedback/${collegeId}/${topicDetails[0].topicId}/${confidence}/${isCommitted}/${understand}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("feedback Added Successfully!", response);
      } else {
        console.error("failed!", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
      alert("saved successfully");
    } else alert("enter all the fields to save your feedback");
  };
  return (
    <div>
      <Card>
        <div className="flex flex-row m-4 space-x-20 justify-between items-center">
          <div>
            <p className="text-muted-foreground">TOPIC</p>
            <p className="font-bold">{topicDetails[0].name}</p>
          </div>
          <Button className="bg-green-500" onClick={HandleSave}>
            Save
          </Button>
        </div>
        <Separator />
        <div  className="h-fit max-h-[60vh] overflow-y-auto relative">
        <div className="grid gap-4 py-4 px-4">
          <div className="items-center gap-2 md:gap-4 space-y-2">
            <Label htmlFor="username" className="text-right">
              About
            </Label>
            <p className="text-gray-500">
              {isExpanded ? <>{description}</> : <>{shortDescription}</>}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500"
            >
              {isExpanded ? "View less" : "View more"}
            </button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label>Did you understand this topic?</Label>
            <RadioGroup
              defaultValue="-1"
              onValueChange={(e) => setUnderstand(e)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" />
                <Label>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" />
                <Label>No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="may-be" />
                <Label>May Be</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label>How confident are you with this topic?</Label>
            <RadioGroup
              defaultValue="-1"
              onValueChange={(e) => setConfidence(e)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" />
                <Label>1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" />
                <Label>2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" />
                <Label>3</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" />
                <Label>4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" />
                <Label>5</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label htmlFor="username" className="text-left pb-3">
              Did you implement this topic?
            </Label>
            <div className="rounded bg-orange-100">
              <p className="text-orange-500 font-semibold text-sm p-2">
                Create a public Github repository and commit your topic related
                project code. Use the commit message “ComponentsFSD2024” while
                committing.
              </p>
            </div>
            <Label htmlFor="username" className="text-left">
              Enter Github repo name
            </Label>
            <div className="flex flex-row space-x-2">
              <Input
                placeholder="Assignment Project Repository"
                onChange={(e) => setRepoName(e.target.value)}
              />
              <Button onClick={verifyCommit}>Verify</Button>
            </div>
            <div className="rounded bg-green-100">
              {isCommitted && (
                <p className="text-green-500 font-semibold text-sm p-2 flex items-center">
                  <span className="pr-2">
                    <Check />
                  </span>{" "}
                  Commit Verification Successful
                </p>
              )}
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-4 px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <Label htmlFor="username" className="text-left pb-3">
              Resources
            </Label>
            {/* <div>
              <Label>Introduction</Label>
              <p className="text-gray-400">
                Reusable Components Built using Radix UI and Tailwind CSS
              </p>
            </div> */}
            {links.length !== 0 ? (
              links.map((item: any, index: any) => (
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
    </div>
  );
}
