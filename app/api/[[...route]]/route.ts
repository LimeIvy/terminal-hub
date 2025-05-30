import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { zValidator } from '@hono/zod-validator';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/db';  
import { createProjectSchema, updateProjectSchema } from '@/schemas/projectSchema';

// Honoアプリケーションの作成
const app = new Hono()
  // プロジェクト一覧の取得
  .get('/api/projects', async (c) => {
    const projects = await getAllProjects();
    return c.json({ projects });
  })
  
  // プロジェクトの作成
  .post('/api/projects', zValidator('json', createProjectSchema), async (c) => {
    const data = c.req.valid('json');
    const project = await createProject(data);
    return c.json({ project }, 201);
  })
  
  // プロジェクトの取得（ID指定）
  .get('/api/projects/:id', async (c) => {
    const id = c.req.param('id');
    const project = await getProjectById(id);
    
    if (!project) {
      return c.json({ error: 'プロジェクトが見つかりません' }, 404);
    }
    
    return c.json({ project });
  })
  
  // プロジェクトの更新
  .put('/api/projects/:id', zValidator('json', updateProjectSchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const project = await updateProject(id, data);
    
    if (!project) {
      return c.json({ error: 'プロジェクトが見つかりません' }, 404);
    }
    
    return c.json({ project });
  })
  
  // プロジェクトの削除
  .delete('/api/projects/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await deleteProject(id);
    
    if (!deleted) {
      return c.json({ error: 'プロジェクトが見つかりません' }, 404);
    }
    
    return c.json({ success: true });
  });

// 型情報のエクスポート
export type AppType = typeof app;

// Next.jsのRoute Handlerとして処理
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);