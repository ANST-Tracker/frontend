export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TimeType {
  NANOSECONDS = 'NANOSECONDS',
  MICROSECONDS = 'MICROSECONDS',
  MILLISECONDS = 'MILLISECONDS',
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
  DAYS = 'DAYS',
}

export interface PendingNotification {
  amount: number
  timeType: TimeType
}

export interface Task {
  id: number
  data: string
  deadline?: string
  description?: string
  status: TaskStatus
  pendingNotifications: PendingNotification[]
}

export type GetTasksResponse = Task[]
export interface GetTasksRequest {
  projectId: number
  page?: number
}

export type GetTasksByFilterResponse = Task[]
export interface GetTasksByFilterRequest {
  deadline?: {
    dateFrom: string
    dateTo: string
  }
  status?: TaskStatus
  page?: number
  projectIds: number[]
}

export interface CreateTaskResponse extends Omit<Task, 'status' | 'id'> {}
export interface CreateTaskRequest
  extends Omit<Task, 'id' | 'pendingNotifications' | 'status'> {
  projectId: number
  pendingNotifications?: PendingNotification[]
}

export interface UpdateTaskResponse {
  id: number
}

export interface UpdateTaskRequest
  extends Partial<Pick<Task, 'deadline' | 'description'>> {
  id: number
  data: string
  status: TaskStatus
  updatedProjectId?: number
  pendingNotifications?: PendingNotification[]
}
export interface DeleteTaskResponse {
  id: number
}
