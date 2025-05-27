import HeaderIcon from "./AppHeaderIcon";
import { auth, signIn } from "@/auth";
import { Mail, Bell } from "lucide-react";
import { NotificationIcon } from "./AppNotificationIcon";

export default async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 p-4 bg-white z-10 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="ml-2 text-3xl font-bold">Terminal-Hub</h1>
        <div className="flex items-center gap-2">
          {session ? (
            <div className="mr-5 flex items-center gap-3">
              <button className="cursor-pointer">
                <NotificationIcon Icon={Mail} count={3} color="#EF4444" />
              </button>
              <button className="cursor-pointer">
                <NotificationIcon Icon={Bell} count={3} color="#EF4444" />
              </button>
              <div className="ml-2">
                <HeaderIcon session={session}/>
              </div>
            </div>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("github")
              }}
            >
              <button
                type="submit"
                className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
           hover:bg-yellow-400 hover:shadow-md 
           transition-all duration-200 ease-in-out 
           active:scale-95 cursor-pointer"
              >ログイン</button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}