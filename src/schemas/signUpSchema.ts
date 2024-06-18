import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: z.string(),
    telegramId: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: "Passwords don't match",
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
