import { OpenAPIHono } from "@hono/zod-openapi";
import { createProjectRoute } from "@/server/routes/projectRoutes";
import { createProjectHandler } from "./controllers/createProject";

export const app = new OpenAPIHono().basePath("/api");

const projectApp = new OpenAPIHono()
  .openapi(createProjectRoute, createProjectHandler);
app.route("/projects", projectApp);

export type AppType = typeof app;
export default app;