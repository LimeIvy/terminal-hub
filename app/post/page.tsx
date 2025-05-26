"use client";

import { useRef, useTransition } from "react";
import { createPost } from "@/app/actions/post";

export const PostForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const text = ref.current?.value;
    if (!text) return;

    startTransition(async () => {
      await createPost({ text });
    });
  };

  return (
    <div className="border rounded-2xl shadow p-6 w-full max-w-lg mx-auto bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold">New Post</h2>
        <p className="text-sm text-gray-500">Create a new post.</p>
      </div>

      <div className="mb-4">
        <input
          ref={ref}
          type="text"
          name="post"
          disabled={isPending}
          placeholder="What's on your mind?"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Submit
        </button>

      </div>
    </div>
  );
};

export default PostForm;
