import { createFileRoute } from '@tanstack/react-router'
import { VacationAdd } from '@/components/Hr/Vacations/VacationAdd'
import { z } from 'zod'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'

export const Route = createFileRoute('/_authenticated/hr/vacations/new/$id')({
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
        apiRequest<EmployeeResponse>({
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
  component: () => <VacationAdd />
})