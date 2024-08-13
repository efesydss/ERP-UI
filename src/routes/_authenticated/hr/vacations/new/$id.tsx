import { createFileRoute } from '@tanstack/react-router'
import { VacationAdd } from '@/components/Hr/Vacations/VacationAdd'
import { z } from 'zod'

export const Route = createFileRoute('/_authenticated/hr/vacations/new/$id')({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id))
    }),
    stringify: ({ id }) => ({ id: `${id}` })
  },
  component: () => <VacationAdd />
})
