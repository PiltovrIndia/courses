import { signIn, signOut } from "../../auth"
import { LogOut } from "./icons/log-out";
import { Button } from "./ui/button"
import { Github } from "@/components/icons/github";
export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props} className="flex items-center space-x-2"> <Github />
      <span>Login via Github</span></Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Log Out
        <LogOut/>
      </Button>
    </form>
  )
}
