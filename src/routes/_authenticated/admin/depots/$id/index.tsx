import { Depot } from "api/model/";
import { apiRequest } from "@/utils/apiDefaults";
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
export const Route = createFileRoute('/_authenticated/admin/depots/$id/')({
    params: {
        parse: (params) => ({
            id: z.number().int().parse(Number(params.id))
        }),
        stringify: ({ id }) => ({ id: `${id}` })
    },
    loader: async ({ context, params: { id } }) => {
        const data = await context.queryClient.ensureQueryData({
            queryKey: ['depot', id],
            queryFn: () =>
                apiRequest<Depot>({
                    method: 'GET',
                    endpoint: 'depot',
                    id
                })
        })
        const { name } = data
        const { setCrumb } = context.app
        setCrumb(`${name}`)
        return data
    },
    component: () => <Outlet/>
})