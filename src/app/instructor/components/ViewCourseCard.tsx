import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Image } from "@/components/icons/image";
import { useRouter } from "next/navigation";

export default function ViewCourseCard({ course }: { course: any }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/instructor/${course.name+'@'+course.courseId}`);
  };
  return (
      // <div className="h-48 w-84">
        <Card className="w-[40vh]">
          <p className="text-l text-muted-foreground p-4 font-bold">
            COURSE NAME
          </p>
          <div className="bg-slate-100">
            {/* <img src="https://th.bing.com/th/id/OIP.DZRbznR3P5vZwZmxWPLLGwHaDt?rs=1&pid=ImgDetMain" /> */}
            {/* {course.media} */}
            {/* <img
              src={`data:image/jpeg;base64,${course.media}`}
              alt="Course Image"
              className="mt-2"
              style={{ width: "200px", height: "auto" }}
            /> */}
            <div className="text-lg font-bold p-4 ">
              <Image />
              {course.name}{" "}
            </div>
            <p className="text-l text-muted-foreground p-4">
              {dayjs(course.start).format("DD-MMM-YYYY")} to{" "}
              {dayjs(course.end).format("DD-MMM-YYYY")}
            </p>
          </div>
          <p className="p-4">{course.description}</p>
          <CardFooter>
            <Button variant={"outline"} onClick={handleClick}>
              <p className="font-bold">View Course</p>
            </Button>
          </CardFooter>
        </Card>
      // </div>
  );
}
