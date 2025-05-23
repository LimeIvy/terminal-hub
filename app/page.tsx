import { NotificationIcon } from "./components/NotificationIcon";
import { Mail, Bell } from "lucide-react";
export default function Home() {
  return (
    <div className="bg-gray-100">
      <header className="sticky top-0 p-2 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Terminal-Hub</h1>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer">
              <NotificationIcon Icon={Mail} count={3} color="#EF4444" />
            </button>
            <button>
              <NotificationIcon Icon={Bell} count={3} color="#EF4444" />
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        <h2>参加中のプロジェクト</h2>
      </main>

      <footer className="h-16 bg-white">
        <p>© 2025 AIプロジェクトアイデアサポーター</p>
      </footer>
    </div>
  );
}
