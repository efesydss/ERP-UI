import { z } from 'zod'

export const loginSchema = (t: (key: string) => string) => {
  return z.object({
    username: z.string({
      required_error: t('notValid.username')
    }),
    password: z.string({
      required_error: t('notValid.password')
    })
  })
}
