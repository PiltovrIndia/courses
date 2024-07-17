import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Separator } from "./ui/separator"

export function StudentLogin() {
    const router = useRouter();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Student Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">username</Label>
              <Input id="name" placeholder="Enter Your Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">password</Label>
              <Input id="name" placeholder="Enter Your Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => router.push('/instructor')}>LogIn</Button>
      </CardFooter>
      <Separator/>
      <div className="p-4">
      <p>Are you LoggingIn for the first time?</p>
      
      </div>
    </Card>
  )
}
