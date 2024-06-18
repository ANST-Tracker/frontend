import { z } from 'zod'

export const createTaskSchema = z.object({
  data: z.string(),
  description: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .transform(v => (!v ? undefined : new Date(v))),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
