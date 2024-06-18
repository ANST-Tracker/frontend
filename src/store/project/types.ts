export interface Project {
  id: number
  name: string
  type: string
}

export type GetProjectsResponse = Project[]


export interface CreateProjectResponse {
  id: number
}

export interface CreateProjectRequest {
  name: string
}

export interface UpdateProjectResponse {
  id: number
}

export interface UpdateProjectRequest {
  id: number
  name: string
}

export interface DeleteProjectResponse {
  id: number
}
