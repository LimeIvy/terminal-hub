import { z } from "@hono/zod-openapi";

export const ProjectRoleEnum = z.enum(["RECRUITING", "IN_PROGRESS", "COMPLETED"]);

export const ProjectSchema = z.object({
  id: z.string().openapi({ example: "ckv1q2w3e4r5t6y7u8i9o0p" }),
  title: z.string().openapi({ example: "新規AIプロジェクト提案" }),
  description: z.string().openapi({ example: "AIを活用した新しいプロジェクトの提案。" }),
  progress: z.number().openapi({ example: 0 }),
  role: ProjectRoleEnum.openapi({ example: "RECRUITING" }),
  createdAt: z.string().datetime().openapi({ example: "2025-06-01T12:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2025-06-01T12:00:00Z" }),
});

export const ProjectsSchema = z.array(ProjectSchema);

export const CreateProjectSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です。" }).openapi({ example: "新規AIプロジェクト提案" }),
  description: z.string().min(1, { message: "説明は必須です。" }).openapi({ example: "AIを活用した新しいプロジェクトの提案。" }),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>; 