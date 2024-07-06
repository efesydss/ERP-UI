import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { EmployeeDetails } from '@/components/Hr/Employee/EmployeeDetails'
import { apiRequest } from '@/utils/apiDefaults'
import { Employee } from '@/components/Hr/Employee/typesEmployee'

export const Route = createFileRoute('/_authenticated/hr/employees/$id/')({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id))
    }),
    stringify: ({ id }) => ({ id: `${id}` })
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ['employee', id],
      queryFn: () =>
        apiRequest<Employee>({
          method: 'GET',
          endpoint: 'employee',
          id
        })
    })

    const { name, surname } = data
    const { setCrumb } = context.app

    setCrumb(`${name} ${surname}`)

    return data
  },
  component: () => <EmployeeDetails />
})
