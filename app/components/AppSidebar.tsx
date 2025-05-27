import {
  FolderKanban,
  Newspaper,
  Calendar,
  BookOpen,
  MessageCircle,
  Users,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 h-full bg-white text-black flex-col fixed top-19 left-0 z-9 shadow-md">
      <nav className="mt-5 p-4 flex flex-col gap-5">
        <a href="/projects" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <FolderKanban size={20} />
          プロジェクト
        </a>
        <a href="/hackathons" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <Newspaper size={20} />
          ハッカソン情報
        </a>
        <a href="/schedule" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <Calendar size={20} />
          スケジュール
        </a>
        <a href="/study" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <BookOpen size={20} />
          勉強会教材
        </a>
        <a href="/messages" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <MessageCircle size={20} />
          メッセージ
        </a>
        <a href="/members" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
          <Users size={20} />
          メンバー一覧
        </a>
      </nav>
    </div>
  );
}
