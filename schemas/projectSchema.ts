import { z } from 'zod';

// バリデーションスキーマ
export const createProjectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  description: z.string().min(1, '内容は必須です'),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').optional(),
  description: z.string().min(1, '内容は必須です').optional(),
});


// 型も自動生成
export type ProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectUpdateInput = z.infer<typeof updateProjectSchema>;