import { fetchTodos } from "@/app/actions/todo";

import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";

export default async function TodoPage() {
  const initialTodos = await fetchTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Todoリスト
        </h1>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <TodoForm />
          <TodoList initialTodos={initialTodos.data ?? []} />
        </div>
      </div>
    </div>
  );
}
