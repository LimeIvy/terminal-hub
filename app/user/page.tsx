import { getUsers } from "@/server/data-access-layer/user";

export default async function User() {
  const users = await getUsers();

  return (
    <main>
      {users.map((user) => (
        <div key={user.id} className="text-sm text-gray-500 mb-2">
          {user.name},{user.email}
        </div>
      ))}
    </main>
  );
}
