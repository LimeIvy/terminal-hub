//server/hono.ts
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getBlogByIdRoute,
  getBlogsRoute,
} from "@/server/routes/blogRoutes";
import { getBlogsHandler } from "@/server/controllers/getBlogs";
import { getBlogByIdHandler } from "@/server/controllers/getBlogById";
import { swaggerUI } from "@hono/swagger-ui";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono()
  .openapi(getBlogsRoute, getBlogsHandler)
  .openapi(getBlogByIdRoute, getBlogByIdHandler)

app.route("/blogs", blogApp);

app
  .doc("/specification", {
    openapi: "3.0.0",
    info: { title: "Honote API", version: "1.0.0" },
  })
  .get("/doc", swaggerUI({ url: "/api/specification" }));

export default app;
