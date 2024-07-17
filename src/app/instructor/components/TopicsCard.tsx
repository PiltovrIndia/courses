import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "@/components/icons/plus";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "@/components/icons/check-circle";
import GetId from "@/components/GetId";
import { useEffect, useState } from "react";
export default function TopicsCard({
  moduleId,
  courseId,
  currentTopicDetails,
}: {
  moduleId: string;
  courseId: string;
  currentTopicDetails : any,
}) {
  const [topicsData, setTopicsData] = useState([]);
  const [activeTopicId,setActiveTopicId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/instructor/get-topics/${moduleId}`;
      try{
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        const resp = await response.json();
        if(response.status === 200){
          console.log('Topic Data retrieval successfull!',resp.data);
          setTopicsData(resp.data);
        } else {
          console.error('Topic Data retrieval failed!');
        }
      }
      catch (error){
        console.log('Error:',error);
      }
    }
    fetchData();
  },[moduleId])
  const handleClick = (id : any) => {
    setActiveTopicId(id);
    currentTopicDetails(id);
  }
  return (
    <div className="w-96">
      <Card>
      <p className="text-l text-muted-foreground p-4 font-semibold">TOPICS</p>
      <Separator />
        <div className="h-fit max-h-[60vh] overflow-y-auto relative">
        {topicsData.map((item:any, index) => (
          <div
          className={`${
            activeTopicId === item.topicId
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }`}
           onClick={() => handleClick(item.topicId)}>
            <div className="flex flex-row justify-between items-center p-2">
          <p className="font-bold pl-4 pt-2 pb-2">{item.name}</p>
          <CheckCircle className={item.completed === "yes" ? "text-green-500" : ""} />
        </div> 
        <Separator />
          </div>
        ))
        }
        </div>
        <div className="flex justify-center">
          <AddTopicDialog courseId={courseId} moduleId={moduleId} />
        </div>
      </Card>
    </div>
  );
}
function AddTopicDialog({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) {
  const topicId = GetId("t");
  const [topicName, setTopicName] = useState("");
  const handleSubmit = async () => {
    const url = `/api/instructor/add-topic/${topicId}/${topicName}/${courseId}/${moduleId}`;
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
      } else {
        console.error("failed!", response);
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
