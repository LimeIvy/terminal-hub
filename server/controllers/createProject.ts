import { prisma } from "@/lib/prisma";
import { RouteHandler } from "@hono/zod-openapi";
import { createProjectRoute } from "@/server/routes/projectRoutes";

export const createProjectHandler: RouteHandler<typeof createProjectRoute> = async (c) => {
  const { title, description } = c.req.valid("json");

  const project = await prisma.project.create({
    data: {
      title,
      description,
      progress: 0,
      role: "RECRUITING",
    },
  });

  return c.json(project, 201);
};