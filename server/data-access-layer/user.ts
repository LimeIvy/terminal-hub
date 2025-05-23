import "server-only";

import { db } from "@/server/db";
import type { User } from "@prisma/client";

function createUsersDTO(userData: User) {
  // ここに認証機能などを追加して、データセットの絞り込みを行う
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
}

export async function getUsers() {
  const users = await db.user.findMany();
  return users.map((user) => createUsersDTO(user));
}
