"use client";
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import { useSession } from "next-auth/react";
export default function Student() {
  const [coursesData, setCoursesData] = useState([]);
  const [onlyCourse, setOnlyCourse] = useState(null);
  const [collegeId, setCollegeId] = useState("");
  const [enrolSuccess, setEnrolSuccess] = useState(false);
  const { data: session } = useSession();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [courseIndex,setCourseIndex] = useState<number>();
  console.log(session);
  useEffect(() => {
    const fetchCourseData = async () => {
      const url = `/api/instructor/get-courses`;
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
          console.log("Course Data retrieval successful!", resp.data);
          setCoursesData(resp.data);
        } else {
          console.error("Course Data retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCourseData();
  }, []);
  useEffect(() => {
  const fetchAttendeesData = async () => {
    const url = `/api/student/get-attendees`;
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
        console.log("Attendees Data retrieval successful!", resp.data);
        setAttendees(resp.data);
        const userName = session?.user?.name;
        const attendeeIndex = resp.data.findIndex(
          ((entry: any) => entry['githubName'] === userName)
        );
        console.log(attendeeIndex);
        if (attendeeIndex !== -1) {
          setCollegeId(resp.data[attendeeIndex].collegeId);
          const courseId = resp.data[attendeeIndex].courseIds;
          const index = coursesData.findIndex(
            (obj) => obj['courseId'] === courseId
          );
          setOnlyCourse(coursesData[index]);
          console.log("only course:"+onlyCourse);
          setEnrolSuccess(true);
        }
      } else {
        console.error("Attendees Data retrieval failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (session) {
    fetchAttendeesData();
    
  }
}, [session]);
  const courseEnrolled = (courseId: string) => {
    const index = coursesData.findIndex((obj) => obj["courseId"] === courseId);
    setOnlyCourse(coursesData[index]);
    setEnrolSuccess(true);
  };
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          Home
        </h1>
        <p className="text-l text-muted-foreground pt-4 font-bold">COURSES</p>
      </div>
      <div className="flex flex-col sm:flex-row p-10 space-x-10">
      {
  enrolSuccess ? (
    onlyCourse !== null ? (
      <CourseCard
        course={onlyCourse}
        courseEnrolled={courseEnrolled}
        enrolSuccess={enrolSuccess}
        activeCollegeId={collegeId}
      />
    ) : null // Optionally, you can handle the case where onlyCourse is null
  ) : (
    coursesData.map((item: any, index: any) => (
      <CourseCard
        key={index}
        course={item}
        courseEnrolled={courseEnrolled}
        enrolSuccess={enrolSuccess}
        activeCollegeId={""}
      />
    ))
  )
}
      </div>
    </div>
  );
}
