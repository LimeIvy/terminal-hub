"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

type ProjectCreateButtonProps = {
  onCreated?: () => void;
};

const ProjectCreateButton: React.FC<ProjectCreateButtonProps> = ({ onCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    role: "RECRUITING",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // モーダル外クリックで閉じる
  useEffect(() => {
    if (!showForm) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowForm(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowForm(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("登録に失敗しました");
      setShowForm(false);
      setForm({ title: "", description: "", role: "RECRUITING" });
      if (onCreated) onCreated();
    } catch (err: unknown) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="mt-5 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer"
        onClick={() => setShowForm(true)}
      >
        <Plus size={20} />
        プロジェクトを作成する
      </button>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fadeIn"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="閉じる"
              type="button"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="font-bold">タイトル</label>
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                required
              />
              <label className="font-bold">説明</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                required
              />
              {error && <div className="text-red-500">{error}</div>}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "作成中..." : "作成"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCreateButton;
