"use client";
import { useSession } from "next-auth/react";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Github } from "@/components/icons/github";
import { useEffect, useState } from "react";
import { Image } from "@/components/icons/image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DialogMessage } from "@/components/dialog";
export default function CourseCard({
  course,
  courseEnrolled,
  enrolSuccess,
  activeCollegeId,
}: {
  course: any;
  courseEnrolled: any;
  enrolSuccess: any;
  activeCollegeId: any;
}) {
  const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [email, setEmail] = useState("");
  const { data: session,status } = useSession();
  // const [attendees,setAttendees] = useState<any[]>([]);
  const router = useRouter();
  // console.log(collegeId);
  // console.log(session);
  // const handleLogin = async () => {
  //   const url = `/api/student/add-attendee/${name}/${collegeId}/${email}/${session?.user?.name}/${course.courseId}`;
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       console.log("Attendee Added Successfully!", response);
  //       courseEnrolled(course.courseId);
  //       alert("Attendee Added Successfully!");
  //     } else {
  //       console.error("failed!", response);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   console.log(session);
  // };
  const handleViewCourse = (start:any,end:any) => {
    if (!session) {
      DialogMessage("Failed", "Login to View Course");
    } else {
      localStorage.setItem("startDate",start);
      localStorage.setItem("endDate",end);
      router.push(
        `/student/${
          course.name + "@" + course.courseId + "@" + localStorage.getItem("collegeId")
        }`
      );
    }
  }  
  useEffect(()=>{
    console.log(session);
  },[session])
    // while (status === 'loading') {
    //   await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms before checking again
    // }
  
    // if (!enrolSuccess) {
    //   DialogMessage("Failed", "Login to View Course");
    // } else {
    //   router.push(
    //     `/student/${
    //       course.name + "@" + course.courseId + "@" + localStorage.getItem("collegeId")
    //     }`
    //   );
    // }
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
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
  //         // setCoursesData(resp.data);
  //       } else {
  //         console.error("Attendees Data retrieval failed!");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  //   if(session){
  //     const index = attendees.findIndex((obj) => obj["githubName"] === session.user?.name);
  //     if(index !== -1){
  //       setCollegeId(attendees[index].collegeId);
  //       courseEnrolled(attendees[index].courseId);
  //     }
  //   }
  // }, []);
  return (
    <Card className="w-[40vh]">
      <p className="text-l text-muted-foreground p-4 font-bold">COURSE NAME</p>
      <div className="bg-slate-100">
        {/* <img src="https://th.bing.com/th/id/OIP.DZRbznR3P5vZwZmxWPLLGwHaDt?rs=1&pid=ImgDetMain" /> */}
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
        <Button onClick={() => handleViewCourse(course.start,course.end)}>View Course</Button>
        {/* {enrolSuccess ? (
          <Button
            onClick={() =>
              router.push(
                `/student/${
                  course.name + "@" + course.courseId + "@" + activeCollegeId
                }`
              )
            }
          >
            View Course
          </Button>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"}>Enrol Now</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Login</SheetTitle>
                <SheetDescription>
                  Provide Your Details to Login
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-2">
                  <Label>Name as per College Records</Label>
                  <Input
                    placeholder="Name"
                    className="col-span-3 w-[100%]"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid items-center gap-2">
                  <Label>College ID</Label>
                  <Input
                    placeholder="College ID"
                    className="col-span-3 w-[100%]"
                    onChange={(e) => setCollegeId(e.target.value)}
                    required
                  />
                </div>
                <div className="grid items-center gap-2">
                  <Label>Email Address</Label>
                  <Input
                    placeholder="Your Email Address"
                    className="col-span-3 w-[100%]"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose>
                  <div className="flex space-x-4">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button
                      type="submit"
                      className="flex items-center space-x-2"
                      onClick={handleLogin}
                    >
                      Enrol
                    </Button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )} */}
        {/* <EnrolNow /> */}
      </CardFooter>
    </Card>
  );
}

// function EnrolNow() {
//   const { data: session } = useSession();
//   const [name, setName] = useState("");
//   const [collegeId, setCollegeId] = useState("");
//   const [email, setEmail] = useState("");
//   const handleLogin = () => {
//     signIn();
//     alert("Login Success");
//   };
//   if (session) {
//     return (
//       <div className="w-full h-screen flex flex-col justify-center items-center">
//         <div className="w-44 h-44 relative mb-4">
//           <Image
//             src={session.user?.image as string}
//             fill
//             alt=""
//             className="object-cover rounded-full"
//           />
//         </div>
//         <p className="text-2xl mb-2">
//           Welcome <span className="font-bold">{session.user?.name}</span>
//           Signed In As
//         </p>
//         <p className="font-bold mb-4">{session.user?.email}</p>
//         <button
//           className="bg-red-600 py-2 px-6 rounded-md"
//           onClick={() => signOut()}
//         >
//           Sign out
//         </button>
//       </div>
//     );
//   }
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant={"outline"}>Enrol Now</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Login</SheetTitle>
//           <SheetDescription>Provide Your Details to Login</SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid items-center gap-2">
//             <Label>Name as per College Records</Label>
//             <Input
//               placeholder="Name"
//               className="col-span-3 w-[100%]"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="grid items-center gap-2">
//             <Label>College ID</Label>
//             <Input
//               placeholder="College ID"
//               className="col-span-3 w-[100%]"
//               onChange={(e) => setCollegeId(e.target.value)}
//               required
//             />
//           </div>
//           <div className="grid items-center gap-2">
//             <Label>Email Address</Label>
//             <Input
//               placeholder="Your Email Address"
//               className="col-span-3 w-[100%]"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <SheetFooter>
//           <SheetClose>
//             <div className="flex space-x-4">
//               <Button variant={"outline"}>Cancel</Button>
//               <Button
//                 type="submit"
//                 className="flex items-center space-x-2"
//                 onClick={handleLogin}
//               >
//                 <Github />
//                 <span>Login via Github</span>
//               </Button>
//             </div>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }
