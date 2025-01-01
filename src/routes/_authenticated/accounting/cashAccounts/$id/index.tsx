import { CashAccountDetail } from '@/components/Accounting/CashAccountDetail'
import { CashAccountResponse } from '@/components/Accounting/typesCashAccount'
import { apiRequest } from '@/utils/apiDefaults'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'


export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/$id/')({
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
                apiRequest<CashAccountResponse>({
                    method: 'GET',
                    endpoint: 'cashAccount',
                    id
                })
        })

        const { name, code } = data
        const { setCrumb } = context.app

        setCrumb(`${name} ${code}`)

        return data
    },
    component: () => <CashAccountDetail />
})