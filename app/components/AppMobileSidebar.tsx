"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  FolderKanban,
  Newspaper,
  Calendar,
  BookOpen,
  MessageCircle,
  Users,
} from "lucide-react";

const sidebarVariants = {
  hidden: { x: "-100%", y: "100%", opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーボタン */}
      <motion.button
        whileTap={{ scale: 0.8, rotate: -25 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="fixed bottom-4 left-4 z-20 md:hidden bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-shadow"
        onClick={() => {
          setOpen(!open);
        }}
        aria-label="メニューを開く"
      >
        <Menu size={48} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* オーバーレイ */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-10 md:hidden"
              onClick={() => setOpen(false)}
              transition={{ duration: 0.4 }}
            />

            {/* サイドバー */}
            <motion.div
              key="sidebar"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed bottom-24 left-4 w-[calc(100vw-2rem)] max-w-xs max-h-[70vh] bg-white text-black flex flex-col z-30 shadow-lg md:hidden rounded-2xl overflow-hidden"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="p-4 space-y-2 flex flex-col gap-2">
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
                  チャット
                </a>
                <a href="/members" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
                  <Users size={20} />
                  メンバー一覧
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}