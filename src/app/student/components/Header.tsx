import LogIn from "./Login";
import { auth } from "../../../../auth";
import { SignIn, SignOut } from "@/components/auth-components";
export default async function Header() {
  const session = await auth();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="ml-3 text-xl font-semibold">App Name</span>
      </div>
      {/* <div className="text-gray-600">Instructor name</div> */}
      {!session?.user ? (
        <SignIn />
      ) : (
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-row whitespace-nowrap">
            {session?.user.name}
          </div>
          <SignOut />
        </div>
      )}
    </div>
  );
}
