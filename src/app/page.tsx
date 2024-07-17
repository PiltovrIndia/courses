"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { AdminLogin } from "@/components/admin-login";
import { InstructorLogin } from "@/components/instructor-login";
import { StudentLogin } from "@/components/student-login";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-row items-center justify-between p-20">
     <Button variant={"default"}>Admin</Button>
      <Button variant={"default"} onClick={() => router.push('/instructor')}>Instructor</Button>
      <Button variant={"default"} onClick={() => router.push('/student')}>Student</Button>
      <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }}
    >
      Show Toast
    </Button>
      {/* <AdminLogin/>
      <InstructorLogin/>
      <StudentLogin/> */}
    </main>
  );
}
