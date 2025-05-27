import { hono } from "@/lib/hono";

export default async function Page() {
  //hono rpcを使ったデータ取得
  const res = await hono.api.blogs.$get()
  const blogs = await res.json()

  if (blogs.length === 0) {
    return <div>まだ投稿がありません。</div>
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}