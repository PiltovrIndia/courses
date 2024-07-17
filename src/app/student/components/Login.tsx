"use client"
import { Github } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
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
  import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SignIn }from "@/components/auth-components"
export default function Login(){
    const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
   <SignIn/>
  }
    return(
        <Sheet> 
              <SheetTrigger asChild>
              <Button className="flex items-center space-x-2">
            <Github />
            <span>Login via Github</span>
            </Button>
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
                        onClick={handleLogin
                          // () => signIn(undefined, { callbackUrl: "/student" })
                        }
                      >
                        <Github />
                        <span>Login via Github</span>
                      </Button>
                    </div>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
    )
}