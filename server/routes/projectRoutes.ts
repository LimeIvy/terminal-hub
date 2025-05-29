import { createRoute } from "@hono/zod-openapi";
import { ProjectSchema, CreateProjectSchema } from "../models/projectSchemas";

export const createProjectRoute = createRoute({
  path: "/",
  method: "post",
  description: "新しいプロジェクトを作成",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateProjectSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "作成成功",
      content: {
        "application/json": {
          schema: ProjectSchema,
        },
      },
    },
  },
}); 