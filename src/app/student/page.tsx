"use client";
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import { useSession, signOut } from "next-auth/react";
import { DialogMessage } from "@/components/dialog";
import Heatmap from "./components/Heatmap";
import { Progress } from "@/components/ui/progress";
import getCommitsData from "./components/getCommitsData";
export default function Student() {
  const { data: session, status } = useSession();
  const [coursesData, setCoursesData] = useState([]);
  const [onlyCourse, setOnlyCourse] = useState(null);
  const [collegeId, setCollegeId] = useState("");
  const [enrolSuccess, setEnrolSuccess] = useState(session ? true : false);
  const [progress, setProgress] = useState(13);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [courseIndex, setCourseIndex] = useState<number>();
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!session) {
        setEnrolSuccess(false);
      }
      const timer1 = setTimeout(() => setProgress(66), 500);
      const timer2 = setTimeout(() => setProgress(90), 500);
      const url = `/api/instructor/get-courses`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        clearTimeout(timer1);
        clearTimeout(timer2);
        const resp = await response.json();
        if (response.status === 200) {
          console.log("Course Data retrieval successful!", resp.data);
          setCoursesData(resp.data);
        } else {
          console.error("Course Data retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        clearTimeout(timer1);
        clearTimeout(timer2);
      }
    };
    fetchCourseData();
  }, []);
  useEffect(() => {
    const fetchStudentData = async (email: any, username: any) => {
      const url = `/api/student/get-students/${email}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const resp = await response.json();
        if (resp.data.length !== 0) {
          setEnrolSuccess(true);
          DialogMessage("Success", "Login Success");
          setCollegeId(resp.data[0].collegeId);
          localStorage.setItem("collegeId", resp.data[0].collegeId);
          localStorage.setItem("username", username);
          // getCommitsData();
        } else {
          DialogMessage(
            "Login Failed",
            "Verify the github account and try again"
          );
          signOut();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (session && !enrolSuccess) {
      fetchStudentData(session?.user?.email, session?.user?.username);
    }
  }, [session]);
  //   useEffect(() => {
  //   const fetchAttendeesData = async () => {
  //     const url = `/api/student/get-attendees`;
  //     try {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       });
  //       const resp = await response.json();
  //       if (response.status === 200) {
  //         console.log("Attendees Data retrieval successful!", resp.data);
  //         setAttendees(resp.data);
  //         const userName = session?.user?.name;
  //         const attendeeIndex = resp.data.findIndex(
  //           ((entry: any) => entry['githubName'] === userName)
  //         );
  //         console.log(attendeeIndex);
  //         if (attendeeIndex !== -1) {
  //           setCollegeId(resp.data[attendeeIndex].collegeId);
  //           const courseId = resp.data[attendeeIndex].courseIds;
  //           const index = coursesData.findIndex(
  //             (obj) => obj['courseId'] === courseId
  //           );
  //           setOnlyCourse(coursesData[index]);
  //           console.log("only course:"+onlyCourse);
  //           setEnrolSuccess(true);
  //         }
  //       } else {
  //         console.error("Attendees Data retrieval failed!");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   if (session) {
  //     fetchAttendeesData();

  //   }
  // }, [session]);
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
        {/* <p className="text-l text-muted-foreground pt-4 font-bold">COURSES</p> */}
      </div>
      {coursesData.length === 0 ? (
        <div className="flex justify-center items-center mt-60">
          <Progress value={progress} className="w-[20%]" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row p-10 space-x-10">
          {coursesData.map((item: any, index: any) => (
            <CourseCard
              key={index}
              course={item}
              courseEnrolled={courseEnrolled}
              enrolSuccess={enrolSuccess}
              activeCollegeId={collegeId}
            />
          ))}
          {/* <Heatmap/> */}
        </div>
      )}
    </div>
  );
}
