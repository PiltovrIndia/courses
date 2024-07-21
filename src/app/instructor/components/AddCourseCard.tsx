"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useState } from "react";
import dayjs from "dayjs";
import GetId from "@/components/GetId";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import { DialogMessage } from "@/components/dialog";
export default function AddCourseCard() {
  return (
    <Card className="flex border-slate-300 border-dashed bg-slate-50 w-[40vh] justify-center items-center">
      {/* <CardContent className="flex justify-center p-20"> */}
      <SheetComponent />
      {/* </CardContent> */}
      {/* <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button> */}
    </Card>
  );
}
function SheetComponent() {
  const { toast } = useToast();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  // const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const isActive = "true";
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFile(event.target.files[0]);
  //   }
  // };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // console.log(courseName);
    // console.log(description);
    console.log(
      "from:",
      dayjs(date?.from).format("DD-MMM-YYYY"),
      "to:",
      dayjs(date?.to).format("DD-MMM-YYYY")
    );
    const start = dayjs(date?.from).format("YYYY-MM-DD");
    const end = dayjs(date?.to).format("YYYY-MM-DD");
    console.log(courseName);
    console.log(description);
    console.log(start);
    console.log(end);
    console.log(isActive);
    const courseId = GetId("c");
    const instructor = "Instructor1";
    // if (!courseName) {
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      //   action: <ToastAction altText="Try again">Try again</ToastAction>,
      // });
    // } else {
      const url = `/api/instructor/add-course/${courseId}/${courseName}/${description}/${start}/${end}/${isActive}/${instructor}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          DialogMessage("Success","Course Added Successfully!!");
        location.reload();
        } else {
          DialogMessage("Failed :(","Could Not Add Course! Try Again!!!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    // }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Course</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Course</SheetTitle>
          {/* <SheetDescription>
            It will appear on the home screen once this screen is created
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-2 py-2 pb-10 md:gap-4 md:py-4">
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Course Name</Label>
            <Input
              placeholder="Type Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="col-span-3 w-[100%]"
              required
            />
          </div>
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Description</Label>
            <Textarea
              placeholder="Type description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 w-[100%]"
              required
            />
          </div>
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Course Image</Label>
            <div className="flex flex-row space-x-1">
              <Input
                type="file"
                accept="image/*"
                // onChange={handleFileChange}
                className="col-span-3 w-[100%]"
                required
              />
              {/* <Button>Select image file</Button> */}
            </div>
            <div className="grid items-center gap-2 md:gap-4">
              <Label>Course Active Date Range</Label>
              <DateRangePicker date={date} setDate={setDate} />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <div className="space-x-2">
              <Button variant={"outline"}>Cancle</Button>
              <Button onClick={handleSubmit}>Create</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  className,
  date,
  setDate,
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
