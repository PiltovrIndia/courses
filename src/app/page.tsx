"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { AdminLogin } from "@/components/admin-login";
import { InstructorLogin } from "@/components/instructor-login";
import { StudentLogin } from "@/components/student-login";
import { ToastAction } from "@radix-ui/react-toast";
import { DialogMessage } from "@/components/dialog";
import { toast } from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MouseEvent } from "react";
import Cookies from "js-cookie"
export default function Home() {
  const router = useRouter();
  const handleLogin = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    Cookies.set('loggedin',"false");
    // router.push("/instructor");
  }
  return (
    <main className="flex flex-row items-center justify-between p-20">
     {/* <Button variant={"default"}>Admin</Button> */}
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Instructor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Instructor Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             UserName
            </Label>
            <Input  placeholder="Enter Your Username" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
             Password
            </Label>
            <Input type={"password"} placeholder="Enter Your Password" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={(e) => handleLogin(e)}>LogIn</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      <Button variant={"default"} onClick={() => router.push('/student')}>Student</Button>
      <Button
      variant="outline"
      onClick={() => DialogMessage("customtitle","customtitle")}
    >
      Show Toast
    </Button>
      {/* <AdminLogin/>
      <InstructorLogin/>
      <StudentLogin/> */}
    </main>
  );
}
