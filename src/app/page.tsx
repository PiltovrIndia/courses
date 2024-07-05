"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     Welcome!!
     <Button variant={"default"}>Admin</Button>
      <Button variant={"default"} onClick={() => router.push('/instructor')}>Instructor</Button>
      <Button variant={"default"}>Student</Button>
    </main>
  );
}
