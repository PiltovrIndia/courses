"use client"
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
  SheetClose
} from "@/components/ui/sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

export default function AddCourseCard() {
  return (
    <Card className="border-slate-300 border-dashed bg-slate-50">
      <CardContent className="flex justify-center p-20">
        <SheetComponent />
      </CardContent>
    </Card>
  );
}
function SheetComponent(){
    return (
        <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline">Add Course</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Course</SheetTitle>
              <SheetDescription>
                It will appear on the home screen once this screen is created
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 py-2 pb-10 md:gap-4 md:py-4">
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Course Name</Label>
            <Input
              placeholder="Type Visitor Name"
              className="col-span-3 w-[100%]"
              required
            />
          </div>
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Description</Label>
            <Textarea
              placeholder="Type your description Name"
              className="col-span-3 w-[100%]"
              required
            />
          </div>
          <div className="grid items-center gap-2 md:gap-4">
            <Label>Course Image</Label>
            <div className="flex flex-row space-x-1">
            <Input
              placeholder="Select File"
              className="col-span-3 w-[100%]"
              required
            />
            <Button>Select image file</Button>
            </div>
            <div className="grid items-center gap-2 md:gap-4">
            <Label>Course Active Date Range</Label>
            <DateRangePicker />
          </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
          <Button variant={"outline"}>Cancle</Button>
            <Button type="submit">Create</Button>
          </SheetClose>
        </SheetFooter>
          </SheetContent>
        </Sheet>
    )
}
function DateRangePicker({
    className,
  }: React.HTMLAttributes<HTMLDivElement>){
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
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
    )
}