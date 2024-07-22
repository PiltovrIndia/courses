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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
export default function ModulesCard({
  courseId,
  currentModuleId,
}: {
  courseId: string;
  currentModuleId: any;
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
    console.log(id);
    setActiveModuleId(id);
  };
  return (
    <Card className="w-[45vh] h-auto">
      <p className="text-l text-muted-foreground p-4 font-semibold">
        MODULES
      </p>
      <Separator />
      <div  className="h-fit max-h-[60vh] overflow-y-auto relative">
      {moduleData.map((item: any, index) => (
        <div key={index}
          className={`${
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
    </Card>

  );
}
