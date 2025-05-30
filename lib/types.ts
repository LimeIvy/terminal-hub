export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectRequest = {
  title: string;
  description: string;
};

export type UpdateProjectRequest = {
  title?: string;
  description?: string;
};  
