"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeTodo, toggleTodoCompletion } from "@/app/actions/todo";
import { type Todo } from "@prisma/client";

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const router = useRouter();

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  async function handleToggle(id: number, completed: boolean) {
    try {
      const data = { completed: !completed };
      await toggleTodoCompletion(id, data);
      router.refresh();
    } catch (error) {
      console.error("Todo更新中にエラーが発生しました:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await removeTodo(id);
      router.refresh();
    } catch (error) {
      console.error("Todo削除中にエラーが発生しました:", error);
    }
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between rounded-lg bg-white p-4 shadow transition duration-200 ease-in-out hover:shadow-md"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id, todo.completed)}
              className="form-checkbox h-5 w-5 rounded text-blue-500 focus:ring-blue-400"
            />
            <span
              className={`text-lg ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              {todo.title}
            </span>
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            className="text-red-500 hover:text-red-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
