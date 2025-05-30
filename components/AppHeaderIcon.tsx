"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'next-auth/react'
import { Session } from "next-auth";

type Props = {
  session: Session;
};

export default function HeaderIcon({ session }: Props) {
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="relative">
      <button
        className="w-10 h-10 bg-gray-200 rounded-full relative cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <Image
          src={session.user?.image || ""}
          alt="user"
          fill
          className="rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            プロフィール設定
          </Link>

          <button
            type="submit"
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => signOut()}
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}