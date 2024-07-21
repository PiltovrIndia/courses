"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import GetId from "@/components/GetId";
import { DialogMessage } from "@/components/dialog";
export default function ModulesCard({
  courseId,
  currentModuleId,
  getModuleData
}: {
  courseId: string,
  currentModuleId: any,
  getModuleData: any
}) {
  const [moduleData, setModuleData] = useState([]);
  const [activeModuleId,setActiveModuleId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/instructor/get-modules/${courseId}`;
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
          console.log("Module Data retrieval successful!", resp.data);
          setModuleData(resp.data);
          getModuleData(resp.data);
        } else {
          console.error("Module Data retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const handleClick = (id: any,name:string) => {
    currentModuleId(id,name); //to change value in page.tsx
    setActiveModuleId(id);
  };
  const updateModuleData = (module : never) => {
    setModuleData([...moduleData,module]);
  }
  return (
      <Card className="w-[45vh] h-auto">
      <p className="text-l text-muted-foreground p-4 font-semibold">
          MODULES
        </p>
        <Separator />
        <div  className="h-fit max-h-[60vh] overflow-y-auto relative">
        {moduleData.map((item: any, index) => (
          <div key={index} className={`${
            activeModuleId === item.moduleId
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }`}
            onClick={() => handleClick(item.moduleId,item.name)}
          >
            <p className="font-bold pl-4 pt-2">{item.name}</p>
            <p className="text-gray-400 pl-4 pb-2">{item.description}</p>
            <Separator />
          </div>
        ))}
        </div>
        <div className="flex justify-center">
          <AddModuleDialog courseId={courseId} updateModuleData={updateModuleData}/>
        </div>
      </Card>
  );
}
function AddModuleDialog({ courseId,updateModuleData }: { courseId: string, updateModuleData : any }) {
  const [moduleName, setModuleName] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const moduleId = GetId("m");
  const handleSubmit = async () => {
    const url = `/api/instructor/add-module/${moduleId}/${moduleName}/${moduleDesc}/${courseId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Module Added Successfully!", response);
        setModuleName("");
        setModuleDesc("");
        DialogMessage("Success","Module Added Successfully!!");
        updateModuleData({
          "moduleId" : moduleId,
          "name" : moduleName,
          "description" : moduleDesc,
          "courseId" : courseId
        })
      } else {
        DialogMessage("Failed :(","Could Not Add Module! Try Again!!!");
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
            <Plus /> <p className="pl-1">Add Module</p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Module</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-2 md:gap-4">
            <Label className="text-right">Module Name</Label>
            <Input
              placeholder="Type Module Name"
              className="col-span-3"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="items-center gap-2 md:gap-4">
            <Label className="text-right">Description</Label>
            <Textarea
              placeholder="Type Your Description"
              className="col-span-3 w-[100%]"
              value={moduleDesc}
              onChange={(e) => setModuleDesc(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Add Module
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
