"use server";

import { revalidatePath } from "next/cache";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/server/data-access-layer/todo";
import { type Todo } from "@prisma/client";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

function handleError<T>(error: unknown, action: string): ActionResponse<T> {
  if (error instanceof Error) {
    return {
      success: false,
      error: `${action}処理でエラーが発生しました: ${error.message}`,
      statusCode: 500,
    };
  }
  return {
    success: false,
    error: `予期せぬエラーが発生しました`,
    statusCode: 500,
  };
}

export async function fetchTodos(): Promise<ActionResponse<Todo[]>> {
  try {
    const todos = await getTodos();
    return { success: true, data: todos };
  } catch (error) {
    return handleError(error, "取得");
  }
}

export async function addTodo(
  data: Omit<Todo, "id" | "createdAt" | "updatedAt">
): Promise<ActionResponse<Todo>> {
  try {
    const newTodo = await createTodo(data);
    revalidatePath("/todo");
    return { success: true, data: newTodo };
  } catch (error) {
    return handleError(error, "作成");
  }
}

export async function toggleTodoCompletion(
  id: number,
  data: Partial<Omit<Todo, "createdAt" | "updatedAt">>
): Promise<ActionResponse<Todo>> {
  try {
    const updatedTodo = await updateTodo(id, data);
    revalidatePath("/todo");
    return { success: true, data: updatedTodo };
  } catch (error) {
    return handleError(error, "更新");
  }
}

export async function removeTodo(id: number): Promise<ActionResponse> {
  try {
    await deleteTodo(id);
    revalidatePath("/todo");
    return { success: true };
  } catch (error) {
    return handleError(error, "削除");
  }
}
