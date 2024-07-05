import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { EmployeeDetails } from '@/components/Hr/Employee/EmployeeDetails'

export const Route = createFileRoute('/_authenticated/hr/employees/$id/')({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id))
    }),
    stringify: ({ id }) => ({ id: `${id}` })
  },
  component: () => <EmployeeDetails />
})
