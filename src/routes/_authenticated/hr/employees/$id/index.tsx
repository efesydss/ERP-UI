import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { EmployeeDetails } from '@/components/Hr/Employee/EmployeeDetails'

export const Route = createFileRoute('/_authenticated/hr/employees/$id/')({
  parseParams: (params) => ({
    id: z.number().int().parse(Number(params.id))
  }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: () => <EmployeeDetails />
})
