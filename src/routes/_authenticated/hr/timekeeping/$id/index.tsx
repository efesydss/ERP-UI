import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { apiRequest } from '@/utils/apiDefaults'
import { TimeKeepingDetails } from '@/components/Hr/TimeKeeping/TimeKeepingDetails'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'

export const Route = createFileRoute('/_authenticated/hr/timekeeping/$id/')({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id))
    }),
    stringify: ({ id }) => ({ id: `${id}` })
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ['timeKeeping', id],
      queryFn: () =>
        apiRequest<EmployeeTimeKeepingProps>({
          method: 'GET',
          endpoint: 'timeKeeping',
          id
        })
    })

    return data
  },
  component: () => <TimeKeepingDetails />
})
