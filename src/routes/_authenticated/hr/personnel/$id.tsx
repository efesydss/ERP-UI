import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { PersonnelDetail } from '@/components/Hr/Personnel/PersonnelDetail'

export const Route = createFileRoute('/_authenticated/hr/personnel/$id')({
  parseParams: (params) => ({
    id: z.number().int().parse(Number(params.id))
  }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: () => <PersonnelDetail />
})
