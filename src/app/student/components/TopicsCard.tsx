import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "@/components/icons/check-circle";
import { Lock } from "@/components/icons/lock";
import { useEffect, useState } from "react";
export default function ModuleCard({
  moduleId,
  courseId,
  currentTopicDetails,
  moduleName
}: {
  moduleId: string;
  courseId: string;
  currentTopicDetails : any;
  moduleName: string;
}) {
  const [activeTopicId, setActiveTopicId] = useState("");
  const [topicData, setTopicData] = useState([]);
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
          setTopicData(resp.data);
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
        <p className="text-l text-muted-foreground p-4 font-semibold">{moduleName} TOPICS</p>
        <Separator />
        <div  className="h-fit max-h-[60vh] overflow-y-auto relative">
        {topicData.map((item:any, index:any) => (
          <div className={`${
            activeTopicId === item.topicId
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }`} onClick={() => handleClick(item.topicId)}>
            <div className="flex flex-row justify-between items-center p-2">
          <p className="font-bold pl-4 pt-2 pb-2">{item.name}</p>
          {item.completed === "yes" ? <CheckCircle/> : <Lock/>}
          {/* <CheckCircle className={item.completed === "yes" ? "text-green-500" : ""} /> */}
        </div> 
        <Separator />
          </div>
        ))
        }
        </div>
      </Card>
    </div>
  );
}
