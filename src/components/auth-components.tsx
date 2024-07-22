"use client"
import { NextResponse } from "next/server";
// import { signIn } from "../../auth";
import { LogOut } from "./icons/log-out";
import { Button } from "./ui/button";
import { Github } from "@/components/icons/github";
import { signIn,signOut, useSession } from 'next-auth/react';


export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        await signIn(provider,{callbackUrl:'/student'});
      }}
      // action={handleSignin}
    >
      <Button {...props} className="flex items-center space-x-2">
        {" "}
        <Github />
        <span>Login via Github</span>
      </Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/student' });
    localStorage.clear();
  }
  return (
    <form
      action={handleLogout}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Log Out
        <LogOut />
      </Button>
    </form>
  );
}
