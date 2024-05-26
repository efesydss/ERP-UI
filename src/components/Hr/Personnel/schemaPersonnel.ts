import { z } from 'zod'

const checkString = (t: (key: string) => string) =>
  z.string({
    required_error: t('notValid.required')
  })

const dateSchema = z.union([
  z.date(),
  z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format'
    }),
  z.null()
])

export const personnelSchema = (t: (key: string) => string) => {
  return z.object({
    fullName: checkString(t),
    email: checkString(t).email(),
    category: checkString(t),
    address: checkString(t),
    startDate: z.date().nullable()
  })
}
