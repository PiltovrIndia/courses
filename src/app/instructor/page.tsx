"use client";
import { useEffect, useState } from "react";
import AddCourseCard from "./components/AddCourseCard";
import ViewCourseCard from "./components/ViewCourseCard";
import { useRouter } from "next/navigation";

export default function Instructor() {
  const [courseData, setCourseData] = useState([]);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const passkey = prompt('Enter the passkey:');
    if (passkey === 'pavanfullstack') {
      setIsAuthorized(true);
    } else {
      router.push('/');
    }
},[]);
useEffect(() => {
    const fetchData = async () => {
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
          setCourseData(resp.data);
        } else {
          console.error("Course Data retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [isAuthorized]);
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          Home
        </h1>
        <p className="text-l text-muted-foreground pt-4 font-bold">COURSES</p>
      </div>
      <div className="flex flex-col sm:flex-row p-10 space-x-10">
        {courseData.map((item: any, index) => (
          <ViewCourseCard course={item} />
        ))}
        <AddCourseCard />
      </div>
    </div>
  );
}
