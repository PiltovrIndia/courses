import AddCourseCard from "@/components/AddCourseCard";
import ViewCourseCard from "@/components/ViewCourseCard";

export default function Instructor() {
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          Home
        </h1>
        <p className="text-l text-muted-foreground pt-4 font-bold">COURSES</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:space-y-0">
      <ViewCourseCard />
      <AddCourseCard />
      </div>
    </div>
  );
}
