import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function ViewCourseCard() {
  return (
    <div className="pl-10 pr-20">
      <div className="h-48">
        <Card className="h-auto">
          <p className="text-l text-muted-foreground p-4 font-bold">COURSE NAME</p>
           <div className="bg-slate-100">
              <img src="https://th.bing.com/th/id/OIP.DZRbznR3P5vZwZmxWPLLGwHaDt?rs=1&pid=ImgDetMain" />
              <div className="text-lg font-bold p-4 ">Full Stack Web Development</div>
              <p className="text-l text-muted-foreground p-4">July 2024</p>
            </div>
            <p className="p-4">course description</p>
            <CardFooter>
            <Button variant={"outline"}><p className="font-bold">View Course</p></Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
