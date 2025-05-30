'use server';

import { Project, CreateProjectRequest, UpdateProjectRequest } from '@/lib/types';
import db from '@/lib/prisma';

// プロジェクトの取得（全件）
export const getAllProjects = async (): Promise<Project[]> => {
  const projects = await db.project.findMany();
  return projects.map(project => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }));
};

// プロジェクトの取得（ID指定）
export const getProjectById = async (id: string): Promise<Project | null> => {
  const project = await db.project.findUnique({
    where: { id },
  });
  return project ? {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  } : null;
};

// プロジェクトの作成
export const createProject = async (data: CreateProjectRequest): Promise<Project> => {
  const newProject = await db.project.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });
  return {
    ...newProject,
    createdAt: newProject.createdAt.toISOString(),
    updatedAt: newProject.updatedAt.toISOString(),
  };
};

// プロジェクトの更新
export const updateProject = async (id: string, data: UpdateProjectRequest): Promise<Project | null> => {
  const updatedProject = await db.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
    },
  });
  return updatedProject ? {
    ...updatedProject,
    createdAt: updatedProject.createdAt.toISOString(),
    updatedAt: updatedProject.updatedAt.toISOString(),
  } : null;
};

// プロジェクトの削除
export const deleteProject = async (id: string): Promise<boolean> => {
  const deletedProject = await db.project.delete({
    where: { id },
  });
  return deletedProject !== null;
};