import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createBlogRoute,
  getBlogByIdRoute,
  getBlogsRoute
} from "@/server/routes/blogRoutes";
import { getBlogsHandler } from "./controllers/getBlogs";
import { getBlogByIdHandler } from "./controllers/getBlogById";
import { createBlogHandler } from "./controllers/createBlog";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono()
  .openapi(getBlogsRoute, getBlogsHandler)
  .openapi(getBlogByIdRoute, getBlogByIdHandler)
  .openapi(createBlogRoute, createBlogHandler)
const route = app.route("/blogs", blogApp);
export type AppType = typeof route;
export default app;