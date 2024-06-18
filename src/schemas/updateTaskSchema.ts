import { z } from 'zod'
import { TaskStatus } from '../store/task/types'

export const updateTaskSchema = z.object({
  data: z.string(),

  description: z.string().optional(),
  status: z.enum([
    TaskStatus.BACKLOG,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TODO,
  ]),
  updatedProjectId: z.coerce.number().optional(),
  deadline: z.string().optional(),
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
